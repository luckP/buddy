import mongoose from 'mongoose';
import messageSchema from './messageSchema.js';


const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  messages: [messageSchema], // Embed an array of messages
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Chat', chatSchema);
