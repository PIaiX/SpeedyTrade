import { apiRoutes } from "../config/api";
import $api from "./index";

export const loginInProfile = async (payloads) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_LOGIN, payloads);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};
