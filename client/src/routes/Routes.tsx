// Packages
import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import pages from './pages';

import { RootStore } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import * as userActions from '../store/actions/user/userActions';

const Routes: React.FC = () => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((store: RootStore) => store.userAuth);
  const { user } = userAuthState;
  const isAuth = !!user;

  useEffect(() => {
    dispatch(userActions.getLoggedInUserInfo());
  }, [dispatch]);

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
                    <page.layout
                      history={props.history}
                      pageTitle={page.pageTitle || null}
                    >
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
