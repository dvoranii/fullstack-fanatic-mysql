import { useState, useEffect, useRef, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationBell from "../../../assets/images/notification-bell.png";
import { NotificationContentWrapper } from "./Notifications.styled";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import Dropdown from "../../Dropdown/Dropdown";
import {
  fetchNotifications,
  markNotificationAsRead,
  getUnreadNotificationsCount, // Use the unused API function here
} from "../../../services/notificationsService";
import { Notification } from "../../../types/Notifications";
import NotificationItem from "./NotificationItem/NotificationItem";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useClickOutside from "../../../hooks/useClickOutside";
import NotificationBadge from "../../NotificationBadge/NotificationBadge";
import { UserContext } from "../../../context/UserContext";
import { UserContextType } from "../../../types/User/UserContextType";

const Notifications: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { unreadNotificationCount, setUnreadNotificationCount } = useContext(
    UserContext
  ) as UserContextType;

  // Fetch unread count on component mount
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadNotificationsCount();
        setUnreadNotificationCount(count);
      } catch (error) {
        console.error("Failed to fetch unread notifications count:", error);
      }
    };

    fetchUnreadCount();
  }, []);

  // Fetch notifications when dropdown is opened
  const handleDropdownToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isDropdownVisible) {
      setPage(1);
      setHasMore(true);
      await loadMoreNotifications();
    }

    setDropdownVisible(!isDropdownVisible);
  };

  useClickOutside(containerRef, () => setDropdownVisible(false));

  const markAsRead = async (notificationId: number) => {
    setUnreadNotificationCount((prevCount) => Math.max(prevCount - 1, 0));

    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, is_read: true }
          : notification
      )
    );

    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);

      setUnreadNotificationCount((prevCount: number) => prevCount + 1);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: false }
            : notification
        )
      );
    }
  };

  // Load additional notifications for infinite scroll
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

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg
          src={NotificationBell}
          onClick={handleDropdownToggle}
          alt="Notifications"
          title="Notifications"
        />
        <NotificationBadge
          count={unreadNotificationCount}
          positionAbsolute={true}
          topOffset="5px"
          rightOffset="5px"
        />

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
