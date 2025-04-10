import {
  useState,
  useRef,
  useContext,
  useCallback,
  useMemo,
  memo,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationContentWrapper } from "./Notifications.styled";
import { NavIconWrapper, NavIconImg } from "../../NavBar/NavBar.styled";
import Dropdown from "../../Dropdown/Dropdown";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../../services/notificationsService";
import NotificationItem from "./NotificationItem/NotificationItem";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useClickOutside from "../../../hooks/useClickOutside";
import NotificationBadge from "../../NotificationBadge/NotificationBadge";
import { UserContext } from "../../../context/UserContext";
import { UserContextType } from "../../../types/User/UserContextType";
import { useNotifications } from "../../../hooks/useNotifications";
import { useCsrfToken } from "../../../hooks/useCsrfToken";

const Notifications: React.FC = () => {
  const csrfToken = useCsrfToken();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { notifications, setNotifications, loading} = useNotifications();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { unreadNotificationCount, setUnreadNotificationCount } = useContext(
    UserContext
  ) as UserContextType;

  const handleDropdownToggle = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();

    setDropdownVisible((prev) => {
      if (!prev) {
        setPage(1);
        setHasMore(true);
        setNotifications([]);

        setTimeout(() => {
          loadMoreNotifications(1);
        }, 0)
      }

      return !prev;
    })

  }, []);

  const markAsRead = useCallback(
    async (notificationId: number) => {
      setUnreadNotificationCount((prevCount) => Math.max(prevCount - 1, 0));

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );

      try {
        await markNotificationAsRead(notificationId, csrfToken);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);

        setUnreadNotificationCount((prevCount) => prevCount + 1);
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, is_read: false }
              : notification
          )
        );
      }
    },
    [setUnreadNotificationCount, setNotifications, csrfToken]
  );

  const loadMoreNotifications = useCallback(async (pageToLoad = page) => {
    try {
      setIsLoadingMore(true);
      const { notifications: fetchedNotifications, hasMore: newHasMore } =
        await fetchNotifications(pageToLoad);

      if (pageToLoad === 1) {
        setNotifications(fetchedNotifications);
      } else {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...fetchedNotifications.filter(
            (newNotification) =>
              !prevNotifications.some(
                (notification) => notification.id === newNotification.id
              )
          ),
        ]);
      }

      setHasMore(newHasMore);

      if (fetchedNotifications.length > 0 && newHasMore) {
        setPage(pageToLoad + 1);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, setNotifications]);

  const notificationList = useMemo(
    () =>
      notifications.length === 0 ? (
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
      ),
    [notifications, markAsRead]
  );

  useClickOutside(containerRef, () => setDropdownVisible(false));

  return (
    <div ref={containerRef}>
      <NavIconWrapper>
        <NavIconImg
          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/nav/notification-bell.png"
          onClick={handleDropdownToggle}
          alt="Notifications"
          title="Notifications"
          width="50"
          height="50"
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
              {loading ? (
                <LoadingSpinner width="30px" color="#3498db" />
              ) : (
                <InfiniteScroll
                  dataLength={notifications.length}
                  next={loadMoreNotifications}
                  hasMore={hasMore}
                  loader={isLoadingMore ? <LoadingSpinner width="30px" color="#3498db" /> : null}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    notifications.length > 0 && !hasMore && (
                      <p style={{ textAlign: "center", padding: "10px" }}>
                        No more notifications
                      </p>
                    )
                  }
                >
                  {notificationList}
                </InfiniteScroll>
              )}
            </NotificationContentWrapper>
          </Dropdown>
        )}
      </NavIconWrapper>
    </div>
  );
};

export default memo(Notifications);
