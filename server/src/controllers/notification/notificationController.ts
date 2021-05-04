import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Notification from '../../models/schemas/NotificationSchema';

// @desc    Get all Notifications by UserId
// @route   GET /api/notifications
// @access  Private/User
export const getNotifications: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;

    const notifications = await Notification.find({
      userTo: userId,
      notificationType: { $ne: 'newMessage' },
    })
      .populate('userTo')
      .populate('userFrom')
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  }
);
