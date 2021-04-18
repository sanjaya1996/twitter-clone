import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';

import ProfilePage from './ProfilePage';
import * as userActions from '../../store/actions/user/userActions';
import TitleBar from '../../components/titleBar/TitleBar';

import './profile.scss';

const MyProfilePage = () => {
  const dispatch = useDispatch();

  const userInfoState = useSelector((state: RootStore) => state.userInfo);
  const { user, loading, error } = userInfoState;

  useEffect(() => {
    dispatch(userActions.getUserInfo());
  }, [dispatch]);

  if (loading) {
    return <p>Loading Profile...</p>;
  }
  if (error) {
    return (
      <>
        <TitleBar title={error} />
        <span className='errorMessage'>
          Check the url you are trying to access
        </span>
      </>
    );
  }

  if (user) {
    return <ProfilePage userInfo={user} />;
  } else {
    return <h1>User Not Found</h1>;
  }
};

export default MyProfilePage;
