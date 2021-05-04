import { UserType } from '../user/userActionTypes';

export const NOTIFICATION_LIST_LOADING = 'NOTIFICATION_LIST_LOADING';
export const NOTIFICATION_LIST_SUCCESS = 'NOTIFICATION_LIST_SUCCESS';
export const NOTIFICATION_LIST_FAIL = 'NOTIFICATION_LIST_FAIL';

export const NOTIFICATION_MARK_AS_OPENED_LOADING =
  'NOTIFICATION_MARK_AS_OPENED_LOADING';
export const NOTIFICATION_MARK_AS_OPENED_SUCCESS =
  'NOTIFICATION_MARK_AS_OPENED_SUCCESS';
export const NOTIFICATION_MARK_AS_OPENED_FAIL =
  'NOTIFICATION_MARK_AS_OPENED_FAIL';

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

export type NotificationListDispatchTypes =
  | NotificationListLoading
  | NotificationListSuccess
  | NotificationListFail;

export type NotificationMarkAsOpenedDispatchTypes =
  | NotificationMarkAsOpenedLoading
  | NotificationMarkAsOpenedSuccess
  | NotificationMarkAsOpenedFail;
