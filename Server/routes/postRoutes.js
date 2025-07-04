import express from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/posts - get all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id - get post by id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST /api/posts - create new post (protected)
router.post(
  '/',
  protect,
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const post = new Post({
        ...req.body,
        author: req.user.id,
      });
      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/posts/:id - update post (protected)
router.put(
  '/:id',
  protect,
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      if (post.author.toString() !== req.user.id)
        return res.status(403).json({ message: 'Unauthorized' });

      Object.assign(post, req.body);
      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/posts/:id - delete post (protected)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
