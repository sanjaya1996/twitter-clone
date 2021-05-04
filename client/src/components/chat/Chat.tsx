import React from 'react';
import { useSelector } from 'react-redux';
import { ChatInterface } from '../../store/actions/chat/chatActionTypes';
import {
  getOtherChatUsers,
  getChatName,
  getOtherChatImages,
  getLatestMessage,
} from './helpers';

import { RootStore } from '../../store/store';

import ResultListItem from '../list/resultListItem/ResultListItem';

interface chatProps {
  chat: ChatInterface;
}

const Chat: React.FC<chatProps> = ({ chat }) => {
  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  const loggedInUserId = user!._id;

  const otherChatUsers = getOtherChatUsers(chat.users, loggedInUserId);
  const chatName = getChatName(chat, loggedInUserId);
  const images = getOtherChatImages(otherChatUsers);
  const groupChatClass = images.length > 1 ? 'groupChatImage' : '';

  const latestMessage = getLatestMessage(chat.latestMessage);
  return (
    <ResultListItem
      linkTo={`/message/${chat._id}`}
      imageUrls={images}
      header={chatName}
      subText={latestMessage}
      imageClassName={groupChatClass}
    />
  );
};

export default Chat;
