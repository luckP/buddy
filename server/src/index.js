import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './utils/logger.js';
import requestLogger from './middleware/logging/requestLogger.js';
import notFound from './middleware/errorHandlers/notFound.js';
import globalErrorHandler from './middleware/errorHandlers/globalErrorHandler.js';
import OpenAI from "openai";
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
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Example Routes
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Example route using OpenAI API
app.post('/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "You extract email addresses into JSON data." },
            {
                role: "user",
                content: "Feeling stuck? Send a message to help@mycompany.com.",
            },
        ],
        response_format: {
            // See /docs/guides/structured-outputs
            type: "json_schema",
            json_schema: {
                name: "email_schema",
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            description: "The email address that appears in the input",
                            type: "string"
                        }
                    },
                    additionalProperties: false
                }
            }
        }
    });


    // const response = await openai.createCompletion({
    //   model: 'text-davinci-003',
    //   prompt,
    //   max_tokens: 150,
    // });
    res.json(completion);
  } catch (error) {
    logger.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI API' });
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
