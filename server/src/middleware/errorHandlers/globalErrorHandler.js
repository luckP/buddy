import logger from '../../utils/logger.js';

import dotenv from 'dotenv';
dotenv.config();

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  logger.error(`${statusCode} - ${err.message}`);
};

export default globalErrorHandler;
