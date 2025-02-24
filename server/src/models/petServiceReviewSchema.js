const PetServiceReviewSchema = new mongoose.Schema(
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'PetService', required: true }, // Service being reviewed
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who wrote the review
      rating: { type: Number, min: 1, max: 5, required: true }, // 1-5 star rating
      content: { type: String, required: true }, // Review text
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked this review
    },
    { timestamps: true }
  );
  
  export default mongoose.model('PetServiceReview', PetServiceReviewSchema);
  