import mongoose, { Schema } from 'mongoose';

export interface IChatSchema extends mongoose.Document {
  chatName: string;
  isGroupChat: boolean;
  users: (string | Schema.Types.ObjectId)[];
  latestMessage: string;
}
