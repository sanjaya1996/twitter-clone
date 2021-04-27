import { Dispatch } from 'react';
import {
  PostCreateDispatchTypes,
  PostDeleteDispatchTypes,
  PostDetailsDispatchTypes,
  PostInterface,
  PostLikeDispatchTypes,
  PostListDispatchTypes,
  PostRetweetDispatchType,
  PostUpdateDispatchTypes,
  POST_CREATE_FAIL,
  POST_CREATE_LOADING,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_LOADING,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_LOADING,
  POST_DETAILS_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_LOADING,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_LOADING,
  POST_LIST_SUCCESS,
  POST_LIST_UPDATE_ONLIKE,
  POST_RETWEET,
  POST_UPDATE_FAIL,
  POST_UPDATE_LOADING,
  POST_UPDATE_SUCCESS,
} from './postActionTypes';

import * as api from '../../../api/index';
import { getApiErrorMessage } from '../../../utils/errorMessage';

export const listPosts = (userId?: string, isReply?: boolean) => {
  return async (dispatch: Dispatch<PostListDispatchTypes>) => {
    try {
      dispatch({ type: POST_LIST_LOADING });

      let res;
      if (userId && isReply) {
        res = await api.fetchUserPostReplies(userId);
      } else if (userId) {
        res = await api.fetchUserPosts(userId);
      } else {
        res = await api.fetchPosts();
      }

      const { data } = res;

      dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: POST_LIST_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const getPostDetails = (id: string) => {
  return async (dispatch: Dispatch<PostDetailsDispatchTypes>) => {
    try {
      dispatch({ type: POST_DETAILS_LOADING });

      const { data } = await api.fetchPostDetails(id);

      dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: POST_DETAILS_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const createPost = (postData: { content: string; replyTo?: string }) => {
  return async (dispatch: Dispatch<PostCreateDispatchTypes>) => {
    try {
      dispatch({ type: POST_CREATE_LOADING });

      const { data } = await api.createPost(postData);

      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload: getApiErrorMessage(err),
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
        payload: getApiErrorMessage(err),
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

export const deletePost = (id: string) => {
  return async (dispatch: Dispatch<PostDeleteDispatchTypes>) => {
    try {
      dispatch({ type: POST_DELETE_LOADING });

      const {
        data: { message },
      } = await api.deletePost(id);

      dispatch({ type: POST_DELETE_SUCCESS, payload: message });
    } catch (err) {
      dispatch({
        type: POST_DELETE_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const updatePost = (id: string, data: Partial<PostInterface>) => {
  return async (dispatch: Dispatch<PostUpdateDispatchTypes>) => {
    try {
      dispatch({ type: POST_UPDATE_LOADING });

      const {
        data: { message },
      } = await api.updatePost(id, data);

      dispatch({ type: POST_UPDATE_SUCCESS, payload: message });
    } catch (err) {
      dispatch({
        type: POST_UPDATE_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};
