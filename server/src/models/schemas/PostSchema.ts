import mongoose, { Schema } from 'mongoose';

export interface IPost extends mongoose.Document {
  content: string;
  postedBy: Schema.Types.ObjectId | string;
  pinned: boolean;
  likes: (string | Schema.Types.ObjectId)[];
}

const PostSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
