import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationList from '../../components/notification/NotificationList';
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

  return (
    <NotificationList
      loading={loading}
      error={error}
      notifications={notifications}
    />
  );
};

export default NotificationPage;
