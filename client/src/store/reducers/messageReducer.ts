import {
  MessageSendDispatchTypes,
  MessageInterface,
  MESSAGE_SEND_LOADING,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
  MessageListDispatchTypes,
  MESSAGE_LIST_LOADING,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  MessageMarkAsReadDispatchTypes,
  MESSAGE_MARK_AS_READ_LOADING,
  MESSAGE_MARK_AS_READ_SUCCESS,
  MESSAGE_MARK_AS_READ_FAIL,
  MESSAGE_MARK_AS_READ_RESET,
} from '../actions/message/messageActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface MessageListInterfaceI extends DefaultStateI {
  messages: MessageInterface[];
}

interface MessageSendStateI extends DefaultStateI {
  success?: boolean;
  message?: MessageInterface;
  failedTextMessage?: string;
}

interface MessageMarkAsReadStateI extends DefaultStateI {
  success?: boolean;
}

export const messageListReducer = (
  state: MessageListInterfaceI = { messages: [] },
  action: MessageListDispatchTypes
): MessageListInterfaceI => {
  switch (action.type) {
    case MESSAGE_LIST_LOADING:
      return { ...state, loading: true };
    case MESSAGE_LIST_SUCCESS:
      return { loading: false, messages: action.payload };
    case MESSAGE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case MESSAGE_SEND_SUCCESS:
      let updatedMessages = [...state.messages];
      updatedMessages.push(action.payload);
      return { ...state, messages: updatedMessages };
    default:
      return state;
  }
};

export const messageSendReducer = (
  state: MessageSendStateI = {},
  action: MessageSendDispatchTypes
): MessageSendStateI => {
  switch (action.type) {
    case MESSAGE_SEND_LOADING:
      return { loading: true };
    case MESSAGE_SEND_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case MESSAGE_SEND_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        failedTextMessage: action.payload.failedTextMessage,
      };
    default:
      return state;
  }
};

export const messageMarkAsReadReducer = (
  state: MessageMarkAsReadStateI = {},
  action: MessageMarkAsReadDispatchTypes
): MessageMarkAsReadStateI => {
  switch (action.type) {
    case MESSAGE_MARK_AS_READ_LOADING:
      return { loading: true };
    case MESSAGE_MARK_AS_READ_SUCCESS:
      return { loading: false, success: true };
    case MESSAGE_MARK_AS_READ_FAIL:
      return { loading: false, error: action.payload };
    case MESSAGE_MARK_AS_READ_RESET:
      return {};
    default:
      return state;
  }
};
