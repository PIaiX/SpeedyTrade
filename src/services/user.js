import { $authApi } from "./index";
import { apiRoutes } from "../config/api";

const userUpdateProfile = async (payload = {}, userId) => {
  try {
    const response = await $authApi.patch(
      `${apiRoutes.USER_ACTIONS}/${userId}`,
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data?.body;
  } catch (error) {
    throw error;
  }
};

const userUpdatePassword = async (payload = {}, userId) => {
  try {
    const response = await $authApi.patch(
      `${apiRoutes.USER_UPDATE_PASSWORD}/${userId}`,
      payload
    );
    if (response && response.status === 200) return response;
  } catch (error) {
    throw error;
  }
};

export { userUpdateProfile, userUpdatePassword };
