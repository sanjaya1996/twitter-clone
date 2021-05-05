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
import * as chatActions from '../store/actions/chat/chatActions';

import { UserType } from '../store/actions/user/userActionTypes';

const socket = io(BASE_URL);

const connectSocket = (
  user: UserType,
  dispatch: Dispatch<SocketConnectDispatchTypes | any>
) => {
  socket.emit('setup', user);

  socket.on('connected', () =>
    dispatch({ type: SOCKET_CONNECT, payload: { isConnected: true } })
  );

  socket.on('message received', (newMessage: MessageInterface) => {
    const currentUserPath = document.location.pathname;
    console.log(currentUserPath);
    console.log(newMessage);
    const isCorrectChatPage =
      currentUserPath === `/message/${newMessage.chat._id}`;

    const showNotification = !isCorrectChatPage;

    if (showNotification) {
      console.log('Show notification...');
      // Show Notificaiton
    } else {
      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: newMessage });
    }

    dispatch(chatActions.listUnreadChats());
  });
};

export { socket, connectSocket };
