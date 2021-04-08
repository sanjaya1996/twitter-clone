import { Dispatch } from 'redux';
import axios, { AxiosRequestConfig } from 'axios';
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
} from './userActionTypes';

export const registerUser = (userInfo: {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch<UserRegisterDispatchTypes>) => {
    try {
      dispatch({ type: USER_REGISTER_LOADING });

      const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      };

      const res = await axios.post(
        'http://localhost:5000/api/users',
        userInfo,
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
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
  return async (
    dispatch: Dispatch<UserLoginDispatchTypes | UserInfoDispatchTypes>
  ) => {
    try {
      dispatch({ type: USER_LOGIN_LOADING });

      const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      };

      const res = await axios.post(
        'http://localhost:5000/api/users/login',
        loginDetails,
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      dispatch({ type: USER_INFO_SUCCESS, payload: res.data });
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
  return async (dispatch: Dispatch<UserInfoDispatchTypes>) => {
    try {
      dispatch({ type: USER_INFO_LOADING });

      const config: AxiosRequestConfig = { withCredentials: true };

      const res = await axios.get(
        'http://localhost:5000/api/users/myprofile',
        config
      );

      dispatch({ type: USER_INFO_SUCCESS, payload: res.data });
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
