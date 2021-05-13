import mongoose from 'mongoose';
import {
  INotificationSchema,
  INotificationData,
  INotificationModel,
} from '../interfaces/Notification';
import { isPopulatedUser } from '../interfaces/User';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    userTo: { type: Schema.Types.ObjectId, ref: 'User' },
    userFrom: { type: Schema.Types.ObjectId, ref: 'User' },
    notificationType: String,
    opened: { type: Boolean, default: false },
    entityId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

NotificationSchema.statics.insertNotification = async (
  data: INotificationData
) => {
  try {
    const { userFrom, userTo } = data;
    const userToId = isPopulatedUser(userTo) ? userTo._id : userTo;
    const userFromId = isPopulatedUser(userFrom) ? userFrom._id : userFrom;

    console.log('USER TO ID : ', userToId);
    console.log('USER FROM ID : ', userFromId);

    if (userFromId.toString() === userToId.toString()) {
      return; // Do not send notification to same user
    }

    console.log('INSERTING NOTIFICATION');
    await Notification.deleteOne(data);
    return await Notification.create(data);
  } catch (err) {
    throw new Error(err);
  }
};

const Notification = mongoose.model<INotificationSchema, INotificationModel>(
  'Notification',
  NotificationSchema
);

export default Notification;
