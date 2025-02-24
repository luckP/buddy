import express from 'express';
import User from '../../models/userSchema.js';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Create or update user on Firebase Auth registration/login
 * @access Public
 */
router.post('/register', async (req, res) => {
  try {
    const { firebaseId, email, username, profileImage } = req.body;

    if (!firebaseId) {
      return res.status(400).json({ error: 'Firebase ID is required' });
    }

    let user = await User.findOne({ firebaseId });

    if (!user) {
      // Create new user
      user = new User({
        firebaseId,
        email,
        username,
        profileImage,
        lastLogin: new Date(),
      });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

/**
 * @route POST /api/auth/user-info
 * @desc Update user lastLogin and sync with Firebase info
 * @access Private (Must be called after login)
 */
router.post('/user-info', async (req, res) => {
  try {
    const { firebaseId, email, profileImage } = req.body;

    if (!firebaseId) {
      return res.status(400).json({ error: 'Firebase ID is required' });
    }

    let user = await User.findOneAndUpdate(
      { firebaseId },
      {
        email,
        profileImage,
        lastLogin: new Date(),
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export default router;
