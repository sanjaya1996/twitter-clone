import {
  NotificationInterface,
  NotificationListDispatchTypes,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_LOADING,
  NOTIFICATION_LIST_SUCCESS,
} from '../actions/notification/notificationActionTypes';

interface NotificationDefaultStateI {
  loading?: boolean;
  error?: string;
  notifications: NotificationInterface[];
}

export const notificationListReducer = (
  state: NotificationDefaultStateI = { notifications: [] },
  action: NotificationListDispatchTypes
): NotificationDefaultStateI => {
  switch (action.type) {
    case NOTIFICATION_LIST_LOADING:
      return { ...state, loading: true };
    case NOTIFICATION_LIST_SUCCESS:
      return { loading: false, notifications: action.payload };
    case NOTIFICATION_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
