import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootStore } from '../../store/store';

import ProfilePage from './ProfilePage';
import * as userActions from '../../store/actions/user/userActions';
import TitleBar from '../../components/titleBar/TitleBar';

import './profile.scss';

const MyProfilePage: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const dispatch = useDispatch();

  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  useEffect(() => {
    dispatch(userActions.getUserInfo());
  }, [dispatch]);

  if (user) {
    return <ProfilePage userInfo={user} />;
  } else {
    history.push('/login');
    return <h1>Not logged in</h1>;
  }
};

export default MyProfilePage;
