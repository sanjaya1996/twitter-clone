import { ChatInterface } from '../store/actions/chat/chatActionTypes';
import { UserType } from '../store/actions/user/userActionTypes';

const getOtherChatUsers = (users: UserType[], loggedInUserId: string) => {
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
