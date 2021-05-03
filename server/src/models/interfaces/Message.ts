import mongoose, { Schema } from 'mongoose';
import { IChatObject, IChatSchema } from './Chat';
import { IUserSchema } from './User';

export interface IMessageSchema extends mongoose.Document {
  sender: string | Schema.Types.ObjectId;
  content: string;
  chat: string | Schema.Types.ObjectId;
  readBy: (string | Schema.Types.ObjectId)[];
}

export type IPopulatedMessageSchema =
  | IMessageSchema
  | {
      sender: IUserSchema;
      chat: IChatSchema;
      readBy: IUserSchema[];
    };

export type IMessageObject = Omit<IMessageSchema, 'readBy' | 'chat'> & {
  sender: IUserSchema;
  chat: IChatObject;
};
