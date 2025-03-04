import express from 'express';
import {
  createLostFoundPet,
  deleteLostFoundPet,
  getLostFoundPetById,
  getLostFoundPets,
  getNearbyLostFoundPets,
  updateLostFoundPet
} from '../../controllers/lostFoundPetController.js';
import { authenticateUser } from '../../middleware/authMiddleware.js';
import upload from '../../utils/upload.js'; // Import Multer

const router = express.Router();

router.post('/', authenticateUser, upload.array('images', 5), createLostFoundPet);
router.get('/', authenticateUser, getLostFoundPets);
router.get('/nearby', getNearbyLostFoundPets);
router.get('/:id', getLostFoundPetById);
router.put('/:id', authenticateUser, updateLostFoundPet);
router.delete('/:id', authenticateUser, deleteLostFoundPet);

export default router;
