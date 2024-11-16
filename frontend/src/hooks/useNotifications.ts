import { useState, useEffect } from "react";
import { fetchNotifications } from "../services/notificationsService";
import { Notification } from "../types/Notifications";

export const useNotifications = (type?: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [type]);

  return { notifications, setNotifications, loading };
};
