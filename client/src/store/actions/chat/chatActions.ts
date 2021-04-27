import { Dispatch } from 'react';
import {
  ChatCreateDispatchTypes,
  ChatDetailsDispatchTypes,
  ChatListDispatchTypes,
  ChatUpdateDispatchTypes,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_LOADING,
  CHAT_CREATE_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_DETAILS_LOADING,
  CHAT_DETAILS_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_LIST_LOADING,
  CHAT_LIST_SUCCESS,
  CHAT_UPDATE_FAIL,
  CHAT_UPDATE_LOADING,
  CHAT_UPDATE_SUCCESS,
} from './chatActionTypes';

import * as api from '../../../api/index';
import { UserType } from '../user/userActionTypes';
import { getApiErrorMessage } from '../../../utils/errorMessage';

export const listChats = () => {
  return async (dispatch: Dispatch<ChatListDispatchTypes>) => {
    try {
      dispatch({ type: CHAT_LIST_LOADING });

      const { data } = await api.fetchChats();

      dispatch({ type: CHAT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CHAT_LIST_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const getChatDetails = (id: string) => {
  return async (dispatch: Dispatch<ChatDetailsDispatchTypes>) => {
    try {
      dispatch({ type: CHAT_DETAILS_LOADING });

      const { data } = await api.fetchChatDetails(id);

      dispatch({ type: CHAT_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CHAT_DETAILS_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const createChat = (users: UserType[]) => {
  return async (dispatch: Dispatch<ChatCreateDispatchTypes>) => {
    try {
      dispatch({ type: CHAT_CREATE_LOADING });

      const { data } = await api.createChat(users);

      dispatch({ type: CHAT_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CHAT_CREATE_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const updateChat = (id: string, name: string) => {
  return async (dispatch: Dispatch<ChatUpdateDispatchTypes>) => {
    try {
      dispatch({ type: CHAT_UPDATE_LOADING });

      await api.updateChat(id, name);

      dispatch({ type: CHAT_UPDATE_SUCCESS });
    } catch (err) {
      dispatch({
        type: CHAT_UPDATE_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};
