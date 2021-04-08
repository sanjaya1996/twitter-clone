import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../../store/actions/user/userActions';

import './index.scss';
import { RootStore } from '../../store/store';

type OnChangeInputEventType = React.ChangeEvent<HTMLInputElement>;

const LoginPage = ({ location, history }: RouteComponentProps) => {
  const [logUserName, setLogUserName] = useState('');
  const [logPassword, setLogPassword] = useState('');

  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { error, user } = userLoginState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [dispatch, user, history]);

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      userActions.loginUser({ email: logUserName, password: logPassword })
    );
  };

  return (
    <div className='loginContainer'>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        {error && <p>{error}</p>}
        <input
          type='text'
          name='logUsername'
          placeholder='Username or email'
          required
          onChange={(e: OnChangeInputEventType) =>
            setLogUserName(e.target.value)
          }
        />
        <input
          type='password'
          name='logPassword'
          placeholder='Password'
          required
          onChange={(e: OnChangeInputEventType) =>
            setLogPassword(e.target.value)
          }
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
