import { UserType } from '../user/userActionTypes';

export const CHAT_LIST_LOADING = 'CHAT_LIST_LOADING';
export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
export const CHAT_LIST_FAIL = 'CHAT_LIST_FAIL';

export const CHAT_DETAILS_LOADING = 'CHAT_DETAILS_LOADING';
export const CHAT_DETAILS_SUCCESS = 'CHAT_DETAILS_SUCCESS';
export const CHAT_DETAILS_FAIL = 'CHAT_DETAILS_FAIL';

export const CHAT_CREATE_LOADING = 'CHAT_CREATE_LOADING';
export const CHAT_CREATE_SUCCESS = 'CHAT_CREATE_SUCCESS';
export const CHAT_CREATE_FAIL = 'CHAT_CREATE_FAIL';

export const CHAT_UPDATE_LOADING = 'CHAT_UPDATE_LOADING';
export const CHAT_UPDATE_SUCCESS = 'CHAT_UPDATE_SUCCESS';
export const CHAT_UPDATE_FAIL = 'CHAT_UPDATE_FAIL';

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

// Chat Details
export interface ChatDetailsLoading {
  type: typeof CHAT_DETAILS_LOADING;
}

export interface ChatDetailsSuccess {
  type: typeof CHAT_DETAILS_SUCCESS;
  payload: ChatInterface;
}

export interface ChatDetailsFail {
  type: typeof CHAT_DETAILS_FAIL;
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

// Update Chat
export interface ChatUpdateLoading {
  type: typeof CHAT_UPDATE_LOADING;
}

export interface ChatUpdateSuccess {
  type: typeof CHAT_UPDATE_SUCCESS;
}

export interface ChatUpdateFail {
  type: typeof CHAT_UPDATE_FAIL;
  payload: string;
}

// Dispatch Types
export type ChatListDispatchTypes =
  | ChatListLoading
  | ChatListSuccess
  | ChatListFail;

export type ChatDetailsDispatchTypes =
  | ChatDetailsLoading
  | ChatDetailsSuccess
  | ChatDetailsFail;

export type ChatCreateDispatchTypes =
  | ChatCreateLoading
  | ChatCreateSuccess
  | ChatCreateFail;

export type ChatUpdateDispatchTypes =
  | ChatUpdateLoading
  | ChatUpdateSuccess
  | ChatUpdateFail;
