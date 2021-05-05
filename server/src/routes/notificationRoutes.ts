import express from 'express';
import {
  getLatestNotification,
  getNotifications,
  markAllNotificationAsOpened,
  markNotificationAsOpened,
} from '../controllers/notification/notificationController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', requireLogin, getNotifications);
router.get('/latest', requireLogin, getLatestNotification);
router.put('/markAsOpened', requireLogin, markAllNotificationAsOpened);
router.put('/:id/markAsOpened', requireLogin, markNotificationAsOpened);

export default router;
