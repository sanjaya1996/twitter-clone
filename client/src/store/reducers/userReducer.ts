import {
  UserRegisterDispatchTypes,
  UserType,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../actions/user/userActionTypes';

interface DefaultStateI {
  loading?: boolean;
  user?: UserType;
  error?: string;
}

const defaultState: DefaultStateI = {
  loading: false,
};

const userReducer = (
  state: DefaultStateI = defaultState,
  action: UserRegisterDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case USER_REGISTER_LOADING:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
