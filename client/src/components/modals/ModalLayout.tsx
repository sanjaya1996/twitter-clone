import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface PostReplyProps {
  show: boolean;
  title: string;
  actionBtnText: string;
  cancelBtnText: string;
  loadingSave?: boolean;
  error?: string;
  submitHandler: () => void;
  handleClose: () => void;
}

const ModalLayout: React.FC<PostReplyProps> = ({
  show,
  title,
  actionBtnText,
  cancelBtnText,
  children,
  loadingSave,
  error,
  submitHandler,
  handleClose,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        className='modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
          {error && <p>{error}</p>}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            {cancelBtnText}
          </Button>
          <Button variant='primary' onClick={submitHandler}>
            {loadingSave ? '....' : actionBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalLayout.defaultProps = {
  actionBtnText: 'Save Changes',
  cancelBtnText: 'Close',
};

export default ModalLayout;
