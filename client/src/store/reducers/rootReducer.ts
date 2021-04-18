import { combineReducers } from 'redux';
import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postLikeReducer,
  postListReducer,
} from './postReducer';
import {
  userInfoReducer,
  userLoginReducer,
  userRegisterReducer,
} from './userReducer';

const RootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userInfo: userInfoReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postCreate: postCreateReducer,
  postLike: postLikeReducer,
  postDelete: postDeleteReducer,
});

export default RootReducer;
