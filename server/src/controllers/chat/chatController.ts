import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Chat from '../../models/schemas/ChatSchema';
import User from '../../models/schemas/UserSchema';
import { throwErrResponse } from '../../utils/throwErrResponse';
import { getChatByUserId } from './helpers';
import { IChatSchema } from '../../models/interfaces/Chat';

export const getChats: RequestHandler = asyncHandler(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate('users')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });

  chats = await Chat.populate(chats, {
    path: 'latestMessage.sender',
    model: 'User',
  });

  res.status(200).json(chats);
});

export const getChatById: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;
    const chatId = req.params.chatId;

    const isValidId = mongoose.isValidObjectId(chatId);

    if (!isValidId) {
      return throwErrResponse(
        res,
        404,
        'Chat does not exist or you do not have permission to view it.'
      );
    }

    let chat: IChatSchema | null;

    chat = await Chat.findOne({
      _id: chatId,
      users: { $elemMatch: { $eq: userId } },
    }).populate('users');

    if (!chat) {
      // Check if chat Id is really user Id
      const userFound = await User.findById(chatId);

      if (userFound) {
        // Get chat using user Id
        chat = await getChatByUserId(userId, chatId);
      }
    }

    if (!chat) {
      return throwErrResponse(
        res,
        404,
        'Chat does not exist or you do not have permission to view it.'
      );
    }

    res.status(200).json(chat);
  }
);

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

export const updateChat: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const chatId = req.params.chatId;
    const data = req.body;
    await Chat.findByIdAndUpdate(chatId, data);
    res.sendStatus(204);
  }
);
