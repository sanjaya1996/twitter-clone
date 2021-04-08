import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PostForm from '../../components/postForm/PostForm';
import TitleBar from '../../components/titleBar/TitleBar';

import { RootStore } from '../../store/store';

const HomePage: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  return (
    <div>
      <TitleBar title='Home' />
      <PostForm imageUrl={user!.profilePic} />
      <h1>This is a Home Page !</h1>
    </div>
  );
};

export default HomePage;
