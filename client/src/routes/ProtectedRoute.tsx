import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  component: React.FC;
  path: string;
  exact: boolean;
};

const ProtectedRoute: React.FC<Props> = ({
  isAuth,
  component: Component,
  ...props
}) => {
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
