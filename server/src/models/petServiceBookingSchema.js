const PetServiceBookingSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who made the booking
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'PetService', required: true }, // Service being booked
      date: { type: Date, required: true }, // Booking date & time
      status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' } // Booking status
    },
    { timestamps: true }
  );
  
  export default mongoose.model('PetServiceBooking', PetServiceBookingSchema);
  