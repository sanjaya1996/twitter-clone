import express from 'express';
import { createChat } from '../controllers/chat/chatController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', requireLogin, createChat);

export default router;
