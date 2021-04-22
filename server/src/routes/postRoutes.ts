import express from 'express';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  retweetPost,
  updatePost,
} from '../controllers/post/postController';

import { requireLogin } from '../middleware/authMiddleware';
const router = express.Router();

router.route('/').get(requireLogin, getPosts).post(requireLogin, createPost);

router
  .route('/:id')
  .get(requireLogin, getPostById)
  .put(requireLogin, updatePost)
  .delete(requireLogin, deletePost);

router.put('/:id/like', requireLogin, likePost);

router.post('/:id/retweet', requireLogin, retweetPost);
export default router;
