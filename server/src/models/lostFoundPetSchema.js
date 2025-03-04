import mongoose from "mongoose";

const LostFoundPetSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Post creator
    petName: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Pet images

    // Store location as GeoJSON
    location: {
      type: {
        type: String,
        enum: ["Point"], // Only store points
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    status: { type: String, enum: ["lost", "found", "reunited"], default: "lost" },
  },
  { timestamps: true }
);

// Enable geospatial queries (2dsphere index)
LostFoundPetSchema.index({ location: "2dsphere" });

export default mongoose.model("LostFoundPet", LostFoundPetSchema);
