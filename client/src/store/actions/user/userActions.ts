import { Dispatch } from 'redux';
import {
  USER_INFO_LOADING,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  UserInfoDispatchTypes,
  UserLogoutDispatchTypes,
  USER_LOGOUT,
  RegisterUserDataType,
  LoginUserDataType,
  UserFollowDispatchTypes,
  USER_FOLLOW_FAIL,
  LoggedInUserInfoDispatchTypes,
  LOGGED_IN_USER_INFO_LOADING,
  LOGGED_IN_USER_INFO_SUCCESS,
  LOGGED_IN_USER_INFO_FAIL,
  UserAuthenticateDispatchTypes,
  USER_AUTHENTICATE_LOADING,
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAIL,
  UPDATE_AUTH_USER,
  USER_INFO_UPDATE_FOLLOWERS,
  UserFollowersDispatchTypes,
  USER_FOLLOWERS_LOADING,
  USER_FOLLOWERS_SUCCESS,
  USER_FOLLOWERS_FAIL,
  UserFollowingListDispatchTypes,
  USER_FOLLOWING_LIST_LOADING,
  USER_FOLLOWING_LIST_SUCCESS,
  USER_FOLLOWING_LIST_FAIL,
} from './userActionTypes';

import * as api from '../../../api/index';

type AuthType = 'login' | 'register';

export const authenticateUser = (
  formData: LoginUserDataType | RegisterUserDataType,
  type: AuthType
) => {
  return async (dispatch: Dispatch<UserAuthenticateDispatchTypes>) => {
    try {
      dispatch({ type: USER_AUTHENTICATE_LOADING });

      let resData;
      if (type === 'login') {
        resData = await api.loginUser(formData);
      } else {
        resData = await api.registerUser(formData as RegisterUserDataType);
      }

      const data = resData.data;

      dispatch({ type: USER_AUTHENTICATE_SUCCESS, payload: data });
      dispatch({ type: LOGGED_IN_USER_INFO_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_AUTHENTICATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getLoggedInUserInfo = () => {
  return async (dispatch: Dispatch<LoggedInUserInfoDispatchTypes>) => {
    try {
      dispatch({ type: LOGGED_IN_USER_INFO_LOADING });

      const { data } = await api.getLoggedInUserInfo();

      dispatch({ type: LOGGED_IN_USER_INFO_SUCCESS, payload: data });
      dispatch({ type: UPDATE_AUTH_USER, payload: data });
    } catch (err) {
      dispatch({
        type: LOGGED_IN_USER_INFO_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getUserInfoById = (id: string) => {
  return async (dispatch: Dispatch<UserInfoDispatchTypes>) => {
    try {
      dispatch({ type: USER_INFO_LOADING });

      const { data } = await api.getUserInfoById(id);

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

export const followUser = (id: string) => {
  return async (dispatch: Dispatch<UserFollowDispatchTypes>) => {
    try {
      const { data } = await api.followUser(id);

      dispatch({ type: UPDATE_AUTH_USER, payload: data });
      dispatch({ type: LOGGED_IN_USER_INFO_SUCCESS, payload: data });
      dispatch({ type: USER_INFO_UPDATE_FOLLOWERS, payload: id });
    } catch (err) {
      dispatch({
        type: USER_FOLLOW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getUserFollowers = (id: string) => {
  return async (dispatch: Dispatch<UserFollowersDispatchTypes>) => {
    try {
      dispatch({ type: USER_FOLLOWERS_LOADING });

      const { data } = await api.getUserFollowers(id);

      dispatch({ type: USER_FOLLOWERS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_FOLLOWERS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getUserFollowing = (id: string) => {
  return async (dispatch: Dispatch<UserFollowingListDispatchTypes>) => {
    try {
      dispatch({ type: USER_FOLLOWING_LIST_LOADING });

      const { data } = await api.getUserFollowers(id);

      dispatch({ type: USER_FOLLOWING_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_FOLLOWING_LIST_FAIL,
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
