import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationList from '../../components/notification/NotificationList';
import TitleBar from '../../components/titleBar/TitleBar';
import * as notificationActions from '../../store/actions/notification/notificationActions';
import { RootStore } from '../../store/store';

const NotificationPage = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStore) => state);
  const notificationListState = state.notificationList;
  const { loading, error, notifications } = notificationListState;

  useEffect(() => {
    dispatch(notificationActions.listNotifications());
  }, [dispatch]);

  const markNotificationHandler = () => {
    dispatch(notificationActions.markNotificationsAsOpened());
  };

  return (
    <>
      <TitleBar
        title='Notifications'
        headerBtnIcon='fas fa-check-double'
        onBtnClick={markNotificationHandler}
      />
      <NotificationList
        loading={loading}
        error={error}
        notifications={notifications}
      />
    </>
  );
};

export default NotificationPage;
