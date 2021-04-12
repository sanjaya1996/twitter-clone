import { Dispatch } from 'redux';
import {
  UserRegisterDispatchTypes,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  UserLoginDispatchTypes,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_INFO_LOADING,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  UserInfoDispatchTypes,
  UserLoginSuccess,
  UserLogoutDispatchTypes,
  USER_LOGOUT,
  RegisterUserDataType,
} from './userActionTypes';

import * as api from '../../../api/index';
import { RootStore } from '../../store';

export const registerUser = (userInfo: RegisterUserDataType) => {
  return async (
    dispatch: Dispatch<UserRegisterDispatchTypes | UserLoginSuccess>
  ) => {
    try {
      dispatch({ type: USER_REGISTER_LOADING });

      const { data } = await api.registerUser('users', userInfo);

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const loginUser = (loginDetails: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch<UserLoginDispatchTypes>) => {
    try {
      dispatch({ type: USER_LOGIN_LOADING });

      const { data } = await api.loginUser('users/login', loginDetails);

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getUserInfo = () => {
  return async (
    dispatch: Dispatch<UserInfoDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      dispatch({ type: USER_INFO_LOADING });

      const token = getState().userLogin.user?.token;

      const { data } = await api.getUserInfo('users/myprofile', token);

      dispatch({ type: USER_INFO_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_INFO_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<UserLogoutDispatchTypes>) => {
    localStorage.removeItem('userInfo');

    dispatch({ type: USER_LOGOUT });
  };
};
