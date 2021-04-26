import { PostInterface } from '../post/postActionTypes';
import { UserType } from '../user/userActionTypes';

export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';

export const SEARCH_FAIL = 'SEARCH_FAIL';
export const SEARCH_RESET = 'SEARCH_RESET';

export type SearchTypes = 'users' | 'posts';

export interface SearchObjectI {
  type: SearchTypes;
  text: string;
}

export interface SearchLoading {
  type: typeof SEARCH_LOADING;
}

export interface SearchPostsSuccess {
  type: typeof SEARCH_POSTS_SUCCESS;
  payload: PostInterface[];
}

export interface SearchUsersSuccess {
  type: typeof SEARCH_USERS_SUCCESS;
  payload: UserType[];
}

export interface SearchFail {
  type: typeof SEARCH_FAIL;
  payload: string;
}

export interface SearchReset {
  type: typeof SEARCH_RESET;
}

export type SearchDispatchTypes =
  | SearchLoading
  | SearchPostsSuccess
  | SearchUsersSuccess
  | SearchFail
  | SearchReset;
