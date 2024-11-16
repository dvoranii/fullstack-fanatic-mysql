import { useContext } from "react";
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
import { UserContext } from "../../../../context/UserContext";

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
  const { isReadUIUpdate } = useContext(UserContext) || {};
  const isRead = isReadUIUpdate?.[notification.id] ?? notification.is_read;

  console.log(isRead);

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
    const { content_id, content_type, comment_id } = notification;

    switch (notification.type) {
      case "like":
      case "reply":
        if (content_type === "tutorial") {
          return (
            <Link to={`/tutorial/${content_id}/comments/${comment_id}`}>
              View&nbsp;Comment
            </Link>
          );
        } else if (content_type === "blog") {
          return (
            <Link to={`/blog/${content_id}/comments/${comment_id}`}>
              View&nbsp;Comment
            </Link>
          );
        }
        return null;

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
        isRead={isRead}
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
