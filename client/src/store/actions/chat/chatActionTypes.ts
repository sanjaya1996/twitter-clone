import { UserType } from '../user/userActionTypes';

export const CHAT_LIST_LOADING = 'CHAT_LIST_LOADING';
export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
export const CHAT_LIST_FAIL = 'CHAT_LIST_FAIL';

export const CHAT_CREATE_LOADING = 'CHAT_CREATE_LOADING';
export const CHAT_CREATE_SUCCESS = 'CHAT_CREATE_SUCCESS';
export const CHAT_CREATE_FAIL = 'CHAT_CREATE_FAIL';

export interface ChatInterface {
  _id: string;
  chatName?: string;
  isGroupChat: boolean;
  users: UserType[];
  latestMessage: string;
}

// List Chats
export interface ChatListLoading {
  type: typeof CHAT_LIST_LOADING;
}

export interface ChatListSuccess {
  type: typeof CHAT_LIST_SUCCESS;
  payload: ChatInterface[];
}

export interface ChatListFail {
  type: typeof CHAT_LIST_FAIL;
  payload: string;
}

// Create Chat
export interface ChatCreateLoading {
  type: typeof CHAT_CREATE_LOADING;
}

export interface ChatCreateSuccess {
  type: typeof CHAT_CREATE_SUCCESS;
  payload: ChatInterface;
}

export interface ChatCreateFail {
  type: typeof CHAT_CREATE_FAIL;
  payload: string;
}

// Dispatch Types
export type ChatListDispatchTypes =
  | ChatListLoading
  | ChatListSuccess
  | ChatListFail;

export type ChatCreateDispatchTypes =
  | ChatCreateLoading
  | ChatCreateSuccess
  | ChatCreateFail;
