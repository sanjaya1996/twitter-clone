import { MessageSendSuccess } from '../message/messageActionTypes';

export const SOCKET_CONNECT = 'SOCKET_CONNECT';

export const SOCKET_CHAT_ROOM_TYPING = 'SOCKET_CHAT_ROOM_TYPING';
export const SOCKET_CHAT_ROOM_TYPING_RESET = 'SOCKET_CHAT_ROOM_TYPING_RESET';

export interface SocketConnect {
  type: typeof SOCKET_CONNECT;
  payload: { isConnected: boolean };
}

export interface SocketChatRoomTyping {
  type: typeof SOCKET_CHAT_ROOM_TYPING;
  payload: { isTyping: boolean; room: string };
}

export interface SocketChatRoomTypingReset {
  type: typeof SOCKET_CHAT_ROOM_TYPING_RESET;
}
export type SocketConnectDispatchTypes = SocketConnect | MessageSendSuccess;
export type SocketChatRoomDispatchTypes =
  | SocketChatRoomTyping
  | SocketChatRoomTypingReset;
