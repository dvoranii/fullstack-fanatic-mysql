import { apiCall } from "../utils/apiUtils";
import { Notification } from "../types/Notifications";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const endpoint = "/api/notifications";
  const { data } = await apiCall<Notification[]>(endpoint, {
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
