import React from 'react';
import { useSelector } from 'react-redux';
import { MessageInterface } from '../../store/actions/message/messageActionTypes';
import { RootStore } from '../../store/store';
import { isFirstInMsgChain, isLastInMsgChain } from './helpers';

interface ChatMessageProps {
  lastMessage: MessageInterface;
  message: MessageInterface;
  nextMessage: MessageInterface;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  lastMessage,
  message,
  nextMessage,
}) => {
  const loggedInUser = useSelector(
    (state: RootStore) => state.loggedInUserInfo.user
  );
  const isMsgMine = message.sender._id === loggedInUser?._id;

  const isMsgFirstInchain = isFirstInMsgChain(lastMessage, message.sender._id);
  const isMsgLastInChain = isLastInMsgChain(message.sender._id, nextMessage);

  const mineOrTheirMsgClassName = isMsgMine ? 'mine' : 'theirs';
  const firstMsgClassName = isMsgFirstInchain ? 'first' : '';
  const lastMsgClassName = isMsgLastInChain ? 'last' : '';

  const liClassName =
    'message ' +
    mineOrTheirMsgClassName +
    ' ' +
    firstMsgClassName +
    ' ' +
    lastMsgClassName;

  return (
    <li className={liClassName}>
      <div className='messageContainer'>
        <span className='messageBody'>{message.content}</span>
      </div>
    </li>
  );
};

export default ChatMessage;
