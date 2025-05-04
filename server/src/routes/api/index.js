import express from 'express';
import authRoutes from './auth.js';
import chatRoutes from './chat.js';
import postRouter from './post.js';
import messagesRouter from './messages.js';
import lostFoundPetsRouter from './lostFoundPets.js';
import petFriendlyPlacesRouter from './petFriendlyPlaces.js';
import aiImagesRouter from './aiImages.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/posts', postRouter);
router.use('/messages', messagesRouter);
router.use('/lostFoundPets', lostFoundPetsRouter);
router.use('/petFriendlyPlaces', petFriendlyPlacesRouter);
router.use('/ai-images', aiImagesRouter);

export default router;
