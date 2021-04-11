import express from 'express';
import { createPost, getPosts } from '../controllers/post/postController';

import { requireLogin } from '../middleware/authMiddleware';
const router = express.Router();

router.route('/').get(requireLogin, getPosts).post(requireLogin, createPost);
export default router;
