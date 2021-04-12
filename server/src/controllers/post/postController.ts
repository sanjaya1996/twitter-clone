import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { LoggedInUserType } from '../../models/interfaces/User';

import Post, { IPost } from '../../models/schemas/PostSchema';
import User from '../../models/schemas/UserSchema';
import { throwErrResponse } from '../../utils/throwErrResponse';

export const getPosts: RequestHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const posts = await Post.find({ postedBy: userId })
    .populate('postedBy')
    .sort({ createdAt: -1 });

  res.json(posts);
});

export const createPost: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const content = (req.body as { content: string }).content;
    const postedBy = req.user._id;

    if (!req.body.content) {
      return throwErrResponse(res, 400, 'No content to create a post');
    }

    const postData = { content, postedBy };

    const createdPost: IPost = await Post.create(postData);
    const postWithPopulatedUser = await User.populate(createdPost, {
      path: 'postedBy',
    });

    res.status(201).json(postWithPopulatedUser);
  }
);

export const likePost: RequestHandler = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return throwErrResponse(res, 404, 'No Post Found');
  }

  // Check if the post is already liked and create mongoose option accordingly

  const isLiked = req.user.likes?.includes(postId);

  const option = isLiked ? '$pull' : '$addToSet';

  // Insert user like
  req.user = (await User.findByIdAndUpdate(
    userId,
    { [option]: { likes: postId } },
    { new: true }
  )) as LoggedInUserType;

  // Insert post like
  const post = await Post.findByIdAndUpdate(
    postId,
    { [option]: { likes: userId } },
    { new: true }
  ).populate('postedBy');

  if (!post) {
    return throwErrResponse(res, 404, 'No Post Found');
  }

  res.status(200).json(post);
});
