import { ChatInterface } from '../chat/chatActionTypes';
import { UserType } from '../user/userActionTypes';

export const MESSAGE_LIST_LOADING = 'MESSAGE_LIST_LOADING';
export const MESSAGE_LIST_SUCCESS = 'MESSAGE_LIST_SUCCESS';
export const MESSAGE_LIST_FAIL = 'MESSAGE_LIST_FAIL';

export const MESSAGE_SEND_LOADING = 'MESSAGE_SEND_LOADING';
export const MESSAGE_SEND_SUCCESS = 'MESSAGE_SEND_SUCCESS';
export const MESSAGE_SEND_FAIL = 'MESSAGE_SEND_FAIL';

export const MESSAGE_ADD_TO_LIST = 'MESSAGE_ADD_TO_LIST';

export const MESSAGE_MARK_AS_READ_LOADING = 'MESSAGE_MARK_AS_READ_LOADING';
export const MESSAGE_MARK_AS_READ_SUCCESS = 'MESSAGE_MARK_AS_READ_SUCCESS';
export const MESSAGE_MARK_AS_READ_FAIL = 'MESSAGE_MARK_AS_READ_FAIL';
export const MESSAGE_MARK_AS_READ_RESET = 'MESSAGE_MARK_AS_READ_RESET';

export interface MessageInterface {
  _id: string;
  sender: UserType;
  content: string;
  chat: ChatInterface;
  readBy: string[];
  loading?: boolean;
  error?: 'failed';
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
  payload?: { sender: UserType; content: string; chat: string };
}

export interface MessageSendSuccess {
  type: typeof MESSAGE_SEND_SUCCESS;
  payload: MessageInterface;
}

export interface MessageSendFail {
  type: typeof MESSAGE_SEND_FAIL;
  payload: { failedTextMessage: string; error: string };
}

// Add new Message to a list
export interface MessageAddToList {
  type: typeof MESSAGE_ADD_TO_LIST;
  payload: MessageInterface;
}

// Mark Messages as Read
export interface MessageMarkAsReadLoading {
  type: typeof MESSAGE_MARK_AS_READ_LOADING;
}

export interface MessageMarkAsReadSuccess {
  type: typeof MESSAGE_MARK_AS_READ_SUCCESS;
}

export interface MessageMarkAsReadFail {
  type: typeof MESSAGE_MARK_AS_READ_FAIL;
  payload: string;
}

export interface MessageMarkAsReadReset {
  type: typeof MESSAGE_MARK_AS_READ_RESET;
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
  | MessageSendSuccess
  | MessageSendLoading
  | MessageSendFail
  | MessageAddToList;

export type MessageMarkAsReadDispatchTypes =
  | MessageMarkAsReadLoading
  | MessageMarkAsReadSuccess
  | MessageMarkAsReadFail
  | MessageMarkAsReadReset;
