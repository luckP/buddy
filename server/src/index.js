import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import logger from './utils/logger.js';
import requestLogger from './middleware/logging/requestLogger.js';
import notFound from './middleware/errorHandlers/notFound.js';
import globalErrorHandler from './middleware/errorHandlers/globalErrorHandler.js';

import apiRoutes from './routes/api/index.js';
import admin from './config/firebase.js';

import OpenAI from "openai";
import { v4 as uuidv4 } from 'uuid';




import dotenv from 'dotenv';
dotenv.config();


// ✅ Handle ES Modules Path Issues
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// ✅ Serve static files from the "uploads" folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.use(express.json());
app.use(cors());

// ✅ Use middleware
app.use(requestLogger);

// ✅ API Routes
app.use('/api', apiRoutes);


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.get('/image-test', async (req, res) => {
  try {
    const prompt = "A cute baby sea otter in a blue hoodie";
    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = result.data[0].url;
    if (!imageUrl) {
      return res.status(500).json({ error: "Image URL not found." });
    }

    // Download and save the image locally
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const fileName = `${uuidv4()}.png`;

    const uploadsDir = path.join('src/uploads', 'generated');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localPath = path.join(uploadsDir, fileName);
    fs.writeFileSync(localPath, Buffer.from(buffer));

    const publicUrl = `/uploads/generated/${fileName}`;
    res.status(200).json({ imageUrl: publicUrl });

  } catch (err) {
    console.error("Image generation error:", err);
    res.status(500).json({ error: "Failed to generate image." });
  }
})


app.get('/image-edit-anime', async (req, res) => {
  try {
    const imagePngPath = path.join('src/uploads/uploads/test.png');
    const maskPath = path.join('src/uploads/uploads/mask.png');

    // Send image + mask to OpenAI
    const result = await openai.images.edit({
  image: {
    value: fs.createReadStream(imagePngPath),
    options: {
      filename: 'test.png',
      contentType: 'image/png'
    }
  },
  mask: {
    value: fs.createReadStream(maskPath),
    options: {
      filename: 'mask.png',
      contentType: 'image/png'
    }
  },
  prompt: 'Transform this image into anime style art',
  n: 1,
  size: '1024x1024',
});
    const imageUrl = result.data[0]?.url;
    if (!imageUrl) {
      return res.status(500).json({ error: 'OpenAI did not return an image URL.' });
    }

    // Download the result and save locally
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const outputDir = path.join('src/uploads/generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `${uuidv4()}.png`;
    const savedPath = path.join(outputDir, filename);
    fs.writeFileSync(savedPath, buffer);

    const publicUrl = `/uploads/generated/${filename}`;
    res.status(200).json({ imageUrl: publicUrl });

  } catch (err) {
    console.error('Anime edit error:', err);
    res.status(500).json({ error: 'Failed to generate anime-style image.' });
  }
});

// ✅ MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://buddy-mongo:27017/buddy_db';
mongoose
  .connect(mongoUri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

app.use(notFound);
app.use(globalErrorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

export default app;
