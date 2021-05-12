import { Request } from 'express';
import { UpdateQuery } from 'mongoose';
import { IUserSchema, LoggedInUserType } from '../../models/interfaces/User';
import Chat from '../../models/schemas/ChatSchema';
import Message from '../../models/schemas/MessageSchema';
import Notification from '../../models/schemas/NotificationSchema';
import User from '../../models/schemas/UserSchema';

export const followAdmin = async (req: Request, adminId: string) => {
  // Update following array of Current User
  req.user = (await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { following: adminId } },
    { new: true }
  )) as LoggedInUserType;

  // Update the followers array of the Admin User
  await User.findByIdAndUpdate(adminId, {
    $addToSet: { followers: req.user._id },
  });

  await Notification.insertNotification({
    userTo: adminId,
    userFrom: req.user._id,
    notificationType: 'follow',
    entityId: req.user._id,
  });
};

export const followBackByAdmin = async (req: Request, adminId: string) => {
  // Update the following array of the Admin User
  await User.findByIdAndUpdate(adminId, {
    $addToSet: { following: req.user._id },
  });

  // Update following array of Current User
  req.user = (await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { followers: adminId } },
    { new: true }
  )) as LoggedInUserType;

  await Notification.insertNotification({
    userTo: req.user._id,
    userFrom: adminId,
    notificationType: 'follow',
    entityId: adminId,
  });
};

export const createNewChat = async (
  sender: string,
  receiver: string
): Promise<string> => {
  const users = [sender, receiver];

  const createdChat = await Chat.create({
    users: users,
    isGroupChat: false,
  });

  return createdChat._id;
};

export const getAdminWelcomeMessage = async (
  userId: string,
  adminId: string
) => {
  const newChatId = await createNewChat(adminId, userId);
  const content =
    'Welcome! Glad to see you here in Tweethouse community. I am an admin of this community, Feel free to leave a chat if you have any queries. Have a better tweeting experience.';

  const newMessage = await Message.create({
    content: content,
    chat: newChatId,
    sender: adminId,
    readBy: [adminId],
  });

  await Chat.findByIdAndUpdate(newChatId, {
    latestMessage: newMessage,
  });

  await Notification.insertNotification({
    userTo: userId,
    userFrom: adminId,
    notificationType: 'newMessage',
    entityId: newChatId,
  });
};

export const updateLoggedInUser = async (
  req: Request,
  data: UpdateQuery<IUserSchema>
) => {
  req.user = (await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
  })) as LoggedInUserType;
};
