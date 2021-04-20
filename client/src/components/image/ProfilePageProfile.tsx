import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../../store/actions/user/userActionTypes';
import { RootStore } from '../../store/store';
import ImageUploadModal from '../modals/ImageUploadModal';

import './profileImage.scss';

type ProfileImageProps = { uri: string; profileUser: UserType };

const ProfilePageProfile: React.FC<ProfileImageProps> = ({
  uri,
  profileUser,
}) => {
  const [showModal, setShowModal] = useState(false);

  const loggedInUserState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { user } = loggedInUserState;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='userImageContainer'>
      <img src={`${uri}`} alt='Profile Pic' />
      {profileUser._id === user?._id && (
        <>
          <button className='profilePictureButton' onClick={handleShowModal}>
            <i className='fas fa-camera'></i>
          </button>
          {showModal && (
            <ImageUploadModal
              showModal={showModal}
              closeModal={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePageProfile;
