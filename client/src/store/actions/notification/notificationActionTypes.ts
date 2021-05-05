import { UserType } from '../user/userActionTypes';

export const NOTIFICATION_LIST_LOADING = 'NOTIFICATION_LIST_LOADING';
export const NOTIFICATION_LIST_SUCCESS = 'NOTIFICATION_LIST_SUCCESS';
export const NOTIFICATION_LIST_FAIL = 'NOTIFICATION_LIST_FAIL';

export const NOTIFICATION_UNREAD_LIST_LOADING =
  'NOTIFICATION_UNREAD_LIST_LOADING';
export const NOTIFICATION_UNREAD_LIST_SUCCESS =
  'NOTIFICATION_UNREAD_LIST_SUCCESS';
export const NOTIFICATION_UNREAD_LIST_FAIL = 'NOTIFICATION_UNREAD_LIST_FAIL';

export const NOTIFICATION_LATEST_LOADING = 'NOTIFICATION_LATEST_LOADING';
export const NOTIFICATION_LATEST_SUCCESS = 'NOTIFICATION_LATEST_SUCCESS';
export const NOTIFICATION_LATEST_FAIL = 'NOTIFICATION_LATEST_FAIL';

export const NOTIFICATION_MARK_AS_OPENED_LOADING =
  'NOTIFICATION_MARK_AS_OPENED_LOADING';
export const NOTIFICATION_MARK_AS_OPENED_SUCCESS =
  'NOTIFICATION_MARK_AS_OPENED_SUCCESS';
export const NOTIFICATION_MARK_AS_OPENED_FAIL =
  'NOTIFICATION_MARK_AS_OPENED_FAIL';

export const NOTIFICATION_POPUP_REMOVE = 'NOTIFICATION_POPUP_REMOVE';

export interface NotificationInterface {
  _id: string;
  userTo: UserType;
  userFrom: UserType;
  notificationType: 'follow' | 'retweet' | 'postLike' | 'reply' | 'newMessage';
  opened?: boolean;
  entityId: string;
}

// NOTIFICATION LIST
export interface NotificationListLoading {
  type: typeof NOTIFICATION_LIST_LOADING;
}

export interface NotificationListSuccess {
  type: typeof NOTIFICATION_LIST_SUCCESS;
  payload: NotificationInterface[];
}

export interface NotificationListFail {
  type: typeof NOTIFICATION_LIST_FAIL;
  payload: string;
}

// UNREAD NOTIFICATION  LIST
export interface NotificationUnreadListLoading {
  type: typeof NOTIFICATION_UNREAD_LIST_LOADING;
}

export interface NotificationUnreadListSuccess {
  type: typeof NOTIFICATION_UNREAD_LIST_SUCCESS;
  payload: NotificationInterface[];
}

export interface NotificationUnreadListFail {
  type: typeof NOTIFICATION_UNREAD_LIST_FAIL;
  payload: string;
}

// LATEST NOTIFICATION
export interface NotificationLatestLoading {
  type: typeof NOTIFICATION_LATEST_LOADING;
}

export interface NotificationLatestSuccess {
  type: typeof NOTIFICATION_LATEST_SUCCESS;
  payload: NotificationInterface;
}

export interface NotificationLatestFail {
  type: typeof NOTIFICATION_LATEST_FAIL;
  payload: string;
}

// MARK NOTIFICATION AS OPENED
export interface NotificationMarkAsOpenedLoading {
  type: typeof NOTIFICATION_MARK_AS_OPENED_LOADING;
}

export interface NotificationMarkAsOpenedSuccess {
  type: typeof NOTIFICATION_MARK_AS_OPENED_SUCCESS;
}

export interface NotificationMarkAsOpenedFail {
  type: typeof NOTIFICATION_MARK_AS_OPENED_FAIL;
  payload: string;
}

// REMOVE NOTIFICATION POPUP
export interface NotificationPopupRemove {
  type: typeof NOTIFICATION_POPUP_REMOVE;
}

export type NotificationListDispatchTypes =
  | NotificationListLoading
  | NotificationListSuccess
  | NotificationListFail;

export type NotificationUnreadListDispatchTypes =
  | NotificationUnreadListLoading
  | NotificationUnreadListSuccess
  | NotificationUnreadListFail;

export type NotificationLatestDispatchTypes =
  | NotificationLatestLoading
  | NotificationLatestSuccess
  | NotificationLatestFail
  | NotificationPopupRemove;

export type NotificationMarkAsOpenedDispatchTypes =
  | NotificationMarkAsOpenedLoading
  | NotificationMarkAsOpenedSuccess
  | NotificationMarkAsOpenedFail;
