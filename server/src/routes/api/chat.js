import express from 'express';
import OpenAI from "openai";
import Chat from '../../models/Chat.js';
import User from '../../models/userSchema.js';
import 'dotenv/config';


const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @route POST /api/chat
 * @desc Handle chat messages and create/retrieve chats
 * @access Private
 */
router.post('/', async (req, res) => {
  try {
    const { chatId, userId, prompt, allMessages } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId and prompt are required.' });
    }

    if (!allMessages && !prompt) {
      return res.status(400).json({ error: 'prompt is required.' });
    }

    // Validate the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let chat;

    if (chatId) {
      // Find the chat by ID
      chat = await Chat.findById(chatId);
      if (!chat || chat.isDeleted) {
        return res.status(404).json({ error: 'Chat not found or deleted.' });
      }

      // Retrieve all messages from the chat
      if (allMessages) {
        return res.json({ chatId: chat._id, messages: chat.messages, reply: '' });
      }

      // Add the new user message to the chat
      chat.messages.push({ prompt, role: 'user', date: new Date() });
      await chat.save();
    } else {
      // Create a new chat with OpenAI-generated title
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ content: `Give me only a simple title for a chat that starts with: ${prompt}`, role: 'user' }],
      });

      const title = response.choices[0].message.content;
      const baseAssistantMessage = "Olá, sou sua assistente pessoal para ajudar você com qualquer tipo de problema que você possa ter com seus animais de estimação. Como posso ajudar você hoje?";

      chat = await Chat.create({
        user: userId,
        title: title.replaceAll('"', ''),
        messages: [
          { prompt: baseAssistantMessage, role: 'assistant', date: new Date() },
          { prompt, role: 'user', date: new Date() }
        ],
      });
    }

    // Prepare messages for OpenAI
    const openAIMessages = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.prompt,
    }));

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: openAIMessages,
    });

    // Extract assistant's response
    const assistantMessage = completion.choices[0].message.content;

    // Add the assistant's response to the chat
    chat.messages.push({ prompt: assistantMessage, role: 'assistant', date: new Date() });
    await chat.save();

    res.json({ chatId: chat._id, reply: assistantMessage, messages: [] });
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

/**
 * @route GET /api/chat/list
 * @desc Get list of user chats
 * @access Private
 */
router.get('/list', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required.' });
    }

    // Find all chats associated with the user
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
});

export default router;
