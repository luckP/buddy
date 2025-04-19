import express from 'express';
import { createChat, getChatList } from '../../controllers/chatController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';
import upload from '../../utils/upload.js'; // ✅ import Multer config

const router = express.Router();

// ✅ Enable single image upload for chat
router.post('/', authenticateUser, upload.single('image'), createChat);
router.get('/list', authenticateUser, getChatList);

export default router;
