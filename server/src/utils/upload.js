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

// ✅ Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.user || !req.user._id) {
            return cb(new Error('User authentication required'), null);
        }

        // Ensure the directory exists before storing
        const userUploadDir = ensureUserUploadDirectory(req.user._id.toString());
        cb(null, userUploadDir);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const uniqueFilename = `${uuidv4()}${fileExt}`;
        cb(null, uniqueFilename);
    },
});

// ✅ Export Multer instance
const upload = multer({ storage });

export default upload;
