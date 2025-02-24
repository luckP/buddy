import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './utils/logger.js';
import requestLogger from './middleware/logging/requestLogger.js';
import notFound from './middleware/errorHandlers/notFound.js';
import globalErrorHandler from './middleware/errorHandlers/globalErrorHandler.js';

import apiRoutes from './routes/api/index.js';

const app = express();
app.use(express.json());
app.use(cors());

// Use middleware
app.use(requestLogger);

// Routes
app.use('/api', apiRoutes);

// MongoDB Connection
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
