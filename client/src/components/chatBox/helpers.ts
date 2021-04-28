import { MessageInterface } from '../../store/actions/message/messageActionTypes';

export const isFirstInMsgChain = (
  lastMessage: MessageInterface,
  currentSenderId: string
) => {
  if (!lastMessage) {
    return true;
  }

  const lastSenderId = lastMessage.sender._id;

  if (lastSenderId !== currentSenderId) {
    return true;
  }

  return false;
};

export const isLastInMsgChain = (
  currentSenderId: string,
  nextMessage: MessageInterface
) => {
  if (!nextMessage) {
    return true;
  }

  const nextSenderId = nextMessage.sender._id;

  if (nextSenderId !== currentSenderId) {
    return true;
  }

  return false;
};
