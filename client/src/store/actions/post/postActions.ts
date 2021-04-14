import { Dispatch } from 'react';
import {
  PostCreateDispatchTypes,
  PostLikeDispatchTypes,
  PostListDispatchTypes,
  PostRetweetDispatchType,
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
  POST_RETWEET,
} from './postActionTypes';

import * as api from '../../../api/index';

export const listPosts = () => {
  return async (dispatch: Dispatch<PostListDispatchTypes>) => {
    try {
      dispatch({ type: POST_LIST_LOADING });

      const { data } = await api.fetchPosts();

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
  return async (dispatch: Dispatch<PostCreateDispatchTypes>) => {
    try {
      dispatch({ type: POST_CREATE_LOADING });

      const { data } = await api.createPost(content);

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

export const likePost = (id: string, retweetId: string | null) => {
  return async (dispatch: Dispatch<PostLikeDispatchTypes>) => {
    try {
      dispatch({ type: POST_LIKE_LOADING });

      const { data } = await api.likePost(id);

      dispatch({
        type: POST_LIST_UPDATE_ONLIKE,
        payload: { data, retweetId },
      });

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

export const retweetPost = (id: string, retweetId: string | null) => {
  return async (dispatch: Dispatch<PostRetweetDispatchType>) => {
    try {
      const { data } = await api.retweetPost(id);

      dispatch({ type: POST_RETWEET, payload: { data, retweetId } });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
};
