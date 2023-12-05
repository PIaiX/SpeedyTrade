import { createSlice } from "@reduxjs/toolkit";
import { refreshAuth, login, logout, checkAuth } from "../../services/auth";
import { NotificationManager } from "react-notifications";

const initialState = {
  isLoadingLogin: false,
  loginError: null,
  isAuth: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setLoadingLogin: (state, action) => {
      state.isLoadingLogin = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoadingLogin = true;
      state.loginError = null;
    },
    [login.fulfilled]: (state, action) => {
      if (action?.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      }
      state.isLoadingLogin = false;
      state.isAuth = true;
      state.user = action?.payload?.user;
      NotificationManager.success("Вы вошли в аккаунт");
    },
    [login.rejected]: (state, action) => {
      NotificationManager.error(
        action?.payload?.response?.data?.error ?? "Неизвестная ошибка при входе"
      );
      state.isLoadingLogin = false;
    },

    [logout.fulfilled]: (state) => {
      NotificationManager.success("Вы вышли из аккаунта");
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {};
    },
    [logout.rejected]: (state, action) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {};
    },

    [checkAuth.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action?.payload?.user;
    },
    [checkAuth.rejected]: (state) => {
      state.isAuth = false;
      state.user = initialState.user;
    },

    [refreshAuth.fulfilled]: (state, action) => {
      if (action?.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      }
      state.isAuth = true;
      state.user = action?.payload?.user;
    },
    [refreshAuth.rejected]: (state, action) => {
      NotificationManager.success("Вы вышли из аккаунта");
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {};
    },
  },
});

export const { setLoadingLogin, setUser, setAuth, setLoginError } =
  authSlice.actions;

export default authSlice.reducer;
