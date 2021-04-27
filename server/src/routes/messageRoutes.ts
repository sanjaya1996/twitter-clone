import express from 'express';
import { createMessage } from '../controllers/message/messageController';

import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(requireLogin, createMessage);

export default router;
