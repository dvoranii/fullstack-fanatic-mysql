import { useState, useEffect, useContext } from "react";
import {
  fetchNotifications,
  getUnreadNotificationsCount,
  markNotificationAsRead,
} from "../services/notificationsService";
import { Notification } from "../types/Notifications";
import { UserContext } from "../context/UserContext";
import { UserContextType } from "../types/User/UserContextType";
import { useCsrfToken } from "./useCsrfToken";

export const useNotifications = (type?: string) => {
  const csrfToken = useCsrfToken();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { setUnreadNotificationCount, setIsReadNotificationUIUpdate } =
    useContext(UserContext) as UserContextType;

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const { notifications: fetchedNotifications } =
          await fetchNotifications(1);
        const filteredNotifications = type
          ? fetchedNotifications.filter(
              (notification) => notification.type === type
            )
          : fetchedNotifications;
        setNotifications(filteredNotifications);

        const count = await getUnreadNotificationsCount();
        setUnreadNotificationCount(count);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [type, setUnreadNotificationCount]);


  const markNotificationAsReadById = async (notificationId: number) => {
    try {
  
      await markNotificationAsRead(notificationId, csrfToken);

      setIsReadNotificationUIUpdate((prev) => ({
        ...prev,
        [notificationId]: true,
      }));
     
      setUnreadNotificationCount((prevCount) => Math.max(prevCount - 1, 0));

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error(
        `Failed to mark notification as read: ${notificationId}`,
        error
      );
    }
  };

  return {
    notifications,
    setNotifications,
    loading,
    markNotificationAsReadById,
  };
};
