import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationInterface } from '../../store/actions/notification/notificationActionTypes';
import { RootStore } from '../../store/store';
import ResultListItem from '../list/resultListItem/ResultListItem';
import { getNotificationText, getNotificationUrl } from './helper';

import * as notificationActions from '../../store/actions/notification/notificationActions';

interface NotificationProps {
  notification: NotificationInterface;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { _id: notificationId, userFrom, opened } = notification;

  const notificationText = getNotificationText(notification);
  const linkTo = getNotificationUrl(notification);
  const className = opened ? '' : 'active';

  const history = useHistory();
  const dispatch = useDispatch();

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!opened) {
      e.preventDefault();

      const callBack = () => {
        history.push(linkTo);
      };

      dispatch(
        notificationActions.markNotificationsAsOpened(notificationId, callBack)
      );
    } else {
      return;
    }
  };

  return (
    <ResultListItem
      linkTo={linkTo}
      imageUrls={[userFrom.profilePic]}
      listText={notificationText}
      containerClassName={className}
      onItemClick={clickHandler}
    />
  );
};

export default Notification;
