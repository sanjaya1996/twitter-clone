import React from 'react';
import { ChatInterface } from '../../store/actions/chat/chatActionTypes';
import Chat from './Chat';

interface ChatListProps {
  chats: ChatInterface[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <>
      {chats.length === 0 ? (
        <p>Nothing to Show</p>
      ) : (
        chats.map((chat) => <Chat key={chat._id} chat={chat} />)
      )}
    </>
  );
};

export default ChatList;
