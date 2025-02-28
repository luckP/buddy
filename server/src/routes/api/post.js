import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getFeedPosts
} from '../../controllers/postController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';
import upload from '../../utils/upload.js'; // ✅ Import Multer from `upload.js`

const router = express.Router();

// ✅ Use the `upload` middleware for handling file uploads
router.post('/', authenticateUser, upload.array('images', 5), createPost);
router.get('/', getPosts);
router.get('/feed', authenticateUser, getFeedPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticateUser, updatePost);
router.delete('/:id', authenticateUser, deletePost);

export default router;
