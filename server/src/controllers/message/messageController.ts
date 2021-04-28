import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Chat from '../../models/schemas/ChatSchema';
import Message from '../../models/schemas/MessageSchema';
import { throwErrResponse } from '../../utils/throwErrResponse';

export const createMessage: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;

    const { chatId, content } = req.body;

    if (!content || !chatId) {
      console.log('Invalid Data passed into request');
      throwErrResponse(res, 400, 'Invalid data passed into request');
    }

    let newMessage = await Message.create({
      content: content,
      chat: chatId,
      sender: userId,
    });

    newMessage = await newMessage.populate('sender').execPopulate();
    newMessage = await newMessage.populate('chat').execPopulate();

    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

    res.status(201).json(newMessage);
  }
);
