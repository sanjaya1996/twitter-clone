import React from 'react';

import './profileImage.scss';

type ProfileImageProps = { uri: string };

const ProfileImage: React.FC<ProfileImageProps> = ({ uri }) => {
  return (
    <div className='userImageContainer'>
      <img src={`${uri}`} alt='Profile Pic' />
    </div>
  );
};

export default ProfileImage;
