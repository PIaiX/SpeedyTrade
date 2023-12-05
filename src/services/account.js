import { $authApi } from ".";
import { apiRoutes } from "../config/api";

const editAccount = async (payloads) => {
  const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads);
  return response?.data;
};

const editAvatar = async (data) => {
  const response = await $authApi.postForm(apiRoutes.ACCOUNT_EDIT_AVATAR, data);
  return response?.data;
};

const getOrders = async (page, limit) => {
  const response = await $authApi.get(apiRoutes.ORDERS_GET, {
    params: { page, limit },
  });
  return response?.data;
};

const getSessions = async (page, limit) => {
  const response = await $authApi.get(apiRoutes.SESSIONS_GET, {
    params: { page, limit },
  });
  return response?.data;
};

const getOrder = async (orderId) => {
  if (!orderId) {
    return false;
  }
  const response = await $authApi.get(apiRoutes.ORDER_GET, {
    params: { orderId },
  });
  return response?.data;
};

const getNotifications = async (page, limit) => {
  const response = await $authApi.get(apiRoutes.NOTIFICATIONS_GET, {
    params: { page, limit },
  });
  if (response) {
    return response.data;
  }
};

const deleteNotification = async (notificationId) => {
  const response = await $authApi.delete(
    apiRoutes.ACCOUNT_NOTIFICATION_DELETE,
    { data: { notificationId } }
  );
  if (response) {
    return response.data;
  }
};

const deleteAccount = async (data) => {
  const response = await $authApi.post(apiRoutes.ACCOUNT_DELETE, data);
  if (response) {
    return response.data;
  }
};

const savePushToken = async (token) => {
  const response = await $authApi.post(apiRoutes.SAVE_PUSHTOKEN, {
    token,
  });
  return response?.data;
};

export {
  deleteAccount,
  deleteNotification,
  editAvatar,
  editAccount,
  getNotifications,
  getOrder,
  getOrders,
  getSessions,
  savePushToken,
};
