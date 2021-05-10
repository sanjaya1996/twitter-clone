import React from 'react';
import { ChatInterface } from '../../store/actions/chat/chatActionTypes';
import FallBackMessage from '../fallbackMessage/FallbackMessage';
import Chat from './Chat';

interface ChatListProps {
  chats: ChatInterface[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <>
      {chats.length === 0 ? (
        <FallBackMessage message='Nothing to show' />
      ) : (
        chats.map((chat) => <Chat key={chat._id} chat={chat} />)
      )}
    </>
  );
};

export default ChatList;
