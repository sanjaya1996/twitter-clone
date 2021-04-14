import { UserType } from '../user/userActionTypes';

export const POST_CREATE_LOADING = 'POST_CREATE_LOADING';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_FAIL = 'POST_CREATE_FAIL';

export const POST_LIST_LOADING = 'POST_LIST_LOADING';
export const POST_LIST_SUCCESS = 'POST_LIST_SUCCESS';
export const POST_LIST_FAIL = 'POST_LIST_FAIL';

export const POST_LIST_UPDATE_ONLIKE = 'POST_LIST_UPDATE_ONLIKE';

export const POST_UPDATE_LOADING = 'POST_UPDATE_LOADING';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
export const POST_UPDATE_FAIL = 'POST_UPDATE_FAIL';

export const POST_LIKE_LOADING = 'POST_LIKE_LOADING';
export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';
export const POST_LIKE_FAIL = 'POST_LIKE_FAIL';

export const POST_RETWEET = 'POST_RETWEET';

export const POST_DELETE_LOADING = 'POST_DELETE_LOADING';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAIL = 'POST_DELETE_FAIL';

export interface PostInterface {
  _id: string;
  content: string;
  postedBy: UserType;
  pinned: boolean;
  createdAt: string;
  likes: string[];
  retweetUsers: string[];
  retweetData: PostInterface;
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

export interface PostListUpdateOnLike {
  type: typeof POST_LIST_UPDATE_ONLIKE;
  payload: { data: PostInterface; retweetId: string | null };
}

export interface PostListFail {
  type: typeof POST_LIST_FAIL;
  payload: string;
}

// LIKE POST
export interface PostLikeLoading {
  type: typeof POST_LIKE_LOADING;
}

export interface PostLikeSuccess {
  type: typeof POST_LIKE_SUCCESS;
  payload: PostInterface;
}

export interface PostLikeFail {
  type: typeof POST_LIKE_FAIL;
  payload: string;
}

// RETWEET POST
export interface PostRetweet {
  type: typeof POST_RETWEET;
  payload: { data: PostInterface; retweetId: string | null };
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
  | PostListFail
  | PostListUpdateOnLike
  | PostRetweet;
export type PostLikeDispatchTypes =
  | PostLikeLoading
  | PostLikeSuccess
  | PostLikeFail
  | PostListUpdateOnLike;
export type PostRetweetDispatchType = PostRetweet;
export type PostUpdateDispatchTypes =
  | PostUpdateLoading
  | PostUpdateSuccess
  | PostUpdateFail;
export type PostDeleteDispatchTypes =
  | PostDeleteLoading
  | PostDeleteSuccess
  | PostDeleteFail;
