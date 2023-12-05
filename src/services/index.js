import axios from "axios";
import { BASE_URL } from "../config/api";
import store from "../store";
import { refreshAuth } from "./auth";
import { ClientJS } from "clientjs";

const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const client = new ClientJS();
const browser = client.getBrowserData();
const language = client.getLanguage();

const DEVICE = JSON.stringify({
  brand: browser.browser.name ?? "",
  osName: browser.os.name ?? "",
  osVersion: browser.os.version ?? "",
  language: language ?? "ru-RU",
});

$api.interceptors.request.use(
  async (config) => {
    // config.headers["Content-Type"] = "application/json";
    const state = store.getState();
    config.headers.device = DEVICE;
    config.headers.ip = state?.settings?.ip ?? "0.0.0.0";
    return config;
  },
  (error) => Promise.reject(error)
);

const $authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

$authApi.interceptors.request.use(
  async (config) => {
    // config.headers["Content-Type"] = "application/json";
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    const state = store.getState();
    config.headers.device = DEVICE;
    config.headers.ip = state?.settings?.ip ?? "0.0.0.0";
    return config;
  },
  (error) => Promise.reject(error)
);

$authApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      if (
        error?.response?.data?.message?.type == "REFRESH_TOKEN_EXPIRED" ||
        error?.response?.data?.message?.type == "ACCESS_TOKEN_EXPIRED"
      ) {
        localStorage.removeItem("token");
      }
      return store
        .dispatch(refreshAuth())
        .then(() => $authApi(originalRequest));
    }
    return Promise.reject(error);
  }
);

export { $api, $authApi };
