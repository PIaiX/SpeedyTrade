import { $api, $authApi } from ".";
import { apiRoutes } from "../config/api";

const getUser = async (id) => {
  const response = await $api.get(apiRoutes.USER, {
    params: { id },
  });
  return response?.data;
};

const deleteSession = async (data) => {
  const response = await $authApi.delete(apiRoutes.USER_DELETE_SESSION, {
    params: data,
  });
  return response?.data;
};

export { getUser, deleteSession };
