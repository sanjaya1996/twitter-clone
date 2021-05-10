import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store/store';

import * as userActions from '../../../store/actions/user/userActions';
import { RouteComponentProps } from 'react-router';
import TitleBar from '../../../components/titleBar/TitleBar';
import Tabs from '../../../components/tabs/Tabs';
import UserList from '../../../components/user/UserList';
import FallBackMessage from '../../../components/fallbackMessage/FallbackMessage';
import Meta from '../../../components/meta/Meta';

interface RouteParams {
  id: string;
  tabname: 'followers' | 'following';
}

const FollowersFollowingPage: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
  history,
}) => {
  const profileId = match.params.id;
  const selectedTab = match.params.tabname;
  const dispatch = useDispatch();

  const userInfoState = useSelector((state: RootStore) => state.userInfo);
  const { user, loading, error } = userInfoState;

  const userFollowersState = useSelector(
    (state: RootStore) => state.userFollowers
  );
  const {
    users: followers,
    loading: loadingFollowers,
    error: errorFollowers,
  } = userFollowersState;

  const userFollowingState = useSelector(
    (state: RootStore) => state.userFollowingList
  );
  const {
    users: following,
    loading: loadingFollowing,
    error: errorFollowing,
  } = userFollowingState;

  const displayedUsers = selectedTab === 'followers' ? followers : following;
  const displayedLoading =
    selectedTab === 'followers' ? loadingFollowers : loadingFollowing;
  const displayedError =
    selectedTab === 'followers' ? errorFollowers : errorFollowing;

  useEffect(() => {
    if (selectedTab === 'followers') {
      dispatch(userActions.getUserFollowers(profileId));
    } else if (selectedTab === 'following') {
      dispatch(userActions.getUserFollowing(profileId));
    }
  }, [dispatch, profileId, selectedTab]);

  useEffect(() => {
    dispatch(userActions.getUserInfoById(profileId));
  }, [dispatch, profileId]);

  const TABS = [
    {
      id: 0,
      name: 'Followers',
      link: `/profile/${profileId}/followers`,
      active: selectedTab === 'followers',
    },
    {
      id: 1,
      name: 'Following',
      link: `/profile/${profileId}/following`,
      active: selectedTab === 'following',
    },
  ];

  const tabSelectHandler = (id: number) => {
    history.push(TABS[id].link);
  };

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return (
      <>
        <TitleBar title={error || 'Something Went Wrong'} />
        <span className='errorMessage'>
          Check the url you are trying to access
        </span>
      </>
    );
  }

  if (!user) {
    return <h1>User Not Found</h1>;
  } else {
    return (
      <>
        <Meta
          title={`Followers/Following | ${user.firstName} ${user.lastName}`}
        />
        <TitleBar title={user.firstName + ' ' + user.lastName} />
        <Tabs data={TABS} handleSelect={tabSelectHandler} />
        {displayedLoading ? (
          <p>Loading Users...</p>
        ) : displayedError ? (
          <p>{displayedError}</p>
        ) : displayedUsers.length === 0 ? (
          <FallBackMessage message='No user to show' />
        ) : (
          <UserList users={displayedUsers} showBtns={true} />
        )}
      </>
    );
  }
};

export default FollowersFollowingPage;
