import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import ProfileImage from '../image/ProfileImage';

import * as postActions from '../../store/actions/post/postActions';

import './modal.scss';
import Post from '../post/Post';
import ModalLayout from './ModalLayout';

interface PostReplyProps {
  postId: string;
}

const PostReplyModal: React.FC<PostReplyProps> = ({ postId }) => {
  const [show, setShow] = useState(false);
  const [replyText, setReplyText] = useState('');

  const dispatch = useDispatch();

  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  const posts = useSelector((state: RootStore) => state.postList.posts);
  const post = posts.find((p) => p._id === postId);

  const postCreateState = useSelector((state: RootStore) => state.postCreate);
  const {
    success,
    loading: loadingCreate,
    error: errorCreate,
  } = postCreateState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  const openModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleShow();
  };

  const submitReplyHandler = () => {
    dispatch(
      postActions.createPost({
        content: replyText,
        replyTo: postId,
      })
    );
  };

  return (
    <>
      <button onClick={openModalHandler}>
        <i className='far fa-comment'></i>
      </button>

      <ModalLayout
        show={show}
        title='Reply'
        actionBtnText='Reply'
        cancelBtnText='Cancel'
        loadingSave={loadingCreate}
        error={errorCreate}
        submitHandler={submitReplyHandler}
        handleClose={handleClose}
      >
        {post ? <Post post={post} userId={user!._id} /> : <p>Post not found</p>}
        <div className='postFormContainer'>
          <ProfileImage uri={user!.profilePic} />
          <div className='textAreaContainer'>
            <textarea
              id='postTextarea'
              placeholder="What's happening?"
              value={replyText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReplyText(e.target.value)
              }
            />
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default PostReplyModal;
