import { combineReducers } from 'redux';
import {
  chatCreateReducer,
  chatDetailsReducer,
  chatListReducer,
  chatUnreadListReducer,
  chatUpdateReducer,
} from './chatReducer';
import {
  messageListReducer,
  messageMarkAsReadReducer,
  messageSendReducer,
} from './messageReducer';
import {
  notificationListReducer,
  notificationMarkAsOpenedReducer,
  notificationPopupListReducer,
  notificationUnreadListReducer,
} from './notificationReducer';
import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postLikeReducer,
  postListReducer,
  postUpdateReducer,
} from './postReducer';
import { searchReducer } from './searchReducer';
import { socketChatRoomReducer, socketConnectReducer } from './socketReducer';
import { profilePicUploadReducer } from './uploadReducer';
import {
  loggedInUserInfoReducer,
  userAuthenticateReducer,
  userFollowersReducer,
  userFollowingListReducer,
  userFollowReducer,
  userInfoReducer,
} from './userReducer';

const RootReducer = combineReducers({
  userAuth: userAuthenticateReducer,
  userInfo: userInfoReducer,
  loggedInUserInfo: loggedInUserInfoReducer,
  userFollow: userFollowReducer,
  userFollowers: userFollowersReducer,
  userFollowingList: userFollowingListReducer,
  profilePicUpload: profilePicUploadReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postCreate: postCreateReducer,
  postLike: postLikeReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  search: searchReducer,
  chatList: chatListReducer,
  chatDetails: chatDetailsReducer,
  chatCreate: chatCreateReducer,
  chatUpdate: chatUpdateReducer,
  chatUnreadList: chatUnreadListReducer,
  messageList: messageListReducer,
  messageSend: messageSendReducer,
  messageMark: messageMarkAsReadReducer,
  notificationList: notificationListReducer,
  notificationUnreadList: notificationUnreadListReducer,
  notificationPopupList: notificationPopupListReducer,
  notificationMark: notificationMarkAsOpenedReducer,
  socketConnect: socketConnectReducer,
  socketChatRoom: socketChatRoomReducer,
});

export default RootReducer;
