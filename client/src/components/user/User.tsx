import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserType } from '../../store/actions/user/userActionTypes';
import { RootStore } from '../../store/store';

import * as userActions from '../../store/actions/user/userActions';

interface UserProps {
  user: UserType;
  showFollowBtn?: boolean;
  onSelectUser?: (user: UserType) => void;
}
const User: React.FC<UserProps> = ({ user, showFollowBtn, onSelectUser }) => {
  const dispatch = useDispatch();
  const fullName = user.firstName + ' ' + user.lastName;
  const loggedInUserState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { user: loggedInUser } = loggedInUserState;

  // Conditional Follow/Following Button
  const showBtn = showFollowBtn && loggedInUser?._id !== user._id;
  const isFollowing =
    loggedInUser?.following && loggedInUser.following.includes(user._id);
  const followBtnText = isFollowing ? 'Following' : 'Follow';
  const followBtnClass = isFollowing
    ? 'followButton following'
    : 'followButton';

  const followUserHandler = () => {
    dispatch(userActions.followUser(user._id));
  };

  const userSelectHandler = () => {
    if (onSelectUser) onSelectUser(user);
    else return;
  };

  return (
    <div className='user' onClick={userSelectHandler}>
      <div className='userImageContainer'>
        <img src={user.profilePic} alt='Profile Pic' />
      </div>
      <div className='userDetailsContainer'>
        <div className='header'>
          <Link to={`/profile/${user.userName}`} className='displayName'>
            {fullName}
          </Link>
          <span className='username'> @{user.userName}</span>
        </div>
      </div>
      {showBtn && (
        <div className='followButtonContainer'>
          <button onClick={followUserHandler} className={followBtnClass}>
            {followBtnText}
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
