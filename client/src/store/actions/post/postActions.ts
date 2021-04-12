import { Dispatch } from 'react';
import { RootStore } from '../../store';

import {
  PostCreateDispatchTypes,
  PostLikeDispatchTypes,
  PostListDispatchTypes,
  POST_CREATE_FAIL,
  POST_CREATE_LOADING,
  POST_CREATE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_LOADING,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_LOADING,
  POST_LIST_SUCCESS,
  POST_LIST_UPDATE_ONLIKE,
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

      const { data } = await api.fetchPosts('posts', token);

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

      const { data } = await api.createPost('posts', content, token);

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

export const likePost = (id: string) => {
  return async (
    dispatch: Dispatch<PostLikeDispatchTypes>,
    getState: () => RootStore
  ) => {
    try {
      const token = getState().userLogin.user?.token;

      dispatch({ type: POST_LIKE_LOADING });

      const { data } = await api.likePost(`posts/${id}/like`, token);

      dispatch({ type: POST_LIST_UPDATE_ONLIKE, payload: data });

      dispatch({ type: POST_LIKE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: POST_LIKE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};