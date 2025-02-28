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
