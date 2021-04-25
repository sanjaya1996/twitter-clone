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

      const searchingFor = searchObj.type;
      const keyword = searchObj.text;

      if (searchingFor === 'posts') {
        const { data } = await api.searchPosts(keyword);

        dispatch({ type: SEARCH_POSTS_SUCCESS, payload: data });
      } else if (searchingFor === 'users') {
        const { data } = await api.searchUsers(keyword);

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
