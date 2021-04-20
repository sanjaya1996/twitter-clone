import React from 'react';

import User from './User';
import { UserType } from '../../store/actions/user/userActionTypes';

import './userList.scss';

interface userListProps {
  users: UserType[];
  showBtns?: boolean;
}
const UserList: React.FC<userListProps> = ({ users, showBtns }) => {
  return (
    <div className='resultsContainer'>
      {users.map((user) => (
        <User key={user._id} user={user} showFollowBtn={showBtns} />
      ))}
    </div>
  );
};

export default UserList;
