import { apiRoutes } from "../config/api";
import $api from "./index";

const authRegistration = async (payload = {}) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_REGISTRATION, payload);

    if (response && response.status === 200) {
      return response?.data?.body;
    }
  } catch (error) {
    throw error;
  }
};

const authRegistrationEmailVerify = async (payload = {}) => {
  try {
    const response = await $api.post(
      apiRoutes.AUTH_REGISTRATION_EMAIL_VERIFY,
      payload
    );

    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export { authRegistration, authRegistrationEmailVerify };
