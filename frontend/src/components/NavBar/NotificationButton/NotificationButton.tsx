import React, { useState, useEffect, useRef } from "react";
import NotificationBell from "../../../assets/images/notification-bell.png";
import {
  NavIconImg,
  NavIconWrapper,
  NotificationCounter,
  NotificationContentWrapper,
} from "./NotificationButton.styled";
import Dropdown from "../Dropdown/Dropdown";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../services/notificationsService";
import { Notification } from "../../../types/Notifications";

const NotificationButton: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

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
        const fetchedNotifications = await fetchNotifications();
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
          <NotificationCounter>{unreadCount}</NotificationCounter>
        )}
        <Dropdown isVisible={isDropdownVisible} alignRight>
          <NotificationContentWrapper>
            {notifications.length === 0 ? (
              <p>No notifications currently</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                >
                  {notification.type === "like" && (
                    <p>Someone liked your comment</p>
                  )}

                  {notification.type === "reply" && (
                    <p>Someone replied to your comment</p>
                  )}
                  {notification.type === "follow" && (
                    <p>Someone followed you</p>
                  )}
                  {notification.type === "message" && (
                    <p>You have a new message</p>
                  )}
                  {!notification.is_read && <strong>New</strong>}
                  <hr />
                </div>
              ))
            )}
          </NotificationContentWrapper>
        </Dropdown>
      </NavIconWrapper>
    </div>
  );
};

export default NotificationButton;
