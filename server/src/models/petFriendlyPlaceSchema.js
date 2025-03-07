import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: false },
  timestamp: { type: Date, default: Date.now }
});

const PetFriendlyPlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  website: { type: String },
  category: {
    type: String,
    required: true,
    enum: ['Park', 'Cafe', 'Restaurant', 'Hotel', 'Store', 'Other']
  },
  images: { type: [String], default: [] },
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
  is_active: { type: Boolean, default: true }, // ✅ Field to indicate if the place is active
  is_deleted: { type: Boolean, default: false }, // ✅ Soft delete field
  user_ratings: { type: [RatingSchema], default: [] },
  average_rating: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// ** Create Geospatial Index **
PetFriendlyPlaceSchema.index({ location: '2dsphere' });

export default mongoose.model('PetFriendlyPlace', PetFriendlyPlaceSchema);
