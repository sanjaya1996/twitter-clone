import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { FilterQuery } from 'mongoose';
import { INotificationSchema } from '../../models/interfaces/Notification';
import Notification from '../../models/schemas/NotificationSchema';

// @desc    Get all Notifications by UserId
// @route   GET /api/notifications
// @access  Private/User
export const getNotifications: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;

    let searchObj: FilterQuery<INotificationSchema> = {
      userTo: userId,
      notificationType: { $ne: 'newMessage' },
    };

    if (req.query.unreadOnly && req.query.unreadOnly === 'true') {
      searchObj.opened = false;
    }

    const notifications = await Notification.find(searchObj)
      .populate('userTo')
      .populate('userFrom')
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  }
);

// @desc    Mark a Notification as Opened
// @route   PUT /api/notifications/:id/markAsOpened
// @access  Private/User
export const markNotificationAsOpened = asyncHandler(async (req, res, next) => {
  const notificationId = req.params.id;
  await Notification.findByIdAndUpdate(notificationId, { opened: true });

  res.sendStatus(204);
});

// @desc    Mark all Notifications as Opened
// @route   PUT /api/notifications/markAsOpened
// @access  Private/User
export const markAllNotificationAsOpened = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;

    await Notification.updateMany({ userTo: userId }, { opened: true });

    res.sendStatus(204);
  }
);
