import { Dispatch } from 'react';
import { socket, connectSocket } from '../../../api/sockets';
import {
  MessageInterface,
  MessageSendSuccess,
} from '../message/messageActionTypes';
import { UserType } from '../user/userActionTypes';
import {
  SocketChatRoomDispatchTypes,
  SocketConnectDispatchTypes,
  SOCKET_CHAT_ROOM_TYPING,
} from './socketsActionsTypes';

// updateTypingSocket variables
let typing = false;
let lastTypingTime: number;

export const setupSocket = (user: UserType) => {
  return (dispatch: Dispatch<SocketConnectDispatchTypes>) => {
    connectSocket(user, dispatch);
  };
};

export const joinChatRoomSocket = (chatId: string) => {
  return (dispatch: Dispatch<SocketChatRoomDispatchTypes>) => {
    socket.emit('join room', chatId);
    socket.on('typing', (room: string) =>
      dispatch({
        type: SOCKET_CHAT_ROOM_TYPING,
        payload: { isTyping: true, room },
      })
    );
    socket.on('stop typing', (room: string) =>
      dispatch({
        type: SOCKET_CHAT_ROOM_TYPING,
        payload: { isTyping: false, room },
      })
    );
  };
};

export const emitStopTypingSocket = (chatId: string) => {
  socket.emit('stop typing', chatId);
  typing = false;
};

export const updateTypingSocket = (chatId: string) => {
  if (!typing) {
    typing = true;
    socket.emit('typing', chatId);
  }

  lastTypingTime = new Date().getTime();
  const timerLength = 3000;

  setTimeout(() => {
    const timeNow = new Date().getTime();
    const timeDiff = timeNow - lastTypingTime;

    if (timeDiff >= timerLength && typing) {
      emitStopTypingSocket(chatId);
    }
  }, timerLength);
};

export const emitNewMessageSocket = (message: MessageInterface) => {
  socket.emit('new message', message);
};

export const handleSocketMessageReceived = () => {};
