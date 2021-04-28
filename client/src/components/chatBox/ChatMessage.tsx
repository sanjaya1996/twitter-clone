import React from 'react';
import { useSelector } from 'react-redux';
import { MessageInterface } from '../../store/actions/message/messageActionTypes';
import { RootStore } from '../../store/store';

interface ChatMessageProps {
  message: MessageInterface;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const loggedInUser = useSelector(
    (state: RootStore) => state.loggedInUserInfo.user
  );
  const isMine = message.sender._id === loggedInUser?._id;
  const liClassName = isMine ? 'message mine' : 'message theirs';

  return (
    <li className={liClassName}>
      <div className='messageContainer'>
        <span className='messageBody'>{message.content}</span>
      </div>
    </li>
  );
};

export default ChatMessage;
