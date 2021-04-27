import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChatInterface } from '../../store/actions/chat/chatActionTypes';
import { UserType } from '../../store/actions/user/userActionTypes';
import { RootStore } from '../../store/store';

import './chat.scss';

interface chatProps {
  chat: ChatInterface;
}

let loggedInUserId: string;

// UTILS FUNCTIONS
const getOtherChatUsers = (users: UserType[]) => {
  if (users.length === 1) return users;

  return users.filter((u) => u._id !== loggedInUserId);
};

const getchatName = (
  chatData: ChatInterface,
  otherChatUsers: UserType[]
): string => {
  let chatName = chatData.chatName;

  if (!chatName) {
    const otherChatUsers = getOtherChatUsers(chatData.users);
    const namesArray = otherChatUsers.map(
      (u) => u.firstName + ' ' + u.lastName
    );
    chatName = namesArray.join(', ');
  }

  return chatName;
};

const getOtherChatImages = (otherChatUsers: UserType[]) => {
  let images: string[] = [];
  const firstImage = otherChatUsers[0].profilePic;
  images.push(firstImage);

  if (otherChatUsers.length > 1) {
    images.push(otherChatUsers[1].profilePic);
  }

  return images;
};

// MAIN COMPONENT
const Chat: React.FC<chatProps> = ({ chat }) => {
  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  loggedInUserId = user!._id;

  const otherChatUsers = getOtherChatUsers(chat.users);
  const chatName = getchatName(chat, otherChatUsers);
  const images = getOtherChatImages(otherChatUsers);
  const groupChatClass = images.length > 1 ? 'groupChatImage' : '';

  const latestMessage = 'This is the latest message '; // TODO
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
