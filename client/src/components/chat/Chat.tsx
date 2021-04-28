import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../../store/actions/chat/chatActionTypes';
import {
  getOtherChatUsers,
  getChatName,
  getOtherChatImages,
  getLatestMessage,
} from './helpers';

import { RootStore } from '../../store/store';

import './chat.scss';

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
    <Link to={`/message/${chat._id}`} className='resultListItem'>
      <div className={`resultsImageContainer ${groupChatClass}`}>
        {images.map((src, i) => (
          <img key={i} src={src} alt='Chat Pic' />
        ))}
      </div>
      <div className='resultsDetailsContainer ellipsis'>
        <span className='heading ellipsis'>{chatName}</span>
        <span className='subText ellipsis'>{latestMessage}</span>
      </div>
    </Link>
  );
};

export default Chat;
