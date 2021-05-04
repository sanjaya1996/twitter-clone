import React from 'react';
import { NotificationInterface } from '../../store/actions/notification/notificationActionTypes';
import ResultListItem from '../list/resultListItem/ResultListItem';

interface NotificationProps {
  notification: NotificationInterface;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { userFrom } = notification;

  return (
    <ResultListItem
      linkTo='#'
      imageUrls={[userFrom.profilePic]}
      listText='This is the text'
    />
  );
};

export default Notification;
