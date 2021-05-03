import { IChatSchema } from '../../models/interfaces/Chat';
import { IMessageSchema } from '../../models/interfaces/Message';
import { isPopulatedUser } from '../../models/interfaces/Notification';
import Notification from '../../models/schemas/NotificationSchema';

export const sendNotifications = (
  chat: IChatSchema,
  message: IMessageSchema
) => {
  let sender = message.sender;

  if (isPopulatedUser(sender)) {
    sender = sender._id;
  }

  chat.users.forEach((userId) => {
    if (userId.toString() === sender.toString()) return;

    Notification.insertNotification({
      userTo: userId,
      userFrom: sender,
      notificationType: 'newMessage',
      entityId: chat._id,
    });
  });
};
