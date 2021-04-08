import { combineReducers } from 'redux';
import {
  userInfoReducer,
  userLoginReducer,
  userRegisterReducer,
} from './userReducer';

const RootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userInfo: userInfoReducer,
});

export default RootReducer;
