import express from 'express';
import {
  createLostFoundPet,
  getLostFoundPets,
  getLostFoundPetById,
  updateLostFoundPet,
  deleteLostFoundPet
} from '../../controllers/lostFoundPetController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createLostFoundPet);
router.get('/', getLostFoundPets);
router.get('/:id', getLostFoundPetById);
router.put('/:id', authenticateUser, updateLostFoundPet);
router.delete('/:id', authenticateUser, deleteLostFoundPet);

export default router;
