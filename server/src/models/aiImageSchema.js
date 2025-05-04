import mongoose from "mongoose";

/**
 * AIImage Schema
 *
 * This schema represents an AI-generated image created from a user prompt (optionally using a reference image).
 *
 * Fields:
 * - user: Reference to the user who generated the image
 * - prompt: Text prompt used to generate the image
 * - imageUrl: URL to the final generated image
 * - referenceImageUrl: (optional) URL of a user-provided image used as visual inspiration
 * - likes: Array of user IDs who liked the image (prevents duplicate likes)
 * - isPublic: Whether the image is visible in the public gallery
 * - timestamps: Automatically includes `createdAt` and `updatedAt` fields
 */

const aiImageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    referenceImageUrl: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AIImage", aiImageSchema);
