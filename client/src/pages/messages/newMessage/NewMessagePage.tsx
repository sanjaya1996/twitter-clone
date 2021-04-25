import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../../../components/user/UserList';

import * as searchActions from '../../../store/actions/search/searchActions';
import { SEARCH_RESET } from '../../../store/actions/search/searchActionTypes';
import { RootStore } from '../../../store/store';

import './newMessage.scss';

let timer: NodeJS.Timeout;

const NewMessagePage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  const searchState = state.search;
  const { users, loading } = searchState;

  const selectableUsers = users.filter((u) => u._id !== user?._id);

  useEffect(() => {
    if (searchText.length === 0) {
      dispatch({ type: SEARCH_RESET });
    }
  }, [searchText, dispatch]);

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

  return (
    <div className='chatPageContainer'>
      <div className='chatTitleBar'>
        <label htmlFor='userSearchTextbox'>To:</label>
        <div id='selectedUsers'>
          <input
            type='text'
            id='userSearchTextbox'
            placeholder='Type the name of the person'
            onChange={searchHandler}
          />
        </div>
      </div>
      <div className='resultsContainer'>
        {!loading && searchText.length !== 0 && showSearchResults && (
          <UserList users={selectableUsers} showBtns={true} />
        )}
      </div>
      <button id='createChatButton' disabled={true}>
        Create chat
      </button>
    </div>
  );
};

export default NewMessagePage;
