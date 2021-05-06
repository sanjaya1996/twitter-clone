import { NextFunction } from 'express';
import mongoose, { Schema } from 'mongoose';
import { throwErrResponse } from '../../utils/throwErrResponse';

import { IPostSchema } from '../interfaces/Post';

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

PostSchema.pre<IPostSchema>('save', async function (next) {
  const post = this;
  const MAX_POST_PER_USER = 50;

  const count = await Post.countDocuments({ postedBy: post.postedBy });

  if (count > MAX_POST_PER_USER) {
    const error = new Error(
      `Limit excedded! Sorry you are not allowed to post more than ${MAX_POST_PER_USER} posts. Try deleting your older posts to create a new one`
    );
    return next(error);
  }

  next();
});

const Post = mongoose.model<IPostSchema>('Post', PostSchema);

export default Post;
