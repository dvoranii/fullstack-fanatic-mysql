import { useContext, useCallback, useMemo, memo } from "react";
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
  const { isReadNotificationUIUpdate } = useContext(UserContext) || {};

  const isRead = useMemo(
    () => isReadNotificationUIUpdate?.[notification.id] ?? notification.is_read,
    [notification.id, notification.is_read, isReadNotificationUIUpdate]
  );

  const notificationMessage = useMemo(() => {
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
  }, [notification.type, notification.sender_name]);

  const notificationLink = useMemo(() => {
    const { content_id, content_type, comment_id, type } = notification;

    switch (type) {
      case "like":
      case "reply":
        if (content_type === "tutorial") {
          return `/tutorial/${content_id}/comments/${comment_id}`;
        } else if (content_type === "blog") {
          return `/blog/${content_id}/comments/${comment_id}`;
        }
        return null;

      case "follow":
        return "/my-account/followers";

      case "message":
        return "/my-account/inbox";

      default:
        return null;
    }
  }, [notification]);

  const handleClick = useCallback(() => {
    markAsRead(notification.id);
  }, [notification.id, markAsRead]);

  // Memoize formatted time
  const formattedTime = useMemo(
    () => formatTimeAgo(notification.created_at),
    [notification.created_at]
  );

  return (
    <>
      <NotificationItemWrapper isRead={isRead} onClick={handleClick}>
        <ProfilePicture
          src={notification.sender_profile_picture}
          alt="User Profile Picture"
          width="40px"
          border="1px solid black"
        />
        <NotificationMessage>{notificationMessage}</NotificationMessage>
        <NotificationLinkWrapper>
          {notificationLink && (
            <Link to={notificationLink}>
              {notification.type === "like" || notification.type === "reply" ? (
                <>View{" "}Comment</>
              ) : notification.type === "follow" ? (
                <>View{" "}Followers</>
              ) : (
                <>Visit{" "}Inbox</>
              )}
            </Link>
          )}
        </NotificationLinkWrapper>
      </NotificationItemWrapper>
      <NotificationTimeWrapper>
        <time dateTime={notification.created_at}>{formattedTime}</time>
      </NotificationTimeWrapper>
      {!isLast && <hr />}
    </>
  );
};

export default memo(NotificationItem, (prevProps, nextProps) => {
  return (
    prevProps.notification.id === nextProps.notification.id &&
    prevProps.notification.is_read === nextProps.notification.is_read &&
    prevProps.isLast === nextProps.isLast
  );
});
