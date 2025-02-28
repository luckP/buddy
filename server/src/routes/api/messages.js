import express from 'express';
import { 
  createMessage, 
  getMessages, 
  getMessageById, 
  updateMessage, 
  deleteMessage 
} from '../../controllers/messageController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createMessage);
router.get('/', authenticateUser, getMessages);
router.get('/:id', authenticateUser, getMessageById);
router.put('/:id', authenticateUser, updateMessage);
router.delete('/:id', authenticateUser, deleteMessage);

export default router;
