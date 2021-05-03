import mongoose, { Schema } from 'mongoose';
import { IMessageSchema } from './Message';
import { IUserSchema, LoggedInUserType } from './User';

export interface IChatSchema extends mongoose.Document {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: (string | Schema.Types.ObjectId)[];
  latestMessage: IMessageSchema;
}

export type IChatObject = Omit<IChatSchema, 'users'> & {
  users: IUserSchema[];
};
