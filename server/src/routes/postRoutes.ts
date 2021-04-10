import express from 'express';
import { createPost } from '../controllers/post/postController';

import { requireLogin } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', requireLogin, createPost);
export default router;
