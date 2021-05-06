import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../components/chat/Chat';
import NavBar from '../components/navBar/NavBar';
import Notification from '../components/notification/Notification';
import TitleBar from '../components/titleBar/TitleBar';
import { MessageInterface } from '../store/actions/message/messageActionTypes';
import {
  NotificationInterface,
  NOTIFICATION_POPUP_REMOVE,
} from '../store/actions/notification/notificationActionTypes';
import { RootStore } from '../store/store';
import './mainLayout.scss';

interface MainLayoutProps {
  children: React.FC;
  pageTitle?: string;
}

const POPUP_SHOW_TIME = 5000;

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);

  const notificationPopupListState = state.notificationPopupList;
  const { notifications } = notificationPopupListState;

  useEffect(() => {
    if (notifications.length > 0) {
      setTimeout(() => {
        dispatch({ type: NOTIFICATION_POPUP_REMOVE });
      }, POPUP_SHOW_TIME);
    }
  }, [notifications, dispatch]);

  return (
    <div className='wrapper'>
      <div className='row'>
        <nav className='col-2'>
          <NavBar />
        </nav>
        <div className='mainSectionContainer col-10 col-md-8'>
          {pageTitle && <TitleBar title={pageTitle} />}
          {children}
        </div>

        <div id='notificationPopupList'>
          {notifications.length > 0 &&
            notifications.map((n: any) => {
              let data;
              if ((n as NotificationInterface).notificationType) {
                data = n;
                return <Notification key={data._id} notification={data} />;
              } else if ((n as MessageInterface).content) {
                data = n;
                return (
                  <Chat key={data._id} chat={data.chat} latestMessage={data} />
                );
              } else {
                return null;
              }
            })}
        </div>

        <div className='d-none d-md-block col-md-2'></div>
      </div>
    </div>
  );
};

export default MainLayout;
