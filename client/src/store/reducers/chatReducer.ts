import {
  ChatCreateDispatchTypes,
  ChatDetailsDispatchTypes,
  ChatInterface,
  ChatListDispatchTypes,
  CHAT_CREATE_FAIL,
  CHAT_CREATE_LOADING,
  CHAT_CREATE_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_DETAILS_LOADING,
  CHAT_DETAILS_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_LIST_LOADING,
  CHAT_LIST_SUCCESS,
} from '../actions/chat/chatActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface ChatListStateI extends DefaultStateI {
  chats: ChatInterface[];
}

interface ChatDetailsStateI extends DefaultStateI {
  chat?: ChatInterface;
}

interface ChatCreateStateI extends DefaultStateI {
  chat?: ChatInterface;
  success?: boolean;
}

export const chatListReducer = (
  state: ChatListStateI = { chats: [] },
  action: ChatListDispatchTypes
): ChatListStateI => {
  switch (action.type) {
    case CHAT_LIST_LOADING:
      return { ...state, loading: true };
    case CHAT_LIST_SUCCESS:
      return { loading: false, chats: action.payload };
    case CHAT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatDetailsReducer = (
  state: ChatDetailsStateI = {},
  action: ChatDetailsDispatchTypes
): ChatDetailsStateI => {
  switch (action.type) {
    case CHAT_DETAILS_LOADING:
      return { loading: true };
    case CHAT_DETAILS_SUCCESS:
      return { loading: false, chat: action.payload };
    case CHAT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatCreateReducer = (
  state: ChatCreateStateI = {},
  action: ChatCreateDispatchTypes
): ChatCreateStateI => {
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
