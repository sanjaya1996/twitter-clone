import express from 'express';
import {
  createPost,
  getPosts,
  likePost,
} from '../controllers/post/postController';

import { requireLogin } from '../middleware/authMiddleware';
const router = express.Router();

router.route('/').get(requireLogin, getPosts).post(requireLogin, createPost);

router.put('/:id/like', requireLogin, likePost);
export default router;
