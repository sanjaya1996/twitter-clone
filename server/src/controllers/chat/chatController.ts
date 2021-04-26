import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Chat from '../../models/schemas/ChatSchema';

export const createChat: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const body = req.body as { users: [] };
    let users = [];

    if (!body.users || body.users.length === 0) {
      return res.sendStatus(400);
    }

    users.push(req.user);

    const createdChat = Chat.create({ users: users, isGroupChat: true });

    res.status(201).json(createdChat);
  }
);
