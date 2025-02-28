import express from 'express';
import {
  createPetFriendlyPlace,
  getPetFriendlyPlaces,
  getPetFriendlyPlaceById,
  updatePetFriendlyPlace,
  deletePetFriendlyPlace
} from '../../controllers/petFriendlyPlaceController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createPetFriendlyPlace);
router.get('/', getPetFriendlyPlaces);
router.get('/:id', getPetFriendlyPlaceById);
router.put('/:id', authenticateUser, updatePetFriendlyPlace);
router.delete('/:id', authenticateUser, deletePetFriendlyPlace);

export default router;
