import { Dispatch } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from './index';

import {
  MessageInterface,
  MESSAGE_SEND_SUCCESS,
} from '../store/actions/message/messageActionTypes';
import {
  SocketConnectDispatchTypes,
  SOCKET_CONNECT,
} from '../store/actions/socket/socketsActionsTypes';
import { UserType } from '../store/actions/user/userActionTypes';

const socket = io(BASE_URL);

const connectSocket = (
  user: UserType,
  dispatch: Dispatch<SocketConnectDispatchTypes>
) => {
  socket.emit('setup', user);

  socket.on('connected', () =>
    dispatch({ type: SOCKET_CONNECT, payload: { isConnected: true } })
  );

  socket.on('message received', (newMessage: MessageInterface) => {
    const currentUserPath = document.location.pathname;
    const isCorrectChatPage =
      currentUserPath === `/message/${newMessage.chat._id}`;

    const showNotification = !isCorrectChatPage;

    if (showNotification) {
      console.log('Show notification...');
      // Show Notificaiton
      return;
    } else {
      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: newMessage });
    }
  });
};

export { socket, connectSocket };
