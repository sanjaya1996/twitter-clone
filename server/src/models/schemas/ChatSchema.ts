import mongoose from 'mongoose';
import { IChatSchema } from '../interfaces/Chat';

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

const Chat = mongoose.model<IChatSchema>('Chat', ChatSchema);

export default Chat;
