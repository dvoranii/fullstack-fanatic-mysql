import React from "react";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import { Notification } from "../../../../types/Notifications";
import {
  NotificationItemWrapper,
  NotificationMessage,
  NotificationLinkWrapper,
  NotificationTimeWrapper,
} from "./NotificationItem.styled";
import { formatTimeAgo } from "../../../../utils/timeUtils";
import { Link } from "react-router-dom";

interface NotificationItemProps {
  notification: Notification;
  markAsRead: (id: number) => void;
  isLast: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  markAsRead,
  isLast,
}) => {
  const renderNotificationMessage = () => {
    switch (notification.type) {
      case "like":
        return `${notification.sender_name} liked your comment`;
      case "reply":
        return `${notification.sender_name} replied to your comment`;
      case "follow":
        return `${notification.sender_name} followed you`;
      case "message":
        return `You have a new message from ${notification.sender_name}`;
      default:
        return "Unknown notification type";
    }
  };

  const renderNotificationLink = () => {
    switch (notification.type) {
      case "like":
      case "reply":
        return <Link to="#">View&nbsp;Comment</Link>;
      case "follow":
        return <Link to="/my-account/followers">View&nbsp;Followers</Link>;
      case "message":
        return <Link to="/my-account/inbox">Visit&nbsp;Inbox</Link>;
      default:
        return null;
    }
  };

  return (
    <>
      <NotificationItemWrapper
        isUnread={!notification.is_read}
        onClick={() => markAsRead(notification.id)}
      >
        <ProfilePicture
          src={notification.sender_profile_picture}
          alt={"User Profile Picture"}
          width={"40px"}
          border={"1px solid black"}
        />
        <NotificationMessage>{renderNotificationMessage()}</NotificationMessage>
        <NotificationLinkWrapper>
          {renderNotificationLink()}
        </NotificationLinkWrapper>
      </NotificationItemWrapper>
      <NotificationTimeWrapper>
        <time dateTime={notification.created_at}>
          {formatTimeAgo(notification.created_at)}
        </time>
      </NotificationTimeWrapper>
      {!isLast && <hr />}
    </>
  );
};

export default NotificationItem;
