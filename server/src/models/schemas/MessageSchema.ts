import mongoose from 'mongoose';
import { IMessageSchema } from '../interfaces/Message';

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessageSchema>('Message', MessageSchema);

export default Message;
