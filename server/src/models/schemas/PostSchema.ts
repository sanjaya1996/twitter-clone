import mongoose, { Schema } from 'mongoose';

export interface IPost extends mongoose.Document {
  content: string;
  postedBy: Schema.Types.ObjectId | string;
  pinned: boolean;
  likes: (string | Schema.Types.ObjectId)[];
  retweetUsers: (string | Schema.Types.ObjectId)[];
  retweetData: Schema.Types.ObjectId | string;
  replyTo: Schema.Types.ObjectId | string;
}

const PostSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetData: { type: Schema.Types.ObjectId, ref: 'Post' },
    replyTo: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
