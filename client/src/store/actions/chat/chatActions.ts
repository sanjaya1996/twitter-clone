import { Dispatch } from 'react';
import {
  ChatCreateDispatchTypes,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_LOADING,
  CHAT_CREATE_SUCCESS,
} from './chatActionTypes';

import * as api from '../../../api/index';
import { UserType } from '../user/userActionTypes';

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
