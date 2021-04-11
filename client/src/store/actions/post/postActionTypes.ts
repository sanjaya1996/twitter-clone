import { UserType } from '../user/userActionTypes';

export const POST_CREATE_LOADING = 'POST_CREATE_LOADING';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_FAIL = 'POST_CREATE_FAIL';

export const POST_LIST_LOADING = 'POST_LIST_LOADING';
export const POST_LIST_SUCCESS = 'POST_LIST_SUCCESS';
export const POST_LIST_FAIL = 'POST_LIST_FAIL';

export const POST_UPDATE_LOADING = 'POST_UPDATE_LOADING';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
export const POST_UPDATE_FAIL = 'POST_UPDATE_FAIL';

export const POST_DELETE_LOADING = 'POST_DELETE_LOADING';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAIL = 'POST_DELETE_FAIL';

export interface PostInterface {
  _id: string;
  content: string;
  postedBy: UserType;
  pinned: boolean;
}

// CREATE POST
export interface PostCreateLoading {
  type: typeof POST_CREATE_LOADING;
}

export interface PostCreateSuccess {
  type: typeof POST_CREATE_SUCCESS;
  payload: PostInterface;
}

export interface PostCreateFail {
  type: typeof POST_CREATE_FAIL;
  payload: string;
}

// LIST POST
export interface PostListLoading {
  type: typeof POST_LIST_LOADING;
}

export interface PostListSuccess {
  type: typeof POST_LIST_SUCCESS;
  payload: PostInterface[];
}

export interface PostListFail {
  type: typeof POST_LIST_FAIL;
  payload: string;
}

// UPDATE POST
export interface PostUpdateLoading {
  type: typeof POST_UPDATE_LOADING;
}

export interface PostUpdateSuccess {
  type: typeof POST_UPDATE_SUCCESS;
  payload: PostInterface;
}

export interface PostUpdateFail {
  type: typeof POST_UPDATE_FAIL;
  payload: string;
}

// DELETE POST
export interface PostDeleteLoading {
  type: typeof POST_DELETE_LOADING;
}

export interface PostDeleteSuccess {
  type: typeof POST_DELETE_SUCCESS;
  payload: PostInterface;
}

export interface PostDeleteFail {
  type: typeof POST_DELETE_FAIL;
  payload: string;
}

// DISPATCH TYPES
export type PostCreateDispatchTypes =
  | PostCreateLoading
  | PostCreateSuccess
  | PostCreateFail;
export type PostListDispatchTypes =
  | PostListLoading
  | PostListSuccess
  | PostListFail;
export type PostUpdateDispatchTypes =
  | PostUpdateLoading
  | PostUpdateSuccess
  | PostUpdateFail;
export type PostDeleteDispatchTypes =
  | PostDeleteLoading
  | PostDeleteSuccess
  | PostDeleteFail;
