import express from 'express';
import { createChat, getChats } from '../controllers/chat/chatController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(requireLogin, getChats).post(requireLogin, createChat);

export default router;
