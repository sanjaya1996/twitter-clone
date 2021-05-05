import { MessageInterface } from '../actions/message/messageActionTypes';
import {
  NotificationInterface,
  NotificationLatestDispatchTypes,
  NotificationListDispatchTypes,
  NotificationMarkAsOpenedDispatchTypes,
  NotificationUnreadListDispatchTypes,
  NOTIFICATION_LATEST_FAIL,
  NOTIFICATION_LATEST_LOADING,
  NOTIFICATION_LATEST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_LOADING,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_MARK_AS_OPENED_FAIL,
  NOTIFICATION_MARK_AS_OPENED_LOADING,
  NOTIFICATION_MARK_AS_OPENED_SUCCESS,
  NOTIFICATION_POPUP_REMOVE,
  NOTIFICATION_UNREAD_LIST_FAIL,
  NOTIFICATION_UNREAD_LIST_LOADING,
  NOTIFICATION_UNREAD_LIST_SUCCESS,
} from '../actions/notification/notificationActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface NotificationDefaultStateI extends DefaultStateI {
  notifications: NotificationInterface[];
}

interface NotificationUnreadDefaultStateI extends NotificationDefaultStateI {
  totalCount: number;
}

interface NotificationsPopupStateI extends DefaultStateI {
  notifications: (NotificationInterface | MessageInterface)[];
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

export const notificationUnreadListReducer = (
  state: NotificationUnreadDefaultStateI = { notifications: [], totalCount: 0 },
  action: NotificationUnreadListDispatchTypes
): NotificationUnreadDefaultStateI => {
  switch (action.type) {
    case NOTIFICATION_UNREAD_LIST_LOADING:
      return { ...state, loading: true };
    case NOTIFICATION_UNREAD_LIST_SUCCESS:
      return {
        loading: false,
        notifications: action.payload,
        totalCount: action.payload.length,
      };
    case NOTIFICATION_UNREAD_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notificationPopupListReducer = (
  state: NotificationsPopupStateI = { notifications: [] },
  action: NotificationLatestDispatchTypes
): NotificationsPopupStateI => {
  let newList;
  switch (action.type) {
    case NOTIFICATION_LATEST_LOADING:
      return { ...state, loading: true };
    case NOTIFICATION_LATEST_SUCCESS:
      newList = [...state.notifications];
      newList.push(action.payload);
      return { loading: false, notifications: newList };
    case NOTIFICATION_LATEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case NOTIFICATION_POPUP_REMOVE:
      newList = [...state.notifications];
      newList.shift();
      return { ...state, notifications: newList };
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
