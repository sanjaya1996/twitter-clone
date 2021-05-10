import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../../store/actions/user/userActions';

import './login.scss';
import { RootStore } from '../../store/store';
import Meta from '../../components/meta/Meta';

type OnChangeInputEventType = React.ChangeEvent<HTMLInputElement>;

const LoginPage: React.FC<RouteComponentProps> = ({
  location,
  history,
}: RouteComponentProps) => {
  const [logUserName, setLogUserName] = useState('');
  const [logPassword, setLogPassword] = useState('');

  const userAuthState = useSelector((state: RootStore) => state.userAuth);
  const { error, user } = userAuthState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [dispatch, user, history]);

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      userActions.authenticateUser(
        { email: logUserName, password: logPassword },
        'login'
      )
    );
  };

  return (
    <>
      <Meta title='Login | TweetHouse' />
      <div className='loginPageLayout'>
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
      </div>
    </>
  );
};

export default LoginPage;
