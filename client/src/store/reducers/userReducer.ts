import {
  UserRegisterDispatchTypes,
  UserType,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  UserInfoDispatchTypes,
  USER_INFO_LOADING,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  UserLoginDispatchTypes,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LoggedInUserI,
  USER_LOGOUT,
} from '../actions/user/userActionTypes';

interface DefaultStateI {
  loading?: boolean;
  user?: UserType;
  error?: string;
}

interface DefaultLoginStateI {
  loading?: boolean;
  user?: LoggedInUserI;
  error?: string;
}

const defaultState: DefaultStateI = {
  loading: false,
};

const defaultLoginState: DefaultLoginStateI = {
  loading: false,
};

export const userRegisterReducer = (
  state: DefaultLoginStateI = defaultLoginState,
  action: UserRegisterDispatchTypes
): DefaultLoginStateI => {
  switch (action.type) {
    case USER_REGISTER_LOADING:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (
  state: DefaultLoginStateI = defaultLoginState,
  action: UserLoginDispatchTypes
): DefaultLoginStateI => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userInfoReducer = (
  state: DefaultStateI = defaultState,
  action: UserInfoDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case USER_INFO_LOADING:
      return { loading: true };
    case USER_INFO_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_INFO_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
