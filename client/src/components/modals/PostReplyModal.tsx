import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import ProfileImage from '../image/ProfileImage';

import './modal.scss';

const PostReplyModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [replyText, setReplyText] = useState('');

  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>
        <i className='far fa-comment'></i>
      </button>
      <Modal show={show} onHide={handleClose} className='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
