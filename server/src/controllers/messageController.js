import Message from '../models/messageSchema.js';
import MessageSchema from '../models/socialNetworkMessageSchema.js';

/**
 * @route   POST /api/messages
 * @desc    Create a new message
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - Request body containing message details
 * @param   {string} req.body.sender - ID of the message sender
 * @param   {Array} req.body.recipients - Array of recipient user IDs
 * @param   {string} req.body.content - Message text
 * @param   {Array} req.body.attachments - (Optional) List of attachment URLs
 * @param   {string} req.body.contextType - Type of context (chat, post, etc.)
 * @param   {string} req.body.contextId - Associated context ID
 * @param   {string} [req.body.parentMessage] - (Optional) ID of parent message if it's a reply
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with created message
 */
export const createMessage = async (req, res) => {
  try {
    const { recipients, content, attachments, mentions, contextType, contextId, parentMessage } = req.body;
    const sender = req.user.id; // Extract authenticated user ID

    const message = new MessageSchema({
      sender,
      recipients,
      content,
      attachments,
      mentions,
      contextType,
      contextId,
      parentMessage: parentMessage || null,
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/messages
 * @desc    Get all messages related to a context (e.g., a chat, post, etc.)
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.query.contextType - The context type (chat, post, etc.)
 * @param   {string} req.query.contextId - The specific context ID
 * @param   {Object} res - Express response object
 * @returns {Array} JSON response with an array of messages
 */
export const getMessages = async (req, res) => {
  try {
    const { contextType, contextId } = req.query;

    if (!contextType || !contextId) {
      return res.status(400).json({ error: 'ContextType and contextId are required.' });
    }

    const messages = await MessageSchema.find({ contextType, contextId }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/messages/:id
 * @desc    Get a single message by ID
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Message ID
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with the message object
 */
export const getMessageById = async (req, res) => {
  try {
    const message = await MessageSchema.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error retrieving message:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   PUT /api/messages/:id
 * @desc    Update a message (only if the sender is the current user)
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Message ID
 * @param   {Object} req.body - Updated message content
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated message
 */
export const updateMessage = async (req, res) => {
  try {
    const { content, attachments } = req.body;
    const message = await MessageSchema.findOneAndUpdate(
      { _id: req.params.id, sender: req.user.id },
      { content, attachments, isEdited: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found or unauthorized.' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   DELETE /api/messages/:id
 * @desc    Soft delete a message for the current user
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Message ID
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with deletion confirmation
 */
export const deleteMessage = async (req, res) => {
  try {
    const message = await MessageSchema.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this message.' });
    }

    message.deletedFor.push(req.user.id);
    await message.save();

    res.json({ message: 'Message deleted for this user.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
