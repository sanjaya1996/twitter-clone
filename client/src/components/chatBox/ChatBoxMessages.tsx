import React, { useEffect } from 'react';
import ChatMessage from './ChatMessage';

import './chatBox.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';

import * as messageActions from '../../store/actions/message/messageActions';

interface ChatBoxMessagesProps {
  chatId: string;
}

const ChatBoxMessages: React.FC<ChatBoxMessagesProps> = ({ chatId }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const messageListState = state.messageList;
  const { loading, error, messages } = messageListState;

  useEffect(() => {
    dispatch(messageActions.listMessages(chatId));
  }, [dispatch, chatId]);

  return (
    <ul className='chatMessages'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : messages.length === 0 ? (
        <p>No message to show</p>
      ) : (
        messages.map((message, index) => (
          <ChatMessage
            key={message._id}
            message={message}
            lastMessage={messages[index - 1]}
            nextMessage={messages[index + 1]}
          />
        ))
      )}
    </ul>
  );
};

export default ChatBoxMessages;
