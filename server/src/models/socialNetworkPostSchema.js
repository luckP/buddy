import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Post creator
    content: { type: String, default: '' }, // Post text content
    images: [{ type: String }], // Image URLs
    videos: [{ type: String }], // Video URLs
    tags: [{ type: String }], // Hashtags or categories
    visibility: { 
      type: String, 
      enum: ['public', 'private', 'friends'], 
      default: 'public' 
    }, // Who can see the post

    // Geolocation (stored in GeoJSON format)
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },

    // Engagement
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // References to comments

    // Counters
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 }, // Tracks post views

    status: {
      type: String,
      enum: ['active', 'hidden', 'deleted'],
      default: 'active',
    }, // Post status (e.g., hidden by moderation)
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt`
);

// Creating a geospatial index on the location field
PostSchema.index({ location: '2dsphere' });

export default mongoose.model('Post', PostSchema);
