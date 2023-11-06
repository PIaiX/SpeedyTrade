import { apiRoutes } from "../config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api, $authApi } from ".";

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

const login = createAsyncThunk("auth/login", async (payloads, thunkAPI) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_LOGIN, payloads);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_LOGOUT);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const checkAuth = async () => {
  const response = await $authApi.post(apiRoutes.AUTH_CHECK);
  return response?.data;
};

const refreshAuth = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await $authApi.post(apiRoutes.AUTH_REFRESH);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authRegister = async (params) => {
  const response = await $api.post(apiRoutes.AUTH_REGISTRATION, params);
  return response?.data;
};

const authActivate = async (key) => {
  const response = await $api.post(apiRoutes.AUTH_ACTIVATE, { key });
  return response?.data;
};

const authActivateEmail = async (key) => {
  const response = await $api.post(apiRoutes.AUTH_ACTIVATE_EMAIL, { key });
  return response?.data;
};

const authEditPhone = async (data) => {
  const response = await $authApi.post(apiRoutes.AUTH_EDIT_PHONE, data);
  return response?.data;
};

const authEditPassword = async (params) => {
  const response = await $authApi.post(apiRoutes.AUTH_EDIT_PASSWORD, params);
  return response?.data;
};

const authNewKeyActivate = async (params) => {
  const response = await $authApi.post(apiRoutes.AUTH_NEW_KEY_ACTIVATE, params);
  return response?.data;
};

const authPasswordRecovery = async (params) => {
  const response = await $api.post(apiRoutes.AUTH_RECOVERY, params);
  return response?.data;
};

const authEditEmail = async (data) => {
  const response = await $authApi.post(apiRoutes.AUTH_EDIT_EMAIL, data);
  return response?.data;
};

export {
  authRegistration,
  authRegistrationEmailVerify,
  authActivate,
  authActivateEmail,
  authEditEmail,
  authNewKeyActivate,
  authEditPassword,
  authEditPhone,
  authPasswordRecovery,
  authRegister,
  checkAuth,
  login,
  logout,
  refreshAuth,
};
