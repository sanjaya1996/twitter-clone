import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import Chat from '../../models/schemas/ChatSchema';
import Message from '../../models/schemas/MessageSchema';
import { throwErrResponse } from '../../utils/throwErrResponse';
import { sendNotifications } from './helper';

// @desc    Create a new Message in a Chat
// @route   POST /api/messages
// @access  Private/User
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
      readBy: [userId],
    });

    newMessage = await newMessage.populate('sender').execPopulate();
    newMessage = await newMessage.populate('chat').execPopulate();
    newMessage = await Message.populate(newMessage, {
      path: 'chat.users',
      model: 'User',
    });

    const chat = await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });

    if (chat) {
      sendNotifications(chat, newMessage);
    }

    res.status(201).json(newMessage);
  }
);

// @desc    Fetch all messages belongs to Chat Id
// @route   GET /api/chats/:chatId/messages
// @access  Private/User
export const getMessagesByChatId: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const chatId = req.params.chatId;

    const messages = await Message.find({ chat: chatId }).populate('sender');

    res.status(200).json(messages);
  }
);

// @desc    Mark all messages of Chat to read
// @route   GET /api/chats/:chatId/messages/markasRead
// @access  Private/User
export const markAllMessagesAsRead: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;
    const chatId = req.params.chatId;

    await Message.updateMany(
      { chat: chatId },
      { $addToSet: { readBy: userId } }
    );

    res.sendStatus(204);
  }
);
