import mongoose from 'mongoose';
import {
  INotificationSchema,
  INotificationData,
  INotificationModel,
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
    console.log('Creating Notification ');
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
