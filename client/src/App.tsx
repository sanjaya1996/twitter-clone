// Packages
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import HomePage from './pages/home';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';

import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
