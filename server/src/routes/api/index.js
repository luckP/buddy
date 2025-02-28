import express from 'express';
import authRoutes from './auth.js';
import chatRoutes from './chat.js';
import postRouter from './post.js';
import messagesRouter from './messages.js';
import lostFoundPetsRouter from './lostFoundPets.js';
import petFriendlyPlacesRouter from './petFriendlyPlaces.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/posts', postRouter);
router.use('/messages', messagesRouter);
router.use('/lostFoundPets', lostFoundPetsRouter);
router.use('/petFriendlyPlaces', petFriendlyPlacesRouter);

export default router;
