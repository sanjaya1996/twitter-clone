import mongoose, { Schema } from 'mongoose';

export interface IPost extends mongoose.Document {
  content: string;
  postedBy: Schema.Types.ObjectId;
  pinned: boolean;
}

const PostSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
