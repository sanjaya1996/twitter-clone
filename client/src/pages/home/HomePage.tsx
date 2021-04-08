import React from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store/store';

const HomePage: React.FC = () => {
  const userState = useSelector((state: RootStore) => state.userInfo);
  console.log(userState);
  return (
    <div>
      <h1>This is a Home Page !</h1>
    </div>
  );
};

export default HomePage;
