// useNotificationHandler.ts (Custom Hook)
import { useNotifications } from "../hooks/useNotifications";
import { markNotificationAsRead } from "../services/notificationsService";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserContextType } from "../types/User/UserContextType";

export const useNotificationHandler = () => {
  const { notifications, setNotifications } = useNotifications();
  const { setUnreadNotificationCount, setIsReadNotificationUIUpdate } =
    useContext(UserContext) as UserContextType;

  const markNotificationsAsRead = async (conversationId: number) => {
    const relatedNotifications = notifications.filter(
      (notification) =>
        notification.type === "message" &&
        notification.conversation_id === conversationId &&
        !notification.is_read
    );

    for (const notification of relatedNotifications) {
      try {
        // Backend call to mark the notification as read
        await markNotificationAsRead(notification.id);

        // Update the UI state to reflect the changes locally
        setIsReadNotificationUIUpdate((prev) => ({
          ...prev,
          [notification.id]: true,
        }));

        setUnreadNotificationCount((prevCount) => Math.max(prevCount - 1, 0));
      } catch (error) {
        console.error(
          `Failed to mark notification as read: ${notification.id}`,
          error
        );
      }
    }

    // Update the notifications state in the context
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.conversation_id === conversationId
          ? { ...notification, is_read: true }
          : notification
      )
    );
  };

  return { markNotificationsAsRead };
};
