import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../../store/actions/user/userActions';

import './login.scss';
import { RootStore } from '../../store/store';
import Meta from '../../components/meta/Meta';

const TEST_ACCOUNTS = [
  {
    userName: 'john_doe@yahoo.com',
    fullName: 'John Doe',
    password: 'testPasswordJohn',
  },
  {
    userName: 'jane_doe@yahoo.com',
    fullName: 'Jane Doe',
    password: 'testPasswordJane',
  },
];

type OnChangeInputEventType = React.ChangeEvent<HTMLInputElement>;

const LoginPage: React.FC<RouteComponentProps> = ({
  location,
  history,
}: RouteComponentProps) => {
  const [logUserName, setLogUserName] = useState('');
  const [logPassword, setLogPassword] = useState('');

  const [wantToTest, setWantToTest] = useState(false);

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

  const setTestAccountLoginDetails = (index: number) => {
    setLogUserName(TEST_ACCOUNTS[index].userName);
    setLogPassword(TEST_ACCOUNTS[index].password);
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
              value={logUserName || ''}
              required
              onChange={(e: OnChangeInputEventType) =>
                setLogUserName(e.target.value)
              }
            />
            <input
              type='password'
              name='logPassword'
              placeholder='Password'
              value={logPassword || ''}
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
          <p>
            Wanna Test ?{' '}
            <Link to='#' onClick={() => setWantToTest(!wantToTest)}>
              {wantToTest ? 'Hide' : 'Click here'}
            </Link>
          </p>
          {wantToTest && (
            <>
              Login as
              {TEST_ACCOUNTS.map((acc, index) => (
                <span key={index}>
                  <button onClick={() => setTestAccountLoginDetails(index)}>
                    {acc.fullName}
                  </button>
                  {index < TEST_ACCOUNTS.length - 1 && <span>or </span>}
                </span>
              ))}
              <p style={{ fontSize: 12 }}>
                *Important* Use separate browser for each account if you are
                testing from the same device.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
