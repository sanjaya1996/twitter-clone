import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootStore } from '../../store/store';

import ProfilePage from './ProfilePage';
import * as userActions from '../../store/actions/user/userActions';

import './profile.scss';

const MyProfilePage: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const dispatch = useDispatch();

  const loggedInUserInfoState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { loading, error, user } = loggedInUserInfoState;

  useEffect(() => {
    dispatch(userActions.getLoggedInUserInfo());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else if (user) {
    return <ProfilePage userInfo={user} />;
  } else {
    return <h1>No User found</h1>;
  }
};

export default MyProfilePage;
