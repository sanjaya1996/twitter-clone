import {
  SocketChatRoomDispatchTypes,
  SocketConnectDispatchTypes,
  SOCKET_CHAT_ROOM_TYPING,
  SOCKET_CHAT_ROOM_TYPING_RESET,
  SOCKET_CONNECT,
} from '../actions/socket/socketsActionsTypes';

interface SocketInterface {
  isConnected?: boolean;
}

interface SocketChatRoomInterface {
  isTyping?: boolean;
  room?: string;
}

export const socketConnectReducer = (
  state: SocketInterface = {},
  action: SocketConnectDispatchTypes
): SocketInterface => {
  switch (action.type) {
    case SOCKET_CONNECT:
      return { isConnected: action.payload.isConnected };
    default:
      return state;
  }
};

export const socketChatRoomReducer = (
  state: SocketChatRoomInterface = {},
  action: SocketChatRoomDispatchTypes
): SocketChatRoomInterface => {
  switch (action.type) {
    case SOCKET_CHAT_ROOM_TYPING:
      return { isTyping: action.payload.isTyping, room: action.payload.room };
    case SOCKET_CHAT_ROOM_TYPING_RESET:
      return {};
    default:
      return state;
  }
};
