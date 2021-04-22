import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as postActions from '../../store/actions/post/postActions';

import './modal.scss';
import ModalLayout from './ModalLayout';

interface PinPostProps {
  postId: string;
  isPinned: boolean;
}

const PinPostModal: React.FC<PinPostProps> = ({ postId, isPinned }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleShow();
  };

  const pinPostHandler = () => {
    dispatch(postActions.updatePost(postId, { pinned: !isPinned }));
    handleClose();
  };

  return (
    <>
      <button
        className={`pinButton ${isPinned && 'active'}`}
        onClick={openModalHandler}
      >
        <i className='fas fa-thumbtack'></i>
      </button>

      <ModalLayout
        show={show}
        title={isPinned ? 'Unpin the post?' : 'Pin this post?'}
        actionBtnText={isPinned ? 'Unpin' : 'Pin'}
        cancelBtnText='Close'
        loadingSave={false}
        submitHandler={pinPostHandler}
        handleClose={handleClose}
      >
        {isPinned
          ? 'This post will be unpinned'
          : 'This post will appear at the top of your profile. You can only pin one post'}
      </ModalLayout>
    </>
  );
};

export default PinPostModal;
