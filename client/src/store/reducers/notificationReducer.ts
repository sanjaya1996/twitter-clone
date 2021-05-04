import {
  NotificationInterface,
  NotificationListDispatchTypes,
  NotificationMarkAsOpenedDispatchTypes,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_LOADING,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_MARK_AS_OPENED_FAIL,
  NOTIFICATION_MARK_AS_OPENED_LOADING,
  NOTIFICATION_MARK_AS_OPENED_SUCCESS,
} from '../actions/notification/notificationActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface NotificationDefaultStateI extends DefaultStateI {
  notifications: NotificationInterface[];
}

interface NotificationMarkDefaultStateI extends DefaultStateI {
  success?: boolean;
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

export const notificationMarkAsOpenedReducer = (
  state: NotificationMarkDefaultStateI = {},
  action: NotificationMarkAsOpenedDispatchTypes
): NotificationMarkDefaultStateI => {
  switch (action.type) {
    case NOTIFICATION_MARK_AS_OPENED_LOADING:
      return { loading: true };
    case NOTIFICATION_MARK_AS_OPENED_SUCCESS:
      return { loading: false, success: true };
    case NOTIFICATION_MARK_AS_OPENED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
