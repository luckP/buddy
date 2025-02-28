import admin from 'firebase-admin';
import User from '../models/userSchema.js'; // Ensure correct path
import { ensureUserUploadDirectory } from '../utils/upload.js';


/**
 * @desc    Middleware to authenticate user via Firebase ID Token
 * @access  Protected (applies to routes requiring authentication)
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // ✅ Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken || !decodedToken.uid) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // ✅ Retrieve or Create user in MongoDB
        let user = await User.findOne({ firebaseId: decodedToken.uid });

        if (!user) {
            // Create a new user using Firebase data
            user = new User({
                firebaseId: decodedToken.uid,
                username: decodedToken.name || `user_${decodedToken.uid.slice(-5)}`, // Default username if missing
                email: decodedToken.email || null,
                profileImage: decodedToken.picture || '', // Use Firebase profile image
                lastLogin: new Date(),
            });

            await user.save();
        } else {
            // ✅ Update lastLogin timestamp
            user.lastLogin = new Date();
            await user.save();
        }


        if (user) {
            ensureUserUploadDirectory(user._id.toString()); // ✅ Ensure user folder is created
        }

        // ✅ Attach the user from MongoDB to `req.user`
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({ error: 'Unauthorized: Authentication failed' });
    }
};

/**
 * @desc    Middleware to check if the user is an admin
 * @access  Admin only
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.admin !== true) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};
