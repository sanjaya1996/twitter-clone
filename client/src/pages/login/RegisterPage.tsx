// Libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Components & files
import * as userActions from '../../store/actions/user/userActions';
// Types
import { RootStore } from '../../store/store';
// Styles
import './index.scss';

type OnChangeInputEventType = React.ChangeEvent<HTMLInputElement>;

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const dispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.user);

  console.log(userState);

  const registerHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      dispatch(
        userActions.registerUser({
          firstName,
          lastName,
          userName,
          email,
          password,
        })
      );
    } else {
      alert('Passwords do not match. Please try again!');
    }
  };

  return (
    <div className='loginContainer'>
      <h1>Register</h1>
      <form onSubmit={registerHandler}>
        <input
          type='text'
          name='firstName'
          placeholder='First name'
          value={firstName}
          required
          onChange={(e: OnChangeInputEventType) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Last name'
          value={lastName}
          required
          onChange={(e: OnChangeInputEventType) => setLastName(e.target.value)}
        />
        <input
          type='text'
          name='userName'
          placeholder='Username'
          value={userName}
          required
          onChange={(e: OnChangeInputEventType) => setUserName(e.target.value)}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          required
          onChange={(e: OnChangeInputEventType) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          onChange={(e: OnChangeInputEventType) => setPassword(e.target.value)}
        />
        <input
          type='password'
          name='passwordConf'
          placeholder='Confirm password'
          required
          onChange={(e: OnChangeInputEventType) =>
            setConfirmedPassword(e.target.value)
          }
        />

        <input type='submit' value='Register' />
      </form>
      <p>
        Alrady have an account ? <Link to='/login'>Login here.</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
