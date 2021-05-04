import { UserType } from '../user/userActionTypes';

export const NOTIFICATION_LIST_LOADING = 'NOTIFICATION_LIST_LOADING';
export const NOTIFICATION_LIST_SUCCESS = 'NOTIFICATION_LIST_SUCCESS';
export const NOTIFICATION_LIST_FAIL = 'NOTIFICATION_LIST_FAIL';

export interface NotificationInterface {
  _id: string;
  userTo: UserType;
  userFrom: UserType;
  notificationType: 'follow' | 'retweet' | 'postLike' | 'reply' | 'newMessage';
  opened?: boolean;
  entityId: string;
}

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

export type NotificationListDispatchTypes =
  | NotificationListLoading
  | NotificationListSuccess
  | NotificationListFail;
