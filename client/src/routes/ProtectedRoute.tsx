import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { RootStore } from '../store/store';

type Props = {
  component: React.FC;
  path: string;
  exact: boolean;
};

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...props
}) => {
  const userLoginState = useSelector((store: RootStore) => store.userLogin);
  const { user } = userLoginState;
  const isAuth = !!user;

  return (
    <Route
      {...props}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
