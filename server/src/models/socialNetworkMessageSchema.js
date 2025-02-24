import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who sent the message
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Single or multiple recipients

    content: { type: String, required: true }, // Message text
    attachments: [{ type: String }], // Optional attachments (images, videos, files)
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users mentioned in the message

    // Context: What is this message associated with?
    contextType: { 
      type: String, 
      enum: ['chat', 'post', 'comment', 'system'], 
      required: true 
    }, 
    contextId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID of Post, Chat, System Event, etc.

    // Threading (Replies)
    parentMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null }, // If it's a reply

    // Status
    isReadBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who read the message
    isEdited: { type: Boolean, default: false }, // If edited
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who deleted the message
  },
  { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
