import { combineReducers } from 'redux';
import { postCreateReducer, postListReducer } from './postReducer';
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
  postCreate: postCreateReducer,
});

export default RootReducer;
