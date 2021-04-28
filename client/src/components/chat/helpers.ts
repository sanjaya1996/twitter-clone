import { ChatInterface } from '../../store/actions/chat/chatActionTypes';
import { MessageInterface } from '../../store/actions/message/messageActionTypes';
import { UserType } from '../../store/actions/user/userActionTypes';

// UTILS FUNCTIONS
export const getOtherChatUsers = (
  users: UserType[],
  loggedInUserId: string
) => {
  if (users.length === 1) return users;

  return users.filter((u) => u._id !== loggedInUserId);
};

export const getChatName = (
  chatData: ChatInterface,
  loggedInUserId: string
): string => {
  let chatName = chatData.chatName;

  if (!chatName) {
    const otherChatUsers = getOtherChatUsers(chatData.users, loggedInUserId);
    const namesArray = otherChatUsers.map(
      (u) => u.firstName + ' ' + u.lastName
    );
    chatName = namesArray.join(', ');
  }

  return chatName;
};

export const getOtherChatImages = (otherChatUsers: UserType[]) => {
  let images: string[] = [];
  const firstImage = otherChatUsers[0].profilePic;
  images.push(firstImage);

  if (otherChatUsers.length > 1) {
    images.push(otherChatUsers[1].profilePic);
  }

  return images;
};

export const getLatestMessage = (latestMessage?: MessageInterface) => {
  if (latestMessage) {
    const sender = latestMessage.sender;
    return `${sender.firstName} ${sender.lastName}: ${latestMessage.content}`;
  }

  return 'New chat';
};
