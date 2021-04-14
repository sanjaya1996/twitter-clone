import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import ProfileImage from '../image/ProfileImage';

import * as postActions from '../../store/actions/post/postActions';

import './modal.scss';
import Post from '../post/Post';

interface PostReplyProps {
  postId: string;
}

const PostReplyModal: React.FC<PostReplyProps> = ({ postId }) => {
  const [show, setShow] = useState(false);
  const [replyText, setReplyText] = useState('');

  const dispatch = useDispatch();

  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  const postDetailsState = useSelector((state: RootStore) => state.postDetails);
  const { post, loading, error } = postDetailsState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const replyButtonClickHandler = () => {
    handleShow();
    dispatch(postActions.getPostDetails(postId));
  };

  return (
    <>
      <button onClick={replyButtonClickHandler}>
        <i className='far fa-comment'></i>
      </button>
      <Modal show={show} onHide={handleClose} className='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading Post...</p>
          ) : error ? (
            <p>{error}</p>
          ) : post ? (
            <Post post={post} userId={user!._id} />
          ) : (
            <p>Post not found</p>
          )}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleClose}
            disabled={replyText.trim().length < 1}
          >
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostReplyModal;
