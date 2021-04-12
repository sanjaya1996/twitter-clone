import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { Error } from 'mongoose';

import Post, { IPost } from '../../models/schemas/PostSchema';
import User from '../../models/schemas/UserSchema';

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
      res.status(400);
      throw new Error('No content to create a post');
    }

    const postData = { content, postedBy };

    const createdPost: IPost = await Post.create(postData);
    const postWithPopulatedUser = await User.populate(createdPost, {
      path: 'postedBy',
    });

    res.status(201).json(postWithPopulatedUser);
  }
);
