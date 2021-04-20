import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './modal.scss';
import ModalLayout from './ModalLayout';

interface ImageUploadProps {
  showModal: boolean;
  closeModal: () => void;
}

const ImageUploadModal: React.FC<ImageUploadProps> = ({
  showModal,
  closeModal,
}) => {
  const [show, setShow] = useState(showModal || false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    closeModal();
  };

  const imageUploadHandler = () => {
    console.log('Uploaded');
    // dispatch(postActions.deletePost(postId));
    handleClose();
  };

  return (
    <>
      <ModalLayout
        show={show}
        title='Upload a new profile picture'
        actionBtnText='Save'
        cancelBtnText='Cancel'
        loadingSave={false}
        submitHandler={imageUploadHandler}
        handleClose={handleClose}
      >
        Upload Your Profile Picture Here.
      </ModalLayout>
    </>
  );
};

export default ImageUploadModal;
