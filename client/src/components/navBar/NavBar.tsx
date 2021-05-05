import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as userActions from '../../store/actions/user/userActions';
import { RootStore } from '../../store/store';

import './navBar.scss';

const NavBar = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const notificationUnreadListState = state.notificationUnreadList;
  const { totalCount: notificationCount } = notificationUnreadListState;
  const chatUnreadListState = state.chatUnreadList;
  const { totalCount: messageCount } = chatUnreadListState;

  const logoutHandler = () => {
    dispatch(userActions.logoutUser());
  };

  return (
    <div className='nav'>
      <Link to='/' className='nav-link blue'>
        <i className='fas fa-dove'></i>
      </Link>
      <Link to='/' className='nav-link'>
        <i className='fas fa-home'></i>
      </Link>
      <Link to='/search/posts' className='nav-link'>
        <i className='fas fa-search'></i>
      </Link>
      <Link to='/notifications' className='nav-link'>
        <i className='fas fa-bell'></i>
        {notificationCount > 0 && (
          <span id='notificationsBadge'>{notificationCount}</span>
        )}
      </Link>
      <Link to='/messages' className='nav-link'>
        <i className='fas fa-envelope'></i>
        {messageCount > 0 && <span id='messagesBadge'>{messageCount}</span>}
      </Link>
      <Link to='/profile' className='nav-link'>
        <i className='fas fa-user'></i>
      </Link>
      <Link to='/login' className='nav-link' onClick={logoutHandler}>
        <i className='fas fa-sign-out-alt'></i>
      </Link>
    </div>
  );
};

export default NavBar;
