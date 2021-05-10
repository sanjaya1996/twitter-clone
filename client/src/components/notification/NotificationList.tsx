import React from 'react';
import { NotificationInterface } from '../../store/actions/notification/notificationActionTypes';
import FallBackMessage from '../fallbackMessage/FallbackMessage';
import LoadingSpinner from '../loadingSpinner/LoadSpinner';
import Notification from './Notification';

interface NotificationsProps {
  notifications: NotificationInterface[];
  loading?: boolean;
  error?: string;
}

const NotificationList: React.FC<NotificationsProps> = ({
  notifications,
  loading,
  error,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <p>{error}</p>;
  } else if (notifications.length === 0) {
    return <FallBackMessage />;
  } else {
    return (
      <>
        {notifications.map((notification) => (
          <Notification key={notification._id} notification={notification} />
        ))}
      </>
    );
  }
};

export default NotificationList;
