import React from 'react';

import User from './User';
import { UserType } from '../../store/actions/user/userActionTypes';

import './userList.scss';

interface userListProps {
  users: UserType[];
  showBtns?: boolean;
  onSelectUser?: (user: UserType) => void;
}
const UserList: React.FC<userListProps> = ({
  users,
  showBtns,
  onSelectUser,
}) => {
  const selectUserHandler = (user: UserType) => {
    if (onSelectUser) onSelectUser(user);
    else return;
  };
  return (
    <div className='resultsContainer'>
      {users.length === 0 ? (
        <p>No results found</p>
      ) : (
        users.map((user) => (
          <User
            key={user._id}
            user={user}
            showFollowBtn={showBtns}
            onSelectUser={selectUserHandler}
          />
        ))
      )}
    </div>
  );
};

export default UserList;
