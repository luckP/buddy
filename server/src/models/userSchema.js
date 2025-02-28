import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firebaseId: { type: String, required: true, unique: true }, // 🔑 Firebase Authentication ID
    username: { type: String, required: true, unique: true }, // Unique public username
    email: { type: String, unique: true }, // (Optional) Firebase manages this
    profileImage: { type: String, default: '' }, // Profile picture URL
    coverImage: { type: String, default: '' }, // Cover photo URL
    bio: { type: String, default: '' },
    website: { type: String, default: '' },
    location: { type: String, default: '' },
    instagramHandle: { type: String, default: '' },
    twitterHandle: { type: String, default: '' },
    facebookHandle: { type: String, default: '' },
    birthdate: { type: Date },

    // Social Engagement
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // ✅ List of friends
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },
    likesReceived: { type: Number, default: 0 },
    commentsReceived: { type: Number, default: 0 },
    sharedPostsCount: { type: Number, default: 0 },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    favoriteTags: [{ type: String }],

    // Security & Account Management
    isVerified: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    accountStatus: { type: String, enum: ['active', 'suspended', 'banned', 'deleted'], default: 'active' },
    role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
    lastLogin: { type: Date, default: Date.now },
    twoFactorEnabled: { type: Boolean, default: false },
    deviceTokens: [{ type: String }],

    // Personalization
    themePreference: { type: String, enum: ['light', 'dark', 'auto'], default: 'light' },
    notifications: { type: Object, default: {} },
    interests: [{ type: String }],
    contentPreferences: { type: Object, default: {} },
    languagePreference: { type: String, default: 'en' },

    // Analytics
    lastActivity: { type: Date, default: Date.now },
    loginHistory: [{ date: Date, ip: String }],
    postEngagementStats: { type: Object, default: {} },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt`
);

export default mongoose.model('User', UserSchema);
