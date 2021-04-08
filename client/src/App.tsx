// Packages
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// Components
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';

import './App.scss';

axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
