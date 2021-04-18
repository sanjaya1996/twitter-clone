import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as postActions from '../../store/actions/post/postActions';

import './modal.scss';
import ModalLayout from './ModalLayout';

interface PostReplyProps {
  postId: string;
}

const PostReplyModal: React.FC<PostReplyProps> = ({ postId }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleShow();
  };

  const deleteHandler = () => {
    dispatch(postActions.deletePost(postId));
    handleClose();
  };

  return (
    <>
      <button onClick={openModalHandler}>
        <i className='fas fa-times'></i>
      </button>

      <ModalLayout
        show={show}
        title='Delete the post?'
        actionBtnText='Delete'
        cancelBtnText='Close'
        loadingSave={false}
        submitHandler={deleteHandler}
        handleClose={handleClose}
      >
        You won't be able to delete this.
      </ModalLayout>
    </>
  );
};

export default PostReplyModal;
