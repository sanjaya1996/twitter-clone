import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import LoadingSpinner from '../../components/loadingSpinner/LoadSpinner';
import PostList from '../../components/post/PostList';
import Tabs from '../../components/tabs/Tabs';
import UserList from '../../components/user/UserList';

import * as searchActions from '../../store/actions/search/searchActions';
import { SEARCH_RESET } from '../../store/actions/search/searchActionTypes';
import { RootStore } from '../../store/store';

import './search.scss';

interface RouteParams {
  tabname: 'users' | 'posts';
}

let timer: NodeJS.Timeout;

const SearchPage: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
  history,
}) => {
  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const selectedTab = match.params.tabname;
  const url = match.url;

  const searchType =
    selectedTab === 'posts'
      ? 'posts'
      : selectedTab === 'users'
      ? 'users'
      : null;

  const TABS = useMemo(
    () => [
      {
        id: 0,
        name: 'Posts',
        link: `/search/posts`,
        active: selectedTab === 'posts',
      },
      {
        id: 1,
        name: 'Users',
        link: `/search/users`,
        active: selectedTab === 'users',
      },
    ],
    [selectedTab]
  );

  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  const searchState = state.search;
  const { posts, users, loading } = searchState;

  useEffect(() => {
    if (TABS.some((t) => t.link === url)) {
      return;
    }
    history.push(TABS[0].link);
  }, [TABS, selectedTab, history, url]);

  useEffect(() => {
    if (searchText.trim().length === 0) {
      dispatch({ type: SEARCH_RESET });
    }
  }, [searchText, dispatch]);

  const tabSelectHandler = (id: number) => {
    history.push(TABS[id].link);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(false);
    clearTimeout(timer);
    const text = e.target.value;
    setSearchText(text);

    timer = setTimeout(() => {
      if (text.trim().length > 0) {
        if (searchType) {
          dispatch(
            searchActions.search({ type: searchType, text: text.trim() })
          );
          setShowSearchResults(true);
        }
      }
    }, 1000);
  };

  return (
    <>
      <div className='searchBarContainer'>
        <i className='fas fa-search'></i>
        <input
          type='text'
          name='searchBox'
          id='searchBox'
          placeholder={`Search for ${selectedTab}`}
          onChange={searchHandler}
        />
      </div>
      <Tabs data={TABS} handleSelect={tabSelectHandler} />
      {loading ? (
        <LoadingSpinner />
      ) : searchText.trim().length === 0 || !showSearchResults ? (
        <></>
      ) : (
        <>
          {selectedTab === 'posts' && (
            <PostList posts={posts} userId={user!._id} />
          )}
          {selectedTab === 'users' && (
            <UserList users={users} showBtns={true} />
          )}
        </>
      )}
    </>
  );
};

export default SearchPage;
