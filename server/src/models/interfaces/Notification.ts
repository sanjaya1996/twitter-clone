import mongoose, { Schema } from 'mongoose';

export interface INotificationSchema extends mongoose.Document {
  _id: string;
  userTo: Schema.Types.ObjectId | string;
  userFrom: Schema.Types.ObjectId | string;
  notificationType: String;
  opened?: boolean;
  entityId: Schema.Types.ObjectId | string;
}

export type INotificationData = Omit<INotificationSchema, '_id'>;
