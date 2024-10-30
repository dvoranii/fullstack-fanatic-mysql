import { apiCall } from "../utils/apiUtils";
import { Notification } from "../types/Notifications";

export const fetchNotifications = async (
  page: number
): Promise<{ notifications: Notification[]; hasMore: boolean }> => {
  const endpoint = `/api/notifications?page=${page}`;
  const { data } = await apiCall<{
    notifications: Notification[];
    hasMore: boolean;
  }>(endpoint, {
    method: "GET",
  });

  return data;
};

export const markNotificationAsRead = async (notificationId: number) => {
  const endpoint = `/api/notifications/${notificationId}/read`;
  const { data } = await apiCall(endpoint, {
    method: "PATCH",
  });

  return data;
};
