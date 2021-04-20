import { combineReducers } from 'redux';
import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postLikeReducer,
  postListReducer,
} from './postReducer';
import {
  loggedInUserInfoReducer,
  userAuthenticateReducer,
  userFollowersReducer,
  userFollowingListReducer,
  userInfoReducer,
} from './userReducer';

const RootReducer = combineReducers({
  userAuth: userAuthenticateReducer,
  userInfo: userInfoReducer,
  loggedInUserInfo: loggedInUserInfoReducer,
  userFollowers: userFollowersReducer,
  userFollowingList: userFollowingListReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postCreate: postCreateReducer,
  postLike: postLikeReducer,
  postDelete: postDeleteReducer,
});

export default RootReducer;
