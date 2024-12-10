import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './utils/logger.js';
import requestLogger from './middleware/logging/requestLogger.js';
import notFound from './middleware/errorHandlers/notFound.js';
import globalErrorHandler from './middleware/errorHandlers/globalErrorHandler.js';
import OpenAI from "openai";
import Chat from './models/Chat.js';
import User from './models/User.js';
// import { Configuration, OpenAIApi } from 'openai';


// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// Use middleware
app.use(requestLogger);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://buddy-mongo:27017/buddy_db';
mongoose
  .connect(mongoUri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

// OpenAI API Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Replace with your API key
});

// Example Routes
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Example route using OpenAI API
app.post('/chat', async (req, res) => {
  try {
    const { chatId, userId, prompt, allMessages } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId and prompt are required.' });
    }

    if(!allMessages && !prompt){
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

      // Retrieve the all messages from the chat
      if(allMessages){
        const allMessages = chat.messages.map((msg) => {
          return {
            role: msg.role,
            prompt: msg.prompt
          }
        });
        return res.json({ chatId: chat._id, messages: allMessages, reply: ''});
      }

      // Add the new user message to the chat
      chat.messages.push({ prompt, role: 'user', date: new Date() });
      await chat.save();
    } else {
      // Create a new chat
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ content: `Give me only a simple title for a chat that starts with: ${prompt}`, role: 'user' }],
        // response_format: {
        //   "type": "text"
        // },
        // temperature: 1,
        // max_tokens: 2048,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0
      });

      const title = response.choices[0].message.content;
      const baseAssistantMessage = "Olá, sou sua assistente pessoal para ajudar você com qualquer tipo de problema que você possa ter com seus animais de estimação. Como posso ajudar você hoje?";

      chat = await Chat.create({
        user: userId,
        title: title.replaceAll('"', ''),
        messages: [
          { prompt: baseAssistantMessage, role: 'assistant', date: new Date()},
          {prompt, role: 'user', date: new Date()}
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
    // res.json({ response });
  } catch (error) {
    logger.error('Error handling chat:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.get('/chatList', async (req, res) => {
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

    res.json(chatListObj); // Send the list of chats as the response
  } catch (error) {
    logger.error('Error handling chat list:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


app.post('/crete-fake-user', async (req, res) => {
    try{
      const {name, email, password} = req.body;
      const user = await User.create({
        name,
        email,
        password
      });

      res.json(user);
    }
    catch (error) {
        logger.error('Error handling chat:', error);
        res.status(500).json({ error: 'Something went wrong.' });
      }
});


// Example route to test 404 middleware
app.get('/test', (req, res) => {
  res.send('Test route working!');
});

// Use error handling middleware
app.use(notFound);
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
export default app;
