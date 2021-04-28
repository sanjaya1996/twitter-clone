import {
  MessageSendDispatchTypes,
  MessageInterface,
  MESSAGE_SEND_LOADING,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
} from '../actions/message/messageActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface MessageSendStateI extends DefaultStateI {
  success?: boolean;
  message?: MessageInterface;
  failedTextMessage?: string;
}

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
