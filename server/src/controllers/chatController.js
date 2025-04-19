import OpenAI from "openai";
import Chat from "../models/chat.js";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
import path from 'path';
import { API_BASE_URL } from '../config/constants.js';
import { v4 as uuidv4 } from 'uuid'; 
import fs from 'fs';


dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @route   POST /api/chat
 * @desc    Handles chat interactions (new or existing chats).
 *          Accepts a text prompt, an optional uploaded image, or both.
 *          If no chatId is provided, creates a new chat with a generated title and an optional assistant welcome message.
 *          If a chatId is provided, appends a new user message to the existing chat.
 *          
 *          If a file (image) is uploaded, it will be saved to disk and converted to an accessible URL.
 *          The assistant will generate a reply only if a prompt (text) is included.
 * 
 * @access  Private
 * 
 * @param   {Object} req.body
 * @param   {string} [req.body.chatId] - Optional: existing chat ID to continue conversation
 * @param   {string} [req.body.prompt] - Optional: text message from user
 * @param   {boolean} [req.body.allMessages] - Optional: if true, returns the entire message history of the chat
 * 
 * @param   {Object} req.file - Optional: uploaded image file (handled by multer middleware)
 * 
 * @returns {Object} JSON with chatId and, if prompt was sent, assistant reply
 */


export const createChat = async (req, res) => {
  try {
    const { chatId, prompt = '', allMessages } = req.body;
    const userId = req.user._id;
    const imageUrl = getImageUrl(req);

    if (!prompt && !imageUrl && allMessages !== true) {
      return res.status(400).json({ error: "Prompt or image is required." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    let chat;

    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat || chat.isDeleted) {
        return res.status(404).json({ error: "Chat not found or deleted." });
      }

      // ✅ Return all messages immediately if requested
      if (allMessages) {
        return res.status(200).json({
          chatId: chat._id,
          messages: chat.messages.map(msg => ({
            ...msg.toObject?.() || msg,
            ...(msg.imageUrl && { imageUrl: msg.imageUrl }),
          })),
        });
      }

      // Otherwise add the new message to the existing chat
      chat.messages.push({
        prompt,
        role: "user",
        date: new Date(),
        ...(imageUrl && { imageUrl }),
      });

      await chat.save();
    } else {
      // 🧠 Generate title for new chat
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: "user",
            content: `Crie um título curto para um chat sobre: ${prompt}`,
          },
        ],
      });

      const title = response.choices[0]?.message?.content?.trim() || "Nova Conversa";

      const assistantMessage = {
        prompt: "Olá! Sou sua assistente para dúvidas sobre animais de estimação. Como posso ajudar?",
        role: "assistant",
        date: new Date(),
      };

      const userMessage = {
        prompt,
        role: "user",
        date: new Date(),
        ...(imageUrl && { imageUrl }),
      };

      chat = await Chat.create({
        user: userId,
        title: title.replaceAll('"', ''),
        messages: [assistantMessage, userMessage],
      });
    }

    // ✅ Only call OpenAI if there's a text prompt
    let assistantReply = '';
    if (prompt) {
      const openAIMessages = chat.messages.map(msg => ({
        role: msg.role,
        content: msg.prompt,
      }));

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages,
      });

      assistantReply = completion.choices[0]?.message?.content?.trim() ||
        "Desculpe, não consegui gerar uma resposta no momento.";

      chat.messages.push({
        prompt: assistantReply,
        role: "assistant",
        date: new Date(),
      });

      await chat.save();
    }

    res.status(200).json({
      chatId: chat._id,
      reply: assistantReply || null,
    });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


export const getChatList = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });

    const chatList = chats.map((chat) => ({
      chatId: chat._id,
      title: chat.title,
      createdAt: chat.createdAt,
    }));

    res.json(chatList);
  } catch (error) {
    console.error("Chat List Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


/**
 * Utility function to handle existing chat logic.
 */

function getImageUrl(req) {
  if (!req.file) return '';

  const userId = req.user._id;
  const uploadsDir = path.join('src/uploads', 'chat', userId.toString());

  // Create the directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(req.file.originalname);
  const uniqueName = `${uuidv4()}${ext}`;
  const newPath = path.join(uploadsDir, uniqueName);

  // Move the file to the new path with the unique name
  fs.renameSync(req.file.path, newPath);

  // Return public URL
  return `/src/uploads/chat/${userId}/${uniqueName}`;
}

async function handleExistingChat({ chatId, prompt, imageUrl, allMessages }) {
  const chat = await Chat.findById(chatId);
  if (!chat || chat.isDeleted) {
    throw new Error("Chat not found or deleted.");
  }

  console.log("Chat found:", chat);

  if (allMessages) {
    return chat;
  }

  chat.messages.push({
    prompt,
    role: "user",
    date: new Date(),
    ...(imageUrl && { imageUrl }),
  });

  await chat.save();
  return chat;
}

async function handleNewChat({ userId, prompt, imageUrl }) {
  const title = await generateTitle(prompt);

  const assistantMessage = {
    prompt: "Olá! Sou sua assistente para dúvidas sobre animais de estimação. Como posso ajudar?",
    role: "assistant",
    date: new Date(),
  };

  const userMessage = {
    prompt,
    role: "user",
    date: new Date(),
    ...(imageUrl && { imageUrl }),
  };

  const chat = await Chat.create({
    user: userId,
    title,
    messages: [assistantMessage, userMessage],
  });

  return chat;
}

async function generateTitle(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: "user",
          content: `Crie um título curto para um chat sobre: ${prompt}`,
        },
      ],
    });
    return (response.choices[0]?.message?.content?.trim() || "Nova Conversa").replaceAll('"', '');
  } catch (err) {
    console.warn("Error generating chat title:", err);
    return "Nova Conversa";
  }
}

async function getAssistantReply(messages) {
  const openAIMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.prompt,
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: openAIMessages,
  });

  return response.choices[0]?.message?.content?.trim() ||
    "Desculpe, não consegui gerar uma resposta no momento.";
}
