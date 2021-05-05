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
import { MessageInterface } from '../../store/actions/message/messageActionTypes';

interface chatProps {
  chat: ChatInterface;
  latestMessage?: MessageInterface;
}

const Chat: React.FC<chatProps> = ({ chat, latestMessage }) => {
  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  if (!user) {
    return <p>Not Authenticated</p>;
  }

  const loggedInUserId = user._id;

  const otherChatUsers = getOtherChatUsers(chat.users, loggedInUserId);
  const chatName = getChatName(chat, loggedInUserId);
  const images = getOtherChatImages(otherChatUsers);
  const groupChatClass = images.length > 1 ? 'groupChatImage' : '';

  const latestMessageContent = getLatestMessage(
    latestMessage || chat.latestMessage
  );
  return (
    <ResultListItem
      linkTo={`/message/${chat._id}`}
      imageUrls={images}
      header={chatName}
      subText={latestMessageContent}
      imageClassName={groupChatClass}
    />
  );
};

export default Chat;
