import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cropper from 'cropperjs';
import 'cropperjs/src/css/cropper.scss';
import ModalLayout from './ModalLayout';

import * as uploadActions from '../../store/actions/upload/uploadActions';

import './modal.scss';
import 'react-image-crop/lib/ReactCrop.scss';

let cropper: Cropper;

interface ImageUploadProps {
  showModal: boolean;
  aspectRatio?: number;
  dispatchAction?: (formData: FormData) => void;
  formDataName?: string;
  modalTitle?: string;
  closeModal: () => void;
}

const ImageUploadModal: React.FC<ImageUploadProps> = ({
  showModal,
  aspectRatio = 1 / 1,
  dispatchAction = uploadActions.uploadProfilePic,
  formDataName = 'profileImage',
  modalTitle = 'Upload a new profile picture',
  closeModal,
}) => {
  const [show, setShow] = useState(showModal || false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const imageElementRef = React.createRef<HTMLImageElement>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageUrl) {
      if (cropper !== undefined) {
        cropper.destroy();
      }

      cropper = new Cropper(imageElementRef.current!, {
        aspectRatio: aspectRatio,
        background: false,
      });
    }
  }, [imageUrl, imageElementRef, aspectRatio]);

  const handleClose = () => {
    setShow(false);
    closeModal();
  };

  const imageUploadHandler = () => {
    const canvas = cropper.getCroppedCanvas();
    if (!canvas) {
      return alert('Could not upload image. Make suer it is an image file.');
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append(formDataName, blob, 'image.jpg');
        dispatch(dispatchAction(formData));
      } else {
        alert('Could not Upload Image');
      }
    });

    handleClose();
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <>
      <ModalLayout
        show={show}
        title={modalTitle}
        actionBtnText='Save'
        cancelBtnText='Cancel'
        loadingSave={false}
        submitHandler={imageUploadHandler}
        handleClose={handleClose}
      >
        <input type='file' name='filePhoto' onChange={fileChangeHandler} />
        {imageUrl && (
          <div className='imagePreviewContainer'>
            <img
              src={imageUrl}
              alt='Preview'
              id='imagePreview'
              ref={imageElementRef}
            />
          </div>
        )}
      </ModalLayout>
    </>
  );
};

export default ImageUploadModal;
