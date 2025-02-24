import mongoose from 'mongoose';

const PetServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Service name
    category: { 
      type: String, 
      enum: ['Grooming', 'Veterinary', 'Training', 'Boarding', 'Other'], 
      required: true 
    }, // Type of pet service
    description: { type: String, required: true }, // Short description
    images: [{ type: String }], // Array of image URLs
    priceRange: { type: String, enum: ['$', '$$', '$$$', '$$$$'], default: '$$' }, // Price level

    // Location (GeoJSON for geospatial search)
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

    // Ratings & Reviews
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PetServiceReview' }], // User reviews

    // Business Details
    availability: [{ type: String }], // E.g., ["9:00 AM", "10:00 AM"]
    isOpenNow: { type: Boolean, default: false },
    phoneNumber: { type: String, required: true },
    website: { type: String },

    // User Interactions
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked this service
    savedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Users who saved it to favorites
  },
  { timestamps: true }
);

// Geospatial index for finding services nearby
PetServiceSchema.index({ location: '2dsphere' });

export default mongoose.model('PetService', PetServiceSchema);
