import { Dispatch } from 'react';
import { getApiErrorMessage } from '../../../utils/errorMessage';
import {
  MessageSendDispatchTypes,
  MESSAGE_SEND_LOADING,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
  MessageListDispatchTypes,
  MESSAGE_LIST_LOADING,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  MessageMarkAsReadDispatchTypes,
  MESSAGE_MARK_AS_READ_LOADING,
  MESSAGE_MARK_AS_READ_SUCCESS,
  MESSAGE_MARK_AS_READ_FAIL,
} from './messageActionTypes';
import * as api from '../../../api/index';
import { emitNewMessageSocket } from '../socket/socketActions';

export const listMessages = (chatId: string) => {
  return async (dispatch: Dispatch<MessageListDispatchTypes>) => {
    try {
      dispatch({ type: MESSAGE_LIST_LOADING });

      const { data } = await api.getMessages(chatId);

      dispatch({ type: MESSAGE_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: MESSAGE_LIST_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const sendMessage = (content: string, chatId: string) => {
  return async (dispatch: Dispatch<MessageSendDispatchTypes>) => {
    try {
      dispatch({ type: MESSAGE_SEND_LOADING });

      const { data } = await api.sendMessage(content, chatId);

      emitNewMessageSocket(data);

      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: MESSAGE_SEND_FAIL,
        payload: { failedTextMessage: content, error: getApiErrorMessage(err) },
      });
    }
  };
};

export const markMessagesAsRead = (chatId: string) => {
  return async (dispatch: Dispatch<MessageMarkAsReadDispatchTypes>) => {
    try {
      dispatch({ type: MESSAGE_MARK_AS_READ_LOADING });

      await api.markAllMessagesAsRead(chatId);

      dispatch({ type: MESSAGE_MARK_AS_READ_SUCCESS });
    } catch (err) {
      dispatch({
        type: MESSAGE_MARK_AS_READ_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};
