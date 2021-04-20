export const USER_AUTHENTICATE_LOADING = 'USER_AUTHENTICATE_LOADING';
export const USER_AUTHENTICATE_FAIL = 'USER_AUTHENTICATE_FAIL';
export const USER_AUTHENTICATE_SUCCESS = 'USER_AUTHENTICATE_SUCCESS';

export const LOGGED_IN_USER_INFO_LOADING = 'LOGGED_IN_USER_INFO_LOADING';
export const LOGGED_IN_USER_INFO_FAIL = 'LOGGED_IN_USER_INFO_FAIL';
export const LOGGED_IN_USER_INFO_SUCCESS = 'LOGGED_IN_USER_INFO_SUCCESS';

export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';

export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_INFO_LOADING = 'USER_INFO_LOADING';
export const USER_INFO_FAIL = 'USER_INFO_FAIL';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';

export const USER_INFO_UPDATE_FOLLOWERS = 'USER_INFO_UPDATE_FOLLOWERS';

export const USER_FOLLOW_LOADING = 'USER_FOLLOW_LOADING';
export const USER_FOLLOW_FAIL = 'USER_FOLLOW_FAIL';
export const USER_FOLLOW_SUCCESS = 'USER_FOLLOW_SUCCESS';

export const USER_FOLLOWERS_LOADING = 'USER_FOLLOWERS_LOADING';
export const USER_FOLLOWERS_FAIL = 'USER_FOLLOWERS_FAIL';
export const USER_FOLLOWERS_SUCCESS = 'USER_FOLLOWERS_SUCCESS';

export const USER_FOLLOWING_LIST_LOADING = 'USER_FOLLOWING_LIST_LOADING';
export const USER_FOLLOWING_LIST_FAIL = 'USER_FOLLOWING_LIST_FAIL';
export const USER_FOLLOWING_LIST_SUCCESS = 'USER_FOLLOWING_LIST_SUCCESS';

export type RegisterUserDataType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

export type LoginUserDataType = {
  email: string;
  password: string;
};

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  email: string;
  following: string[];
  followers: string[];
}

export interface LoggedInUserI extends UserType {
  token: string;
}

// USER AUTHENTICATE
export interface UserAuthenticateLoading {
  type: typeof USER_AUTHENTICATE_LOADING;
}

export interface UserAuthenticateFail {
  type: typeof USER_AUTHENTICATE_FAIL;
  payload: string;
}

export interface UserAuthenticateSuccess {
  type: typeof USER_AUTHENTICATE_SUCCESS;
  payload: LoggedInUserI;
}

//LOGGED IN USER INFO
export interface LoggedInUserInfoLoading {
  type: typeof LOGGED_IN_USER_INFO_LOADING;
}

export interface LoggedInUserInfoFail {
  type: typeof LOGGED_IN_USER_INFO_FAIL;
  payload: string;
}

export interface LoggedInUserInfoSuccess {
  type: typeof LOGGED_IN_USER_INFO_SUCCESS;
  payload: UserType;
}

// UPDATE AUTH USER
export interface UpdateAuthUser {
  type: typeof UPDATE_AUTH_USER;
  payload: UserType;
}

// USER_LOGOUT
export interface UserLogout {
  type: typeof USER_LOGOUT;
}

// USER INFO BY ID
export interface UserInfoLoading {
  type: typeof USER_INFO_LOADING;
}

export interface UserInfoFail {
  type: typeof USER_INFO_FAIL;
  payload: string;
}

export interface UserInfoSuccess {
  type: typeof USER_INFO_SUCCESS;
  payload: UserType;
}

// UPDATE USER INFO
export interface UserInfoUpdateFollowers {
  type: typeof USER_INFO_UPDATE_FOLLOWERS;
  payload: string;
}

// FOLLOW USER
export interface UserFollowLoading {
  type: typeof USER_FOLLOW_LOADING;
}

export interface UserFollowSuccess {
  type: typeof USER_FOLLOW_SUCCESS;
  payload: string;
}

export interface UserFollowFail {
  type: typeof USER_FOLLOW_FAIL;
  payload: string;
}

// USER FOLLOWERS
export interface UserFollowersLoading {
  type: typeof USER_FOLLOWERS_LOADING;
}

export interface UserFollowersSuccess {
  type: typeof USER_FOLLOWERS_SUCCESS;
  payload: UserType[];
}

export interface UserFollowersFail {
  type: typeof USER_FOLLOWERS_FAIL;
  payload: string;
}

// USER FOLLOWING LIST
export interface UserFollowingListLoading {
  type: typeof USER_FOLLOWING_LIST_LOADING;
}

export interface UserFollowingListSuccess {
  type: typeof USER_FOLLOWING_LIST_SUCCESS;
  payload: UserType[];
}

export interface UserFollowingListFail {
  type: typeof USER_FOLLOWING_LIST_FAIL;
  payload: string;
}

// DISPATCH TYPES
export type UserAuthenticateDispatchTypes =
  | UserAuthenticateLoading
  | UserAuthenticateFail
  | UserAuthenticateSuccess
  | LoggedInUserInfoSuccess
  | UpdateAuthUser
  | UserLogout;

export type LoggedInUserInfoDispatchTypes =
  | LoggedInUserInfoLoading
  | LoggedInUserInfoFail
  | LoggedInUserInfoSuccess
  | UpdateAuthUser
  | UserLogout;

export type UserInfoDispatchTypes =
  | UserInfoLoading
  | UserInfoFail
  | UserInfoSuccess
  | UserLogout
  | UserInfoUpdateFollowers;

export type UserFollowDispatchTypes =
  | UserFollowLoading
  | UserFollowFail
  | UserFollowSuccess
  | UserInfoUpdateFollowers
  | UpdateAuthUser
  | LoggedInUserInfoSuccess;

export type UserFollowersDispatchTypes =
  | UserFollowersLoading
  | UserFollowersFail
  | UserFollowersSuccess;

export type UserFollowingListDispatchTypes =
  | UserFollowingListLoading
  | UserFollowingListFail
  | UserFollowingListSuccess;

export type UserLogoutDispatchTypes = UserLogout;
