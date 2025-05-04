import express from "express";
import {
  generateImage,
  likeImage,
  commentImage,
  getAllImages,
} from "../../controllers/aiImageController.js";
import { authenticateUser } from "../../middleware/authMiddleware.js";
import upload from "../../utils/upload.js";

const router = express.Router();

router.post("/generate", authenticateUser, upload.single("reference"), generateImage);
router.post("/:imageId/like", authenticateUser, likeImage);
router.post("/:imageId/comment", authenticateUser, commentImage);
router.get("/gallery", getAllImages);

export default router;
