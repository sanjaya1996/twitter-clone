import React from 'react';
import ProfileImage from '../../components/image/ProfileImage';
import TitleBar from '../../components/titleBar/TitleBar';
import { UserType } from '../../store/actions/user/userActionTypes';

interface ProfileProps {
  userInfo: UserType;
}

const ProfilePage: React.FC<ProfileProps> = ({ userInfo }) => {
  return (
    <>
      <TitleBar title={userInfo.firstName + ' ' + userInfo.lastName} />
      <div className='profileHeaderContainer'>
        <div className='coverPhotoContainer'>
          <ProfileImage uri={userInfo.profilePic} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
