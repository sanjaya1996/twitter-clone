import mongoose from 'mongoose';
import {
  INotificationSchema,
  INotificationData,
} from '../interfaces/Notification';

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
    const { userTo, userFrom, notificationType, entityId } = data;
    const query = { userTo, userFrom, notificationType, entityId };
    await Notification.deleteOne(query);
    return await Notification.create(data);
  } catch (err) {
    throw new Error(err);
  }
};

const Notification = mongoose.model<INotificationSchema>(
  'Notification',
  NotificationSchema
);

export default Notification;
