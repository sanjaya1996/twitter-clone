import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';

import ProfilePage from './ProfilePage';
import * as userActions from '../../store/actions/user/userActions';
import { RouteComponentProps } from 'react-router';
import TitleBar from '../../components/titleBar/TitleBar';

import './profile.scss';

interface RouteParams {
  id: string;
}

const OthersProfilePage: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
  history,
}) => {
  const profileId = match.params.id;
  const dispatch = useDispatch();

  const loggedInUserState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { user: loggedInUser } = loggedInUserState;

  const userInfoState = useSelector((state: RootStore) => state.userInfo);
  const { user, loading, error } = userInfoState;

  const loggedInUserId = loggedInUser?._id;
  const loggedInUserName = loggedInUser?.userName;

  useEffect(() => {
    if (profileId === loggedInUserId || profileId === loggedInUserName) {
      return history.push('/profile');
    } else {
      dispatch(userActions.getUserInfoById(profileId));
    }
  }, [dispatch, profileId, history, loggedInUserId, loggedInUserName]);

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

export default OthersProfilePage;
