import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  
  export default messageSchema;
  