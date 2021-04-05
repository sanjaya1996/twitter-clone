import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const LoginPage: React.FC = () => {
  return (
    <div className='loginContainer'>
      <h1>Login</h1>
      <form>
        <input
          type='text'
          name='logUsername'
          placeholder='Username or email'
          required
        />
        <input
          type='password'
          name='logPassword'
          placeholder='Password'
          required
        />
        <input type='submit' value='Login' />
      </form>
      <p>
        Need an account ? <Link to='/register'>Register here.</Link>
      </p>
    </div>
  );
};

export default LoginPage;
