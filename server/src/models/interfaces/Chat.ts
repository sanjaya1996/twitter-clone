import mongoose, { Schema } from 'mongoose';
import { IMessageSchema } from './Message';

export interface IChatSchema extends mongoose.Document {
  chatName: string;
  isGroupChat: boolean;
  users: (string | Schema.Types.ObjectId)[];
  latestMessage: IMessageSchema;
}
