import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../../store/actions/user/userActionTypes';
import { RootStore } from '../../store/store';
import ImageUploadModal from '../modals/ImageUploadModal';

import * as uploadActions from '../../store/actions/upload/uploadActions';

import './profileImage.scss';

type CoverPhotoProps = { uri: string; profileUser: UserType };

const CoverPhoto: React.FC<CoverPhotoProps> = ({ uri, profileUser }) => {
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
    <div className='coverPhotoContainer'>
      {profileUser.coverPhoto && (
        <img src={profileUser.coverPhoto} alt="User's CoverPhoto" />
      )}
      {profileUser._id === user?._id && (
        <>
          <button className='coverPhotoButton' onClick={handleShowModal}>
            <i className='fas fa-camera'></i>
          </button>
          {showModal && (
            <ImageUploadModal
              showModal={showModal}
              aspectRatio={16 / 9}
              dispatchAction={uploadActions.uploadCoverPhoto}
              formDataName='coverPhoto'
              modalTitle='Upload a new cover photo'
              closeModal={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CoverPhoto;
