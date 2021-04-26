import {
  ChatCreateDispatchTypes,
  ChatInterface,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_LOADING,
  CHAT_CREATE_SUCCESS,
} from '../actions/chat/chatActionTypes';

interface DefaultStateI {
  loading?: boolean;
  chat?: ChatInterface;
  success?: boolean;
  error?: string;
}

export const chatCreateReducer = (
  state: DefaultStateI = {},
  action: ChatCreateDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case CHAT_CREATE_LOADING:
      return { loading: true };
    case CHAT_CREATE_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case CHAT_CREATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
