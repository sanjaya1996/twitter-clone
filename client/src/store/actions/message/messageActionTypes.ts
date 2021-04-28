import { ChatInterface } from '../chat/chatActionTypes';
import { UserType } from '../user/userActionTypes';

export const MESSAGE_LIST_LOADING = 'MESSAGE_LIST_LOADING';
export const MESSAGE_LIST_SUCCESS = 'MESSAGE_LIST_SUCCESS';
export const MESSAGE_LIST_FAIL = 'MESSAGE_LIST_FAIL';

export const MESSAGE_SEND_LOADING = 'MESSAGE_SEND_LOADING';
export const MESSAGE_SEND_SUCCESS = 'MESSAGE_SEND_SUCCESS';
export const MESSAGE_SEND_FAIL = 'MESSAGE_SEND_FAIL';

export interface MessageInterface {
  _id: string;
  sender: UserType;
  content: string;
  chat: ChatInterface;
  readBy: UserType[];
}

// List Messages
export interface MessageListLoading {
  type: typeof MESSAGE_LIST_LOADING;
}

export interface MessageListSuccess {
  type: typeof MESSAGE_LIST_SUCCESS;
  payload: MessageInterface[];
}

export interface MessageListFail {
  type: typeof MESSAGE_LIST_FAIL;
  payload: string;
}

// Create Message
export interface MessageSendLoading {
  type: typeof MESSAGE_SEND_LOADING;
}

export interface MessageSendSuccess {
  type: typeof MESSAGE_SEND_SUCCESS;
  payload: MessageInterface;
}

export interface MessageSendFail {
  type: typeof MESSAGE_SEND_FAIL;
  payload: { failedTextMessage: string; error: string };
}

// Dispatch Types
export type MessageSendDispatchTypes =
  | MessageSendLoading
  | MessageSendSuccess
  | MessageSendFail;

export type MessageListDispatchTypes =
  | MessageListLoading
  | MessageListSuccess
  | MessageListFail
  | MessageSendSuccess;
