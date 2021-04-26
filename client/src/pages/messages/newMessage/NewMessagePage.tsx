import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../../../components/user/UserList';

import * as searchActions from '../../../store/actions/search/searchActions';
import * as chatActions from '../../../store/actions/chat/chatActions';
import { SEARCH_RESET } from '../../../store/actions/search/searchActionTypes';
import { UserType } from '../../../store/actions/user/userActionTypes';
import { RootStore } from '../../../store/store';

import './newMessage.scss';
import { RouteChildrenProps } from 'react-router';

let timer: NodeJS.Timeout;

const NewMessagePage: React.FC<RouteChildrenProps> = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  const textInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  const searchState = state.search;
  const { users, loading } = searchState;

  const chatCreateState = state.chatCreate;
  const { success, chat } = chatCreateState;

  const selectableUsers = users.filter(
    (u) =>
      u._id !== user?._id && !selectedUsers.some((usr) => usr._id === u._id)
  );

  useEffect(() => {
    if (success && chat) {
      return history.push(`/messages/${chat._id}`);
    }

    if (searchText.length === 0) {
      dispatch({ type: SEARCH_RESET });
    }
  }, [searchText, dispatch, success, history, chat]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    clearTimeout(timer);
    const text = e.target.value.trim();
    setSearchText(text);

    timer = setTimeout(() => {
      if (text.length > 0) {
        dispatch(searchActions.search({ type: 'users', text: text }));
        setShowSearchResults(true);
      }
    }, 1000);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputIsEmpty = textInputRef.current!.value === '';
    if (e.key === 'Backspace' && inputIsEmpty) {
      let updatedSelctedUsers = [...selectedUsers];
      updatedSelctedUsers.pop();
      setSelectedUsers(updatedSelctedUsers);
    }
  };

  const selectUserHandler = (user: UserType) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchText('');

    textInputRef.current!.value = '';
    textInputRef.current!.focus();

    dispatch({ type: SEARCH_RESET });
  };

  const createChatHandler = () => {
    dispatch(chatActions.createChat(selectedUsers));
  };

  return (
    <div className='chatPageContainer'>
      <div className='chatTitleBar'>
        <label htmlFor='userSearchTextbox'>To:</label>
        <div id='selectedUsers'>
          {selectedUsers.length > 0 &&
            selectedUsers.map(({ _id, firstName, lastName }) => (
              <span key={_id} className='selectedUser'>
                {firstName + ' ' + lastName}
              </span>
            ))}
          <input
            ref={textInputRef}
            type='text'
            id='userSearchTextbox'
            placeholder='Type the name of the person'
            onChange={searchHandler}
            onKeyDown={keyDownHandler}
          />
        </div>
      </div>
      <div className='resultsContainer'>
        {!loading && searchText.length !== 0 && showSearchResults && (
          <UserList users={selectableUsers} onSelectUser={selectUserHandler} />
        )}
      </div>
      <button
        id='createChatButton'
        disabled={selectedUsers.length === 0}
        onClick={createChatHandler}
      >
        Create chat
      </button>
    </div>
  );
};

export default NewMessagePage;
