import { apiRoutes } from "../config/api";
import { $api } from "./index";

const getSales = async (data) => {
  const response = await $api.get(apiRoutes.SALES, {
    params: data,
  });

  return response?.data;
};

const getSale = async (id) => {
  const response = await $api.get(apiRoutes.SALE, {
    params: {
      id,
    },
  });

  return response?.data;
};

export { getSale, getSales };
