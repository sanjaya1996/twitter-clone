import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import * as chatActions from '../../../store/actions/chat/chatActions';
import { UserType } from '../../../store/actions/user/userActionTypes';
import { RootStore } from '../../../store/store';

import './chat.scss';

interface RouteParams {
  id: string;
}

const maxImagesToShow = 3;

const getTitleBarImages = (users: UserType[], loggedInUser: UserType) => {
  let images: string[] = [];

  if (users.length === 1) {
    images.push(users[0].profilePic);
    return images;
  }
  const otherUsers = users.filter((u) => u._id !== loggedInUser._id);
  return otherUsers.slice(0, maxImagesToShow).map((u) => u.profilePic);
};

const getRemainingImagesCount = (totalCount: number) => {
  return totalCount - maxImagesToShow - 1; // Remove 1 since we won't show our own image
};

const ChatPage: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const chatId = match.params.id;

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const loggedInUser = state.loggedInUserInfo.user!;

  const chatDetailsState = state.chatDetails;
  const { chat, loading, error } = chatDetailsState;

  useEffect(() => {
    dispatch(chatActions.getChatDetails(chatId));
  }, [dispatch, chatId]);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else if (!chat) {
    return <p>No Chat Found</p>;
  }

  const images = getTitleBarImages(chat.users, loggedInUser);
  const remainingImagesCount = getRemainingImagesCount(chat.users.length);

  return (
    <div className='chatPageContainer'>
      <div className='chatTitleBarContianer'>
        <div className='chatImagesContainer'>
          {remainingImagesCount > 0 && (
            <div className='userCount'>
              <span>+{remainingImagesCount}</span>
            </div>
          )}
          {images.map((src, i) => (
            <img key={i} src={src} alt={'User' + i} />
          ))}
        </div>
        <span id='chatName'>{chat._id}</span>
      </div>
      <div className='mainContentContainer'>
        <div className='chatContainer'>
          <div className='chatMessages'></div>
          <div className='footer'>
            <textarea
              name='messageInput'
              placeholder='Type a message...'
            ></textarea>
            <button className='sendMessageButton'>
              <i className='fas fa-paper-plane'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
