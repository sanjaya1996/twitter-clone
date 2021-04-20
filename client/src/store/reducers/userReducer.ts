import {
  UserType,
  UserInfoDispatchTypes,
  USER_INFO_LOADING,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  LoggedInUserI,
  USER_LOGOUT,
  LoggedInUserInfoDispatchTypes,
  LOGGED_IN_USER_INFO_LOADING,
  LOGGED_IN_USER_INFO_SUCCESS,
  LOGGED_IN_USER_INFO_FAIL,
  USER_AUTHENTICATE_LOADING,
  UserAuthenticateDispatchTypes,
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAIL,
  USER_INFO_UPDATE_FOLLOWERS,
  UserFollowersDispatchTypes,
  USER_FOLLOWERS_LOADING,
  USER_FOLLOWERS_SUCCESS,
  USER_FOLLOWERS_FAIL,
  UserFollowingListDispatchTypes,
  USER_FOLLOWING_LIST_LOADING,
  USER_FOLLOWING_LIST_SUCCESS,
  USER_FOLLOWING_LIST_FAIL,
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

interface DefaultFollowingFollowersListI {
  loading?: boolean;
  users: UserType[];
  error?: string;
}

const defaultState: DefaultStateI = {
  loading: false,
};

const defaultLoginState: DefaultLoginStateI = {
  loading: false,
};

export const userAuthenticateReducer = (
  state: DefaultLoginStateI = defaultLoginState,
  action: UserAuthenticateDispatchTypes
): DefaultLoginStateI => {
  switch (action.type) {
    case USER_AUTHENTICATE_LOADING:
      return { loading: true };
    case USER_AUTHENTICATE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_AUTHENTICATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const loggedInUserInfoReducer = (
  state: DefaultStateI = defaultState,
  action: LoggedInUserInfoDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case LOGGED_IN_USER_INFO_LOADING:
      return { loading: true };
    case LOGGED_IN_USER_INFO_SUCCESS:
      return { loading: false, user: action.payload };
    case LOGGED_IN_USER_INFO_FAIL:
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
    case USER_INFO_UPDATE_FOLLOWERS:
      const newFollowerId = action.payload;
      const index = state.user?.followers.indexOf(newFollowerId);
      let updatedUser = { ...state.user } as LoggedInUserI;
      if (index !== undefined && index > -1) {
        updatedUser.followers?.splice(index, 1);
      } else {
        updatedUser.followers?.push(newFollowerId);
      }
      return { user: updatedUser };
    default:
      return state;
  }
};

export const userFollowersReducer = (
  state: DefaultFollowingFollowersListI = { users: [] },
  action: UserFollowersDispatchTypes
): DefaultFollowingFollowersListI => {
  switch (action.type) {
    case USER_FOLLOWERS_LOADING:
      return { ...state, loading: true };
    case USER_FOLLOWERS_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_FOLLOWERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFollowingListReducer = (
  state: DefaultFollowingFollowersListI = { users: [] },
  action: UserFollowingListDispatchTypes
): DefaultFollowingFollowersListI => {
  switch (action.type) {
    case USER_FOLLOWING_LIST_LOADING:
      return { ...state, loading: true };
    case USER_FOLLOWING_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_FOLLOWING_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
