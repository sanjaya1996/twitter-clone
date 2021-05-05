import mongoose, { FilterQuery, ObjectId } from 'mongoose';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { LoggedInUserType } from '../../models/interfaces/User';

import Post from '../../models/schemas/PostSchema';
import User from '../../models/schemas/UserSchema';
import Notification from '../../models/schemas/NotificationSchema';
import { throwErrResponse } from '../../utils/throwErrResponse';
import { getPostsFromDB } from './helpers';

import {
  IPostSchema,
  GetPostsResultI,
  isPopulatedPost,
} from '../../models/interfaces/Post';

export const getPosts: RequestHandler = asyncHandler(async (req, res, next) => {
  // const userId = req.user._id;
  const searchObj: FilterQuery<IPostSchema> = req.query;

  if (searchObj.isReply) {
    const isReply = searchObj.isReply == 'true';
    searchObj.replyTo = { $exists: isReply };
    delete searchObj.isReply;
  }

  if (searchObj.followingOnly) {
    const followingOnly = searchObj.followingOnly === 'true';
    if (followingOnly) {
      const objectIds = req.user.following;
      objectIds.push(req.user._id);

      searchObj.postedBy = { $in: objectIds };
    }

    delete searchObj.followingOnly;
  }

  if (searchObj.search) {
    searchObj.content = { $regex: searchObj.search, $options: 'i' };
    delete searchObj.search;
  }

  const results = await getPostsFromDB(searchObj);

  res.json(results);
});

export const getPostById: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const postId = req.params.id;

    const postArray = await getPostsFromDB({ _id: postId });

    const postData = postArray[0];

    let results: Partial<GetPostsResultI> = { postData };

    if (postData.replyTo) {
      results.replyTo = postData.replyTo;
    }

    results.replies = await getPostsFromDB({ replyTo: postId });

    res.json(results);
  }
);

export const createPost: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const body = req.body as { content: string; replyTo?: string };
    const content = body.content;
    const postedBy = req.user._id;

    if (!req.body.content) {
      return throwErrResponse(res, 400, 'No content to create a post');
    }

    const postData: Partial<IPostSchema> = {
      content,
      postedBy,
    };

    if (body.replyTo) {
      postData.replyTo = body.replyTo;
    }

    let createdPost = await Post.create(postData);
    createdPost = await Post.populate(createdPost, [
      {
        path: 'postedBy',
        model: 'User',
      },
      { path: 'replyTo' },
    ]);

    createdPost = await Post.populate(createdPost, {
      path: 'replyTo.postedBy',
      model: 'User',
    });
    console.log(createdPost);

    // Send Notification for post reply
    if (isPopulatedPost(createdPost.replyTo)) {
      await Notification.insertNotification({
        userTo: createdPost.replyTo.postedBy,
        userFrom: req.user._id,
        notificationType: 'reply',
        entityId: createdPost._id,
      });
    }

    res.status(201).json(createdPost);
  }
);

export const updatePost: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.id;

    if (req.body.pinned !== undefined) {
      await Post.updateMany({ postedBy: userId }, { pinned: false });
    }

    await Post.findByIdAndUpdate(postId, req.body);
    res.status(200).json({ message: 'Post Updated Successfully' });
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
    const isLiked = req.user.likes && req.user.likes.includes(postId);

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

    // Send Notification while liking post not while unliking
    if (!isLiked && post) {
      await Notification.insertNotification({
        userTo: post.postedBy,
        userFrom: userId,
        notificationType: 'postLike',
        entityId: post._id,
      });
    }

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

      // Send Notification only in case of retweet not in untweet
      if (!deletedPost && post) {
        await Notification.insertNotification({
          userTo: post.postedBy,
          userFrom: userId,
          notificationType: 'retweet',
          entityId: post._id,
        });
      }

      return res.status(201).json(post);
    } else {
      // CONDITION 2:
      return throwErrResponse(res, 404, 'Post Not Found');
    }
  }
);

export const deletePost: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.status(202).json({ message: 'Post Deleted Successfully' });
    } else {
      return throwErrResponse(res, 404, 'Post Not Found');
    }
  }
);
