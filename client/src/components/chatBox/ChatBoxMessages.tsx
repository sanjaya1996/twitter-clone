import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

import './chatBox.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';

import * as messageActions from '../../store/actions/message/messageActions';
import LoadingSpinner from '../loadingSpinner/LoadSpinner';
import FallBackMessage from '../fallbackMessage/FallbackMessage';

interface ChatBoxMessagesProps {
  chatId: string;
}

const ChatBoxMessages: React.FC<ChatBoxMessagesProps> = ({ chatId }) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const messageListState = state.messageList;
  const { loading, error, messages } = messageListState;

  const messageSendState = state.messageSend;
  const { success } = messageSendState;

  useEffect(() => {
    dispatch(messageActions.listMessages(chatId));
  }, [dispatch, chatId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: success ? 'smooth' : 'auto',
    });
  }, [messages, success]);

  return (
    <ul className='chatMessages'>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : messages.length === 0 ? (
        <FallBackMessage message='Conversation have not started yet' />
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
      <div style={{ height: 0 }} ref={lastMessageRef}></div>
    </ul>
  );
};

export default ChatBoxMessages;
