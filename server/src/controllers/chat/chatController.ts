import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Chat from '../../models/schemas/ChatSchema';

export const getChats: RequestHandler = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  }).populate('users');

  res.status(200).json(chats);
});

export const createChat: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const body = req.body as { users: [] };

    if (!body.users || body.users.length === 0) {
      return res.sendStatus(400);
    }

    let users = [...req.body.users, req.user];

    const createdChat = await Chat.create({
      users: users,
      isGroupChat: true,
    });

    res.status(201).json(createdChat);
  }
);
