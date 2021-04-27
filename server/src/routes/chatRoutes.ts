import express from 'express';
import {
  createChat,
  getChatById,
  getChats,
} from '../controllers/chat/chatController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(requireLogin, getChats).post(requireLogin, createChat);
router.route('/:chatId').get(requireLogin, getChatById);

export default router;
