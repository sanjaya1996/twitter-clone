import { Dispatch } from 'react';
import { RootStore } from '../../store';

import {
  PostCreateDispatchTypes,
  PostListDispatchTypes,
  POST_CREATE_FAIL,
  POST_CREATE_LOADING,
  POST_CREATE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_LOADING,
  POST_LIST_SUCCESS,
} from './postActionTypes';

import * as api from '../../../api/index';

export const listPosts = () => {
  return async (
    dispatch: Dispatch<PostListDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      dispatch({ type: POST_LIST_LOADING });

      const token = getState().userLogin.user?.token;

      const { data } = await api.fetchPosts('api/posts', token);

      dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: POST_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createPost = (content: string) => {
  return async (
    dispatch: Dispatch<PostCreateDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      dispatch({ type: POST_CREATE_LOADING });

      const token = getState().userLogin.user?.token;

      const { data } = await api.createPost('api/posts', content, token);

      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
