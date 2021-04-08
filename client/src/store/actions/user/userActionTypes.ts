export const USER_REGISTER_LOADING = 'USER_REGISTER_LOADING';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export const USER_INFO_LOADING = 'USER_INFO_LOADING';
export const USER_INFO_FAIL = 'USER_INFO_FAIL';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';

export type UserType = {
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  email: string;
};

// USER REGISTER
export interface UserRegisterLoading {
  type: typeof USER_REGISTER_LOADING;
}

export interface UserRegisterFail {
  type: typeof USER_REGISTER_FAIL;
  payload: string;
}

export interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: UserType;
}

// USER LOGIN
export interface UserLoginLoading {
  type: typeof USER_LOGIN_LOADING;
}

export interface UserLoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}

export interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: UserType;
}

// USER INFO
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

// DISPATCH TYPES
export type UserRegisterDispatchTypes =
  | UserRegisterLoading
  | UserRegisterFail
  | UserRegisterSuccess;

export type UserLoginDispatchTypes =
  | UserLoginLoading
  | UserLoginFail
  | UserLoginSuccess;

export type UserInfoDispatchTypes =
  | UserInfoLoading
  | UserInfoFail
  | UserInfoSuccess;
