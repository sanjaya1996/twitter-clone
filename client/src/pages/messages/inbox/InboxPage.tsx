import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from '../../../components/chat/ChatList';
import TitleBar from '../../../components/titleBar/TitleBar';
import { RootStore } from '../../../store/store';

import * as chatActions from '../../../store/actions/chat/chatActions';
import LoadingSpinner from '../../../components/loadingSpinner/LoadSpinner';

const InboxPage: React.FC = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const chatListState = state.chatList;
  const { loading, error, chats } = chatListState;

  useEffect(() => {
    dispatch(chatActions.listChats());
  }, [dispatch]);
  return (
    <>
      <TitleBar
        title='Inbox'
        headerBtnIcon='far fa-plus-square'
        link='/messages/new'
      />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ChatList chats={chats} />
      )}
    </>
  );
};

export default InboxPage;
