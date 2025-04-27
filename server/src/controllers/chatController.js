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
 * Handles chat creation or continuation.
 * - If chatId is provided, adds a new user message and optionally generates an assistant reply.
 * - If no chatId is provided, creates a new chat with assistant + user messages and returns chatId.
 * - If allMessages is true, returns the full message history of the chat.
 *
 * @route   POST /api/chat
 * @access  Private
 * @param   {string} [req.body.chatId] - Optional: existing chat ID to continue conversation
 * @param   {string} [req.body.prompt] - Optional: text message from user
 * @param   {boolean} [req.body.allMessages] - Optional: if true, returns full message history
 * @param   {Object} [req.file] - Optional: uploaded image file (via multer)
 * @returns {Object} JSON with chatId and optional assistant reply
 */
export const createChat = async (req, res) => {
  console.log("----------------------------------------")
  console.log("Chat Request:", req.body, new Date());
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
    let isNewChat = false;

    if (chatId && allMessages === true) {
      const chat = await Chat.findById(chatId);
      if (!chat || chat.isDeleted) {
        return res.status(404).json({ error: "Chat not found or deleted." });
      }
      return res.status(200).json({
        chatId: chat._id,
        messages: chat.messages.map(msg => ({
          ...msg.toObject?.() || msg,
          ...(msg.imageUrl && { imageUrl: msg.imageUrl }),
        })),
      });
    }

    if (chatId) {
      const result = await handleExistingChat({ chatId, prompt, imageUrl });
      if (!result) return res.status(404).json({ error: "Chat not found or deleted." });
      chat = result;
    } else {
      chat = await handleNewChat({ userId, prompt, imageUrl });
      isNewChat = true;
    }

    let assistantReply = '';
    if (prompt) {
      assistantReply = await getAssistantReply(chat.messages);
    
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
      ...(imageUrl && { imageUrl }),
    });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

/**
 * Retrieves the list of chats for the current user, sorted by creation date.
 *
 * @route   GET /api/chat/list
 * @access  Private
 * @returns {Array} List of chats with ID, title, and createdAt
 */
export const getChatList = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });

    const chatList = chats.map(chat => ({
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
 * Saves uploaded image file to disk and returns the public URL.
 *
 * @param {Object} req - Express request object with file
 * @returns {string} Public URL for the saved image
 */
function getImageUrl(req) {
  if (!req.file) return '';

  const userId = req.user._id;
  const uploadsDir = path.join('src/uploads', 'chat', userId.toString());

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(req.file.originalname);
  const uniqueName = `${uuidv4()}${ext}`;
  const newPath = path.join(uploadsDir, uniqueName);

  fs.renameSync(req.file.path, newPath);

  return `/uploads/chat/${userId}/${uniqueName}`;
}

/**
 * Appends a new user message to an existing chat.
 *
 * @param {Object} options
 * @param {string} options.chatId - ID of the existing chat
 * @param {string} options.prompt - User's text message
 * @param {string} options.imageUrl - Optional image URL
 * @returns {Object|null} Chat object or null if not found
 */
async function handleExistingChat({ chatId, prompt, imageUrl }) {
  const chat = await Chat.findById(chatId);
  if (!chat || chat.isDeleted) {
    return null;
  }

  if (prompt || imageUrl) {
    chat.messages.push({
      prompt,
      role: "user",
      date: new Date(),
      ...(imageUrl && { imageUrl }),
    });
    await chat.save();
  }

  return chat;
}

/**
 * Creates a new chat with an initial assistant greeting and the user's first message.
 *
 * @param {Object} options
 * @param {string} options.userId - ID of the user creating the chat
 * @param {string} options.prompt - Initial user message
 * @param {string} options.imageUrl - Optional image URL
 * @returns {Object} The newly created chat document
 */
async function handleNewChat({ userId, prompt, imageUrl }) {
  const title = await generateTitle(prompt);

  const assistantMessage = {
    prompt: "Olá! 👋 Sou seu assistente virtual e estou aqui para te ajudar com qualquer coisa relacionada ao seu animal de estimação. 🐾 Posso responder dúvidas, dar dicas de cuidados, ajudar com localização de pets perdidos ou qualquer outra questão que tiver. Como posso te ajudar hoje?",
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

/**
 * Generates a short, relevant title for a chat based on the initial user prompt.
 *
 * @param {string} prompt - The user's initial message
 * @returns {string} A short title string
 */
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

/**
 * Uses OpenAI API to generate a response from the assistant based on the conversation history.
 *
 * @param {Array} messages - Full message history of the chat
 * @returns {string} Assistant's reply
 */
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