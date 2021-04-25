import { PostInterface } from '../actions/post/postActionTypes';
import {
  SearchDispatchTypes,
  SEARCH_LOADING,
  SEARCH_POSTS_SUCCESS,
  SEARCH_RESET,
  SEARCH_USERS_SUCCESS,
} from '../actions/search/searchActionTypes';
import { UserType } from '../actions/user/userActionTypes';

interface DefaultStateI {
  loading?: boolean;
  posts: PostInterface[];
  users: UserType[];
  error?: string;
}

export const searchReducer = (
  state: DefaultStateI = { users: [], posts: [] },
  action: SearchDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case SEARCH_LOADING:
      return { ...state, loading: true };
    case SEARCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case SEARCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case SEARCH_RESET:
      return { users: [], posts: [] };
    default:
      return state;
  }
};
