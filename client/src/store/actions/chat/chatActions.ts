import { Dispatch } from 'react';
import {
  ChatCreateDispatchTypes,
  ChatListDispatchTypes,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_LOADING,
  CHAT_CREATE_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_LIST_LOADING,
  CHAT_LIST_SUCCESS,
} from './chatActionTypes';

import * as api from '../../../api/index';
import { UserType } from '../user/userActionTypes';

export const listChats = () => {
  return async (dispatch: Dispatch<ChatListDispatchTypes>) => {
    try {
      dispatch({ type: CHAT_LIST_LOADING });

      const { data } = await api.fetchChats();

      dispatch({ type: CHAT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CHAT_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createChat = (users: UserType[]) => {
  return async (dispatch: Dispatch<ChatCreateDispatchTypes>) => {
    try {
      dispatch({ type: CHAT_CREATE_LOADING });

      const { data } = await api.createChat(users);
      console.log(data);

      dispatch({ type: CHAT_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CHAT_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
