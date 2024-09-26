import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationBell from "../../../assets/images/notification-bell.png";
import {
  NavIconImg,
  NavIconWrapper,
  NotificationCounter,
  NotificationContentWrapper,
  NotificationItem,
  NotificationMessage,
  NotificationLinkWrapper,
} from "./NotificationButton.styled";
import Dropdown from "../Dropdown/Dropdown";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../services/notificationsService";
import { Notification } from "../../../types/Notifications";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";

const NotificationButton: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible(!isDropdownVisible);
  };

  const markAsRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const loadMoreNotifications = async () => {
    try {
      const { notifications: fetchedNotifications, hasMore } =
        await fetchNotifications(page);

      setNotifications((prev) => [...prev, ...fetchedNotifications]);

      setHasMore(hasMore);

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const { notifications: fetchedNotifications } =
          await fetchNotifications(1);
        setNotifications(fetchedNotifications);

        const unreadNotifications = fetchedNotifications.filter(
          (notification: Notification) => !notification.is_read
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchUserNotifications();
  }, []);

  const renderNotificationMessage = (notification: Notification) => {
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

  const renderNotificationLink = (notification: Notification) => {
    switch (notification.type) {
      case "like":
      case "reply":
        return <Link to="#">View&nbsp;Comment</Link>;
      case "follow":
        return <Link to="#">View&nbsp;Followers</Link>;
      case "message":
        return <Link to="/my-account/inbox">Visit&nbsp;Inbox</Link>;
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg
          src={NotificationBell}
          onClick={handleDropdownToggle}
          alt="Notifications"
          title="Notifications"
        />
        {unreadCount > 0 && (
          <NotificationCounter>
            {unreadCount > 9 ? "9+" : unreadCount}
          </NotificationCounter>
        )}

        {isDropdownVisible && (
          <Dropdown isVisible={isDropdownVisible} alignRight>
            <NotificationContentWrapper id="scrollableDiv">
              <InfiniteScroll
                dataLength={notifications.length}
                next={loadMoreNotifications}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {notifications.length === 0 ? (
                  <p>No notifications currently</p>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={`${notification.id}-${index}`}>
                      <NotificationItem
                        isUnread={!notification.is_read}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <ProfilePicture
                          src={notification.sender_profile_picture}
                          alt={"User Profile Picture"}
                          width={"40px"}
                          border={"1px solid black"}
                        />
                        <NotificationMessage>
                          {renderNotificationMessage(notification)}
                        </NotificationMessage>
                        <NotificationLinkWrapper>
                          {renderNotificationLink(notification)}
                        </NotificationLinkWrapper>
                      </NotificationItem>
                      <hr />
                    </div>
                  ))
                )}
              </InfiniteScroll>
            </NotificationContentWrapper>
          </Dropdown>
        )}
      </NavIconWrapper>
    </div>
  );
};

export default NotificationButton;

{
  /* <Dropdown isVisible={isDropdownVisible} alignRight>
<NotificationContentWrapper>
  {notifications.length === 0 ? (
    <p>No notifications currently</p>
  ) : (
    notifications.slice(0, 9).map((notification) => (
      <div>
        <NotificationItem
          isUnread={!notification.is_read}
          onClick={() => markAsRead(notification.id)}
        >
          <ProfilePicture
            src={notification.sender_profile_picture}
            alt={"User Profile Picture"}
            width={"40px"}
            border={"1px solid black"}
          />
          <NotificationMessage>
            {renderNotificationMessage(notification)}
          </NotificationMessage>
          <NotificationLinkWrapper>
            {renderNotificationLink(notification)}
          </NotificationLinkWrapper>
        </NotificationItem>
        <hr />
      </div>
    ))
  )}
</NotificationContentWrapper>
</Dropdown> */
}
