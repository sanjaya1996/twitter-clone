import { Dispatch } from 'react';
import { getApiErrorMessage } from '../../../utils/errorMessage';
import {
  MessageSendDispatchTypes,
  MESSAGE_SEND_LOADING,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
} from './messageActionTypes';
import * as api from '../../../api/index';

export const sendMessage = (content: string, chatId: string) => {
  return async (dispatch: Dispatch<MessageSendDispatchTypes>) => {
    try {
      dispatch({ type: MESSAGE_SEND_LOADING });

      const { data } = await api.sendMessage(content, chatId);

      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: MESSAGE_SEND_FAIL,
        payload: { failedTextMessage: content, error: getApiErrorMessage(err) },
      });
    }
  };
};
