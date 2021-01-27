import axios from "axios";

const notificationUrl =
  "https://notificationserverclass.herokuapp.com/api/v2/students/notifications";

export const fetchNotifications = (token) =>
  axios.get(`${notificationUrl}`, {
    headers: { "x-auth-token": token },
  });

export const updateNotifications = (id, notificationId, token) =>
  axios.put(
    `${notificationUrl}/${id}`,
    { notification_id: notificationId },
    {
      headers: { "x-auth-token": token },
    }
  );
