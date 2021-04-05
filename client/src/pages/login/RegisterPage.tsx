import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const RegisterPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const registerHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      console.log('Form submitted');
    } else {
      alert('Passwords do not match. Please try again!');
    }
  };

  return (
    <div className='loginContainer'>
      <h1>Register</h1>
      <form onSubmit={registerHandler}>
        <input type='text' name='firstName' placeholder='First name' required />
        <input type='text' name='lastName' placeholder='Last name' required />
        <input type='text' name='userName' placeholder='Username' required />
        <input type='email' name='email' placeholder='Email' required />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <input
          type='password'
          name='passwordConf'
          placeholder='Confirm password'
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
