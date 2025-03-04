import OpenAI from "openai";
import Chat from "../models/chat.js";
import User from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @route   POST /api/chat
 * @desc    Handles chat interactions (new or existing chats)
 * @access  Private
 */
export const createChat = async (req, res) => {
  try {
    const { chatId, prompt, allMessages } = req.body;
    const userId = req.user._id;

    if (!prompt && !allMessages) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    let chat;

    if (chatId) {
      // Load existing chat
      chat = await Chat.findById(chatId);
      if (!chat || chat.isDeleted) {
        return res.status(404).json({ error: "Chat not found or deleted." });
      }

      if (allMessages) {
        return res.json({ chatId: chat._id, messages: chat.messages });
      }

      // Append new user message
      chat.messages.push({ prompt, role: "user", date: new Date() });
      await chat.save();
    } else {
      // Generate a chat title using AI
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ content: `Crie um título curto para um chat sobre: ${prompt}`, role: "user" }],
      });

      const title = response.choices[0]?.message?.content?.trim() || "Nova Conversa";

      // **Ensure default assistant message**
      const assistantMessage = {
        prompt: "Olá! Sou sua assistente para dúvidas sobre animais de estimação. Como posso ajudar?",
        role: "assistant",
        date: new Date(),
      };

      chat = await Chat.create({
        user: userId,
        title: title.replaceAll('"', ""),
        messages: [
          assistantMessage, // ✅ AI first message stored immediately
          { prompt, role: "user", date: new Date() },
        ],
      });
    }

    // Get AI response
    const openAIMessages = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.prompt,
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: openAIMessages,
    });

    let assistantReply = completion.choices[0]?.message?.content?.trim();

    // **Ensure assistant reply is valid before saving**
    if (!assistantReply) {
      console.error("OpenAI response missing!");
      assistantReply = "Desculpe, não consegui gerar uma resposta no momento.";
    }

    chat.messages.push({ prompt: assistantReply, role: "assistant", date: new Date() });
    await chat.save();

    res.json({ chatId: chat._id, reply: assistantReply });
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
