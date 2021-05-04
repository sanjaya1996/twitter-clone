import { NotificationInterface } from '../../store/actions/notification/notificationActionTypes';

export const getNotificationText = (notification: NotificationInterface) => {
  const { userFrom, notificationType } = notification;

  if (!userFrom.firstName || !userFrom.lastName) {
    alert('User from data not populated');
    return '';
  }

  const userFromName = `${userFrom.firstName} ${userFrom.lastName}`;

  let text = '';

  switch (notificationType) {
    case 'retweet':
      text = `${userFromName} retweeted one of your posts`;
      break;
    case 'postLike':
      text = `${userFromName} liked one of your posts`;
      break;
    case 'reply':
      text = `${userFromName} replied to one of your posts`;
      break;
    case 'follow':
      text = `${userFromName} followed you`;
  }

  return text;
};

export const getNotificationUrl = (
  notification: NotificationInterface
): string => {
  let url = '#';

  const { notificationType, entityId } = notification;

  switch (notificationType) {
    case 'retweet':
    case 'postLike':
    case 'reply':
      url = `/post/${entityId}`;
      break;
    case 'follow':
      url = `/profile/${entityId}`;
  }

  return url;
};
