import { Dispatch } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from './index';

import {
  MessageInterface,
  MESSAGE_ADD_TO_LIST,
} from '../store/actions/message/messageActionTypes';
import {
  SocketConnectDispatchTypes,
  SOCKET_CONNECT,
} from '../store/actions/socket/socketsActionsTypes';
import * as chatActions from '../store/actions/chat/chatActions';
import * as messageActions from '../store/actions/message/messageActions';
import * as notificationActions from '../store/actions/notification/notificationActions';

import { UserType } from '../store/actions/user/userActionTypes';
import { NOTIFICATION_LATEST_SUCCESS } from '../store/actions/notification/notificationActionTypes';

const socket = io(BASE_URL);

const connectSocket = (
  user: UserType,
  dispatch: Dispatch<SocketConnectDispatchTypes | any>
) => {
  socket.emit('setup', user);

  socket.on('connected', () => {
    console.log('Client Connected to Socket');
    dispatch({ type: SOCKET_CONNECT, payload: { isConnected: true } });
  });

  socket.on('message received', (newMessage: MessageInterface) => {
    console.log('Socket message recieved in client');
    const currentUserPath = document.location.pathname;
    const isCorrectChatPage =
      currentUserPath === `/message/${newMessage.chat._id}`;

    const showNotification = !isCorrectChatPage;

    if (showNotification) {
      console.log('Show notification...');
      dispatch({ type: NOTIFICATION_LATEST_SUCCESS, payload: newMessage });
    } else {
      dispatch({ type: MESSAGE_ADD_TO_LIST, payload: newMessage });
      dispatch(messageActions.markMessagesAsRead(newMessage.chat._id));
    }

    dispatch(chatActions.listUnreadChats());
  });

  socket.on('notification received', () => {
    dispatch(notificationActions.getLatestNotification());
  });
};

export { socket, connectSocket };
