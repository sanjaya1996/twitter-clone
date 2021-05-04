import express from 'express';
import { getNotifications } from '../controllers/notification/notificationController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', requireLogin, getNotifications);

export default router;
