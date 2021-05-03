import mongoose, { Schema, Model } from 'mongoose';
import { IUserSchema } from './User';

export interface INotificationData {
  userTo: Schema.Types.ObjectId | string;
  userFrom: Schema.Types.ObjectId | string;
  notificationType: 'follow' | 'retweet' | 'postLike' | 'reply';
  opened?: boolean;
  entityId: Schema.Types.ObjectId | string;
}

export type INotificationSchema = INotificationData & {
  _id: string;
} & mongoose.Document;

export interface INotificationModel extends Model<INotificationSchema> {
  insertNotification: (data: INotificationData) => void;
}

export function isPopulatedUser(obj: IUserSchema | any): obj is IUserSchema {
  return obj && obj._id && typeof obj._id === 'string';
}
