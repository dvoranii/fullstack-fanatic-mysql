import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationBell from "../../../assets/images/notification-bell.png";
import {
  NotificationCounter,
  NotificationContentWrapper,
} from "./Notifications.styled";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import Dropdown from "../Dropdown/Dropdown";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../services/notificationsService";
import { Notification } from "../../../types/Notifications";
import NotificationItem from "./NotificationItem/NotificationItem";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Notifications: React.FC = () => {
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
