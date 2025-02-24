import mongoose from 'mongoose';

const PetFriendlyPlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Place name
    description: { type: String, required: true }, // Short description
    images: [{ type: String }], // Array of image URLs

    // Geolocation (GeoJSON format)
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },

    // User interactions
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PetPlaceComment' }], // Comments on the place

    // Optional rating (1-5 stars system)
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Index for geospatial queries
PetFriendlyPlaceSchema.index({ location: '2dsphere' });

export default mongoose.model('PetFriendlyPlace', PetFriendlyPlaceSchema);
