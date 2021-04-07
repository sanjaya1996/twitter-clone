export const USER_REGISTER_LOADING = 'USER_REGISTER_LOADING';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

export type UserType = {
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  email: string;
};

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

export type UserRegisterDispatchTypes =
  | UserRegisterLoading
  | UserRegisterFail
  | UserRegisterSuccess;
