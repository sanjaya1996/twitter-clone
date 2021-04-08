// Packages
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Components
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import * as userActions from './store/actions/user/userActions';

import { RootStore } from './store/store';

import './App.scss';

axios.defaults.withCredentials = true;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUserInfo());
  }, [dispatch]);

  const userInfoState = useSelector((state: RootStore) => state.userInfo);
  const { user, loading } = userInfoState;

  const isAuth = user ? true : false;

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Router>
      <Switch>
        <ProtectedRoute path='/' isAuth={isAuth} component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
