import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

/**
 * @desc Ensures the user upload directory exists
 * @param {string} userId - The MongoDB user ID
 * @returns {string} Path to the user's upload directory
 */
export const ensureUserUploadDirectory = (userId) => {
    const userUploadDir = path.join(process.cwd(), 'src/uploads/posts', userId);
    if (!fs.existsSync(userUploadDir)) {
        fs.mkdirSync(userUploadDir, { recursive: true });
    }
    return userUploadDir;
};

/**
 * @desc Ensures the lost/found pet directory exists
 * @param {string} userId - The MongoDB user ID
 * @returns {string} Path to the user's upload directory
 */
export const ensureLostFoundPetsDirectory = (userId) => {
    const userUploadDir = path.join(process.cwd(), 'src/uploads/lostFoundPets', userId);
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

        // ✅ Determine upload directory based on the request route
        let uploadDir;
        if (req.baseUrl.includes('/lostFoundPets')) {
            uploadDir = ensureLostFoundPetsDirectory(userId);
        } else {
            uploadDir = ensureUserUploadDirectory(userId);
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
