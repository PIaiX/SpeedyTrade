import axios from "axios";
import { apiRoutes, BASE_API_URL } from "../config/api";

const apiBody = {
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const $api = axios.create(apiBody);
const $authApi = axios.create(apiBody);

$api.interceptors.request.use((config) => {
  config.headers["User-Fingerprint"] = localStorage.getItem("fingerprint");
  return config;
});

$authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  config.headers["User-Fingerprint"] = localStorage.getItem("fingerprint");
  return config;
});

$authApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 400 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await $api.get(apiRoutes.AUTH_REFRESH);
        localStorage.setItem("token", response?.data?.body?.token);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

const axiosBaseQuery = async (url) => {
  try {
    const result = await $api(url);
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export default $api;
export { $authApi, axiosBaseQuery };
