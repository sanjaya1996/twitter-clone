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

  const {
    content,
    sender: { _id: senderId, firstName, lastName, profilePic },
  } = message;

  const isMsgMine = senderId === loggedInUser?._id;

  const isMsgFirstInchain = isFirstInMsgChain(lastMessage, senderId);
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
      {!isMsgMine && (
        <div className='imageContainer'>
          {isMsgLastInChain && <img src={profilePic} alt={firstName} />}
        </div>
      )}
      <div className='messageContainer'>
        {!isMsgMine && isMsgFirstInchain && (
          <span className='senderName'>{firstName + ' ' + lastName}</span>
        )}
        <span className='messageBody'>{content}</span>
      </div>
    </li>
  );
};

export default ChatMessage;
