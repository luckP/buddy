import fs from 'fs';
import path from 'path';
import Post from '../models/socialNetworkPostSchema.js';
import { API_BASE_URL } from '../config/constants.js';

export const createPost = async (req, res) => {
  try {
    const { content, visibility } = req.body;
    let { location, tags } = req.body;

    // ✅ Parse JSON fields if necessary
    if (typeof location === 'string') {
        try {
            location = JSON.parse(location);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid location format' });
        }
    }

    if (typeof tags === 'string') {
        try {
            tags = JSON.parse(tags);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid tags format' });
        }
    }

    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'User authentication required' });
    }

    if (!location || !location.coordinates || location.coordinates.length !== 2) {
        return res.status(400).json({ error: 'Location coordinates are required' });
    }

    // ✅ Handle uploaded images (Now includes the correct user ID folder)
    const imageUrls = req.files?.map(file => `/uploads/posts/${req.user._id.toString()}/${file.filename}`) || [];

    // ✅ Create & Save Post
    const post = new Post({
        author: req.user._id,
        content,
        images: imageUrls,
        tags: Array.isArray(tags) ? tags : [],
        visibility,
        location,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
      console.error('Post Creation Error:', error);
      res.status(500).json({ error: error.message });
  }
};




// Get all posts (with pagination and filtering)
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, tags, visibility } = req.query;
    const query = { status: 'active' };
    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(',') };
    if (visibility) query.visibility = visibility;
    
    const posts = await Post.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post || post.status === 'deleted') return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found or unauthorized' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post (soft delete)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { status: 'deleted' },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found or unauthorized' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getFeedPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // ✅ Fetch posts from the database, ensuring they are active
        const posts = await Post.find({ status: 'active' })
            .populate('author', 'username profileImage') // Include author's info
            .sort({ createdAt: -1 }) // Newest posts first
            .skip((page - 1) * limit)
            .limit(Number(limit));

        // ✅ Format image URLs correctly
        const formattedPosts = posts.map(post => ({
            ...post.toObject(),
            images: post.images.map(imgPath => `${API_BASE_URL}${imgPath}`), // Append base URL for images
        }));

        res.json({ posts: formattedPosts });
    } catch (error) {
        console.error('Feed Fetch Error:', error);
        res.status(500).json({ error: error.message });
    }
};
