import { apiCall } from "../utils/apiUtils";
import { Notification } from "../types/Notifications";

export const fetchNotifications = async (
  page: number
): Promise<{ notifications: Notification[]; hasMore: boolean }> => {
  const endpoint = `/notifications?page=${page}`;
  const { data } = await apiCall<{
    notifications: Notification[];
    hasMore: boolean;
  }>(endpoint, {
    method: "GET",
  });

  return data;
};

export const markNotificationAsRead = async (
  notificationId: number,
  csrfToken: string
) => {
  const endpoint = `/notifications/${notificationId}/read`;
  const { data } = await apiCall(endpoint, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  const endpoint = `/notifications/unread/count`;
  const { data } = await apiCall<{ unreadCount: number }>(endpoint, {
    method: "GET",
  });
  return data.unreadCount;
};
