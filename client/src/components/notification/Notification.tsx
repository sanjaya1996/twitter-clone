import React from 'react';
import { NotificationInterface } from '../../store/actions/notification/notificationActionTypes';
import ResultListItem from '../list/resultListItem/ResultListItem';
import { getNotificationText, getNotificationUrl } from './helper';

interface NotificationProps {
  notification: NotificationInterface;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { userFrom, opened } = notification;

  const notificationText = getNotificationText(notification);
  const linkTo = getNotificationUrl(notification);
  const className = opened ? '' : 'active';

  return (
    <ResultListItem
      linkTo={linkTo}
      imageUrls={[userFrom.profilePic]}
      listText={notificationText}
      containerClassName={className}
    />
  );
};

export default Notification;
