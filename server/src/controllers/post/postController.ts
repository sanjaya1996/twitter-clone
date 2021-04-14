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
    .populate('retweetData')
    .sort({ createdAt: -1 });

  const populatedPosts = await User.populate(posts, {
    path: 'retweetData.postedBy',
  });

  res.json(populatedPosts);
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

  const postIdIsValid =
    mongoose.Types.ObjectId.isValid(postId) && (await Post.findById(postId));

  if (postIdIsValid) {
    // CONDITION 1:

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

    res.status(200).json(post);
  } else {
    // CONDITION 2:
    return throwErrResponse(res, 404, 'Post Not Found');
  }
});

export const retweetPost: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user._id;

    const postIdIsValid =
      mongoose.Types.ObjectId.isValid(postId) && (await Post.findById(postId));

    if (postIdIsValid) {
      // CONDITION 1:
      const deletedPost = await Post.findOneAndDelete({
        postedBy: userId,
        retweetData: postId,
      });

      const option = deletedPost != null ? '$pull' : '$addToSet';

      let repost = deletedPost;

      if (repost == null) {
        repost = await Post.create({ postedBy: userId, retweetData: postId });
      }

      // Insert user retweet
      req.user = (await User.findByIdAndUpdate(
        userId,
        { [option]: { retweets: repost._id } },
        { new: true }
      )) as LoggedInUserType;

      // Insert post retweet
      const post = await Post.findByIdAndUpdate(
        postId,
        { [option]: { retweetUsers: userId } },
        { new: true }
      ).populate('postedBy');

      return res.status(201).json(post);
    } else {
      // CONDITION 2:
      return throwErrResponse(res, 404, 'Post Not Found');
    }
  }
);
