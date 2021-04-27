import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import * as chatActions from '../../../store/actions/chat/chatActions';
import { RootStore } from '../../../store/store';

import './chat.scss';

interface RouteParams {
  id: string;
}

const ChatPage: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const chatId = match.params.id;

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const chatDetailsState = state.chatDetails;
  const { chat } = chatDetailsState;

  useEffect(() => {
    dispatch(chatActions.getChatDetails(chatId));
  }, [dispatch, chatId]);
  return (
    <div className='chatPageContainer'>
      <div className='chatTitleBarContianer'>
        <span id='chatName'>{chat ? chat._id : 'This is the chat'}</span>
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
