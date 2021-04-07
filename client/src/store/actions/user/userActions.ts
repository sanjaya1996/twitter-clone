import { Dispatch } from 'redux';
import axios, { AxiosRequestConfig } from 'axios';
import {
  UserRegisterDispatchTypes,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
