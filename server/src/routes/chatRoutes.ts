import express from 'express';
import {
  createChat,
  getChatById,
  getChats,
  updateChat,
} from '../controllers/chat/chatController';
import {
  getMessagesByChatId,
  markAllMessagesAsRead,
} from '../controllers/message/messageController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(requireLogin, getChats).post(requireLogin, createChat);
router
  .route('/:chatId')
  .get(requireLogin, getChatById)
  .put(requireLogin, updateChat);

router.get('/:chatId/messages', requireLogin, getMessagesByChatId);
router.put('/:chatId/messages/markAsRead', requireLogin, markAllMessagesAsRead);

export default router;
