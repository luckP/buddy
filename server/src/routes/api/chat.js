import express from 'express';
import { createChat, getChatList } from '../../controllers/chatController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createChat);
router.get('/list', authenticateUser, getChatList);

export default router;
