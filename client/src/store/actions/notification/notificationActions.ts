import { Dispatch } from 'react';
import { getApiErrorMessage } from '../../../utils/errorMessage';
import {
  NotificationListDispatchTypes,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_LOADING,
  NOTIFICATION_LIST_SUCCESS,
} from './notificationActionTypes';
import * as api from '../../../api';

export const listNotifications = () => {
  return async (dispatch: Dispatch<NotificationListDispatchTypes>) => {
    try {
      dispatch({ type: NOTIFICATION_LIST_LOADING });

      const { data } = await api.getNotifications();

      dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: NOTIFICATION_LIST_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};
