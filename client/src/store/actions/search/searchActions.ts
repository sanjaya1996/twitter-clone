import { Dispatch } from 'react';
import {
  SearchDispatchTypes,
  SearchObjectI,
  SEARCH_FAIL,
  SEARCH_LOADING,
  SEARCH_POSTS_SUCCESS,
  SEARCH_USERS_SUCCESS,
} from './searchActionTypes';

import * as api from '../../../api/index';

export const search = (searchObj: SearchObjectI) => {
  return async (dispatch: Dispatch<SearchDispatchTypes>) => {
    try {
      dispatch({ type: SEARCH_LOADING });

      if (searchObj.type === 'posts') {
        const { data } = await api.searchPosts(searchObj.text);
        dispatch({ type: SEARCH_POSTS_SUCCESS, payload: data });
      } else {
        const { data } = await api.searchUsers(searchObj.text);
        dispatch({ type: SEARCH_USERS_SUCCESS, payload: data });
      }
    } catch (err) {
      dispatch({
        type: SEARCH_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
