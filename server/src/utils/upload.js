import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

/**
 * @desc Ensures the user posts upload directory exists
 * @param {string} userId - The MongoDB user ID
 * @returns {string} Path to the user's posts upload directory
 */
export const ensurPostsUploadDirectory = (userId) => {
  const userUploadDir = path.join(process.cwd(), 'src/uploads/posts', userId);
  if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
  }
  return userUploadDir;
};

/**
 * @desc Ensures the lost/found pets upload directory exists
 * @param {string} userId - The MongoDB user ID
 * @returns {string} Path to the user's lost/found pets upload directory
 */
export const ensureLostFoundPetsDirectory = (userId) => {
  const userUploadDir = path.join(process.cwd(), 'src/uploads/lostFoundPets', userId);
  if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
  }
  return userUploadDir;
};

/**
 * @desc Ensures the chat upload directory exists
 * @param {string} userId - The MongoDB user ID
 * @returns {string} Path to the user's chat upload directory
 */
export const ensureChatUploadDirectory = (userId) => {
  const userUploadDir = path.join(process.cwd(), 'src/uploads/chat', userId);
  if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
  }
  return userUploadDir;
};

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!req.user || !req.user._id) {
      console.error("🚨 ERROR: User authentication required before uploading.");
      return cb(new Error('User authentication required'), null);
    }

    const userId = req.user._id.toString();
    let uploadDir;

    // ✅ Determine upload directory based on the request route
    if (req.baseUrl.includes('/lostFoundPets')) {
      uploadDir = ensureLostFoundPetsDirectory(userId);
    } else if (req.baseUrl.includes('/posts')) {
      uploadDir = ensurPostsUploadDirectory(userId);
    } else if (req.baseUrl.includes('/chat')) {
      uploadDir = ensureChatUploadDirectory(userId);
    } else {
      return cb(new Error("Invalid upload path"), null);
    }

    console.log(`🟢 DEBUG: Uploading image to directory: ${uploadDir}`);
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExt}`;
    console.log(`🟢 DEBUG: Uploading file with name: ${uniqueFilename}`);
    cb(null, uniqueFilename);
  },
});

// ✅ Export Multer instance
const upload = multer({ storage });

export default upload;
