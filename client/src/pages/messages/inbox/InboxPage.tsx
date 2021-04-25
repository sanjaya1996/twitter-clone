import React from 'react';
import TitleBar from '../../../components/titleBar/TitleBar';

const InboxPage: React.FC = () => {
  return (
    <>
      <TitleBar
        title='Inbox'
        headerBtnIcon='far fa-plus-square'
        link='/messages/new'
      />
    </>
  );
};

export default InboxPage;
