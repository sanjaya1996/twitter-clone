import mongoose, { Schema } from 'mongoose';

export interface IMessageSchema extends mongoose.Document {
  sender: string | Schema.Types.ObjectId;
  content: string;
  chat: string | Schema.Types.ObjectId;
  readBy: (string | Schema.Types.ObjectId)[];
}
