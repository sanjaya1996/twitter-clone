import { UserType } from '../user/userActionTypes';

export const CHAT_CREATE_LOADING = 'CHAT_CREATE_LOADING';
export const CHAT_CREATE_SUCCESS = 'CHAT_CREATE_SUCCESS';
export const CHAT_CREATE_FAIL = 'CHAT_CREATE_FAIL';

export interface ChatInterface {
  _id: string;
  isGroupChat: boolean;
  users: UserType[];
  latestMessage: string;
}

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

export type ChatCreateDispatchTypes =
  | ChatCreateLoading
  | ChatCreateSuccess
  | ChatCreateFail;
