import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationBell from "../../../assets/images/notification-bell.png";
import {
  NotificationCounter,
  NotificationContentWrapper,
} from "./Notifications.styled";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import Dropdown from "../../Dropdown/Dropdown";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../services/notificationsService";
import { Notification } from "../../../types/Notifications";
import NotificationItem from "./NotificationItem/NotificationItem";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useClickOutside from "../../../hooks/useClickOutside";

const Notifications: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mounted, setMounted] = useState(false);

  const handleDropdownToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isDropdownVisible) {
      setNotifications([]);
      setPage(1);
      setHasMore(true);

      await loadMoreNotifications();
    }

    setDropdownVisible(!isDropdownVisible);
  };

  useClickOutside(containerRef, () => setDropdownVisible(false));

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

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...fetchedNotifications.filter(
          (newNotification) =>
            !prevNotifications.some(
              (notification) => notification.id === newNotification.id
            )
        ),
      ]);

      setHasMore(hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    if (mounted) return;

    const fetchUserNotifications = async () => {
      try {
        const { notifications: fetchedNotifications } =
          await fetchNotifications(1);
        setNotifications(fetchedNotifications);

        const unreadNotifications = fetchedNotifications.filter(
          (notification: Notification) => !notification.is_read
        );
        setUnreadCount(unreadNotifications.length);

        setHasMore(fetchedNotifications.length > 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setHasMore(false);
      }
    };

    fetchUserNotifications();
    setMounted(true);
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
                loader={<LoadingSpinner width="30px" color="#3498db" />}
                scrollableTarget="scrollableDiv"
              >
                {notifications.length === 0 ? (
                  <p>No notifications currently</p>
                ) : (
                  notifications.map((notification, index) => (
                    <NotificationItem
                      key={`${notification.id}-${index}`}
                      notification={notification}
                      markAsRead={markAsRead}
                      isLast={index === notifications.length - 1}
                    />
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

export default Notifications;
