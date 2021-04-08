// Packages
import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import pages from './pages';

import { RootStore } from '../store/store';
import { useSelector } from 'react-redux';
import React from 'react';

const Routes: React.FC = () => {
  const userLoginState = useSelector((store: RootStore) => store.userLogin);
  const { user } = userLoginState;
  const isAuth = !!user;

  return (
    <Router>
      <Switch>
        {pages.map((page, index) => (
          <Route
            key={index}
            exact={page.exact}
            path={page.path}
            render={(props) => {
              const isPermitted = !page.protect || isAuth;
              if (isPermitted) {
                if (page.layout) {
                  return (
                    <page.layout history={props.history}>
                      <page.component {...props} />
                    </page.layout>
                  );
                } else {
                  return <page.component {...props} />;
                }
              } else {
                return (
                  <Redirect
                    to={{ pathname: '/login', state: { from: props.location } }}
                  />
                );
              }
            }}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default Routes;
