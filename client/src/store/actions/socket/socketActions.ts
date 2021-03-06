import { Dispatch } from 'react';
import { socket, connectSocket } from '../../../api/sockets';
import { MessageInterface } from '../message/messageActionTypes';
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
    console.log('Trying to Connect to socket');
    connectSocket(user, dispatch);
  };
};

export const joinChatRoomSocket = (chatId: string) => {
  return (dispatch: Dispatch<SocketChatRoomDispatchTypes>) => {
    console.log('Emmiting Join room from client');
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

export const emitNewNotificationSocket = (user: string | UserType) => {
  let id;
  if (typeof user === 'string') {
    id = user;
  } else {
    id = user._id;
  }

  socket.emit('notification received', id);
};
