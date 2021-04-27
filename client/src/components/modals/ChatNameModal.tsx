import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './modal.scss';
import ModalLayout from './ModalLayout';
import { ChatInterface } from '../../store/actions/chat/chatActionTypes';

import * as chatActions from '../../store/actions/chat/chatActions';
import { RootStore } from '../../store/store';
import { getChatName } from '../../utils/chatName';

interface chatNameModalProps {
  chat: ChatInterface;
}

const ChatNameModal: React.FC<chatNameModalProps> = ({ chat }) => {
  const [show, setShow] = useState(false);
  const [chatName, setChatName] = useState(chat.chatName || '');

  const dispatch = useDispatch();

  const loggedInUserState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { user } = loggedInUserState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleShow();
  };

  const chatNameSaveHandler = () => {
    dispatch(chatActions.updateChat(chat._id, chatName));
    handleClose();
  };

  return (
    <>
      <div className='ellipsis'>
        <span id='chatName ellipsis' onClick={openModalHandler}>
          {getChatName(chat, user!._id)}
        </span>
      </div>

      <ModalLayout
        show={show}
        title='Change the chat name'
        actionBtnText='Save'
        cancelBtnText='Cancel'
        submitHandler={chatNameSaveHandler}
        handleClose={handleClose}
      >
        <input
          id='chatNameTextbox'
          type='text'
          value={chatName}
          placeholder='Enter the name for this chat'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChatName(e.target.value)
          }
        />
      </ModalLayout>
    </>
  );
};

export default ChatNameModal;
