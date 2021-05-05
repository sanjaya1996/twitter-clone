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
import * as notificationActions from '../store/actions/notification/notificationActions';

import { UserType } from '../store/actions/user/userActionTypes';
import { NOTIFICATION_LATEST_SUCCESS } from '../store/actions/notification/notificationActionTypes';

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
    const isCorrectChatPage =
      currentUserPath === `/message/${newMessage.chat._id}`;

    const showNotification = !isCorrectChatPage;

    if (showNotification) {
      console.log('Show notification...');
      dispatch({ type: NOTIFICATION_LATEST_SUCCESS, payload: newMessage });
    } else {
      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: newMessage });
    }

    dispatch(chatActions.listUnreadChats());
  });

  socket.on('notification received', () => {
    dispatch(notificationActions.getLatestNotification());
  });
};

export { socket, connectSocket };
