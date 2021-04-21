import { combineReducers } from 'redux';
import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postLikeReducer,
  postListReducer,
} from './postReducer';
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
});

export default RootReducer;
