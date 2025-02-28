import OpenAI from "openai";
import Chat from '../models/chat.js';
import User from '../models/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @route   POST /api/chat
 * @desc    Create or update a chat with AI responses
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - Chat request payload
 * @param   {string} req.body.chatId - (Optional) Existing chat ID
 * @param   {string} req.body.prompt - User's message
 * @param   {boolean} req.body.allMessages - Flag to retrieve all messages
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with chat ID and reply message
 */
export const createChat = async (req, res) => {
  try {
    const { chatId, prompt, allMessages } = req.body;
    const userId = req.user.id; // Extract user ID from authenticated request

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    if (!allMessages && !prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let chat;

    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat || chat.isDeleted) {
        return res.status(404).json({ error: 'Chat not found or deleted.' });
      }

      if (allMessages) {
        return res.json({ chatId: chat._id, messages: chat.messages, reply: '' });
      }

      chat.messages.push({ prompt, role: 'user', date: new Date() });
      await chat.save();
    } else {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ content: `Give me a simple title for a chat that starts with: ${prompt}`, role: 'user' }],
      });

      const title = response.choices[0].message.content;
      const baseAssistantMessage = "Olá, sou sua assistente para ajudar com questões sobre animais de estimação. Como posso ajudar?";

      chat = await Chat.create({
        user: userId,
        title: title.replaceAll('"', ''),
        messages: [
          { prompt: baseAssistantMessage, role: 'assistant', date: new Date() },
          { prompt, role: 'user', date: new Date() }
        ],
      });
    }

    const openAIMessages = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.prompt,
    }));

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: openAIMessages,
    });

    const assistantMessage = completion.choices[0].message.content;

    chat.messages.push({ prompt: assistantMessage, role: 'assistant', date: new Date() });
    await chat.save();

    res.json({ chatId: chat._id, reply: assistantMessage, messages: [] });
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/chat/list
 * @desc    Retrieve all chats for a specific user
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {Object} req.query - Query parameters
 * @param   {string} req.query.userId - User ID to retrieve chats
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with list of chat objects
 */
export const getChatList = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const chats = await Chat.find({ user: userId });
    const chatListObj = chats.map((chat) => ({
      chatId: chat._id,
      title: chat.title,
      createdAt: chat.createdAt,
    }));

    res.json(chatListObj);
  } catch (error) {
    console.error('Error handling chat list:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
