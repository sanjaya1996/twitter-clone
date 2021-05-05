import { Dispatch } from 'react';
import { getApiErrorMessage } from '../../../utils/errorMessage';
import {
  NotificationListDispatchTypes,
  NotificationMarkAsOpenedDispatchTypes,
  NotificationUnreadListDispatchTypes,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_LOADING,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_MARK_AS_OPENED_FAIL,
  NOTIFICATION_MARK_AS_OPENED_LOADING,
  NOTIFICATION_MARK_AS_OPENED_SUCCESS,
  NOTIFICATION_UNREAD_LIST_FAIL,
  NOTIFICATION_UNREAD_LIST_LOADING,
  NOTIFICATION_UNREAD_LIST_SUCCESS,
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

export const listUnreadNotifications = () => {
  return async (dispatch: Dispatch<NotificationUnreadListDispatchTypes>) => {
    try {
      dispatch({ type: NOTIFICATION_UNREAD_LIST_LOADING });

      const { data } = await api.getUnreadNotifications();

      dispatch({ type: NOTIFICATION_UNREAD_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: NOTIFICATION_UNREAD_LIST_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const markNotificationsAsOpened = (
  notificationId?: string,
  callback?: () => void
) => {
  return async (dispatch: Dispatch<NotificationMarkAsOpenedDispatchTypes>) => {
    try {
      dispatch({ type: NOTIFICATION_MARK_AS_OPENED_LOADING });

      notificationId
        ? await api.markANotificationAsOpened(notificationId)
        : await api.markAllNotificationsAsOpened();

      callback ? callback() : window.location.reload();

      dispatch({ type: NOTIFICATION_MARK_AS_OPENED_SUCCESS });
    } catch (err) {
      dispatch({
        type: NOTIFICATION_MARK_AS_OPENED_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};
