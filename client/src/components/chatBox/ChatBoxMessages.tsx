import React from 'react';
import { MessageInterface } from '../../store/actions/message/messageActionTypes';
import ChatMessage from './ChatMessage';

import './chatBox.scss';

interface ChatBoxMessagesProps {
  messages?: MessageInterface;
}

const ChatBoxMessages: React.FC<ChatBoxMessagesProps> = ({ messages }) => {
  let messagesArray = messages ? [messages] : [];
  return (
    <ul className='chatMessages'>
      {messagesArray.length === 0 ? (
        <p>No message to show</p>
      ) : (
        messagesArray.map((message) => (
          <ChatMessage key={message._id} message={message} />
        ))
      )}
    </ul>
  );
};

export default ChatBoxMessages;
