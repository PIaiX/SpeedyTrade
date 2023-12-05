import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./assets/fonts/font.css";
import "./assets/style.css";
import Loader from "./components/utils/Loader";
import AppRouter from "./routes/AppRouter";
import { checkAuth, logout } from "./services/auth";
import { setAuth, setUser } from "./store/reducers/authSlice";
import { setSettings } from "./store/reducers/settingsSlice";
import axios from "axios";
import socket from "./config/socket";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  useLayoutEffect(() => {
    (async () =>
      await axios
        .get("https://ip.yooapp.ru")
        .then(
          ({ data }) => data?.ip && dispatch(setSettings({ ip: data.ip }))
        ))();

    if (localStorage.getItem("token")) {
      checkAuth()
        .then((data) => {
          if (data && data.status === 0) {
            dispatch(logout());
          } else {
            data && dispatch(setUser(data));
            data && dispatch(setAuth(true));
            socket.io.opts.query = { userId: data.id }
            socket.connect();
          }
        })
        .catch(() => dispatch(logout()))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader full />;
  }

  return <AppRouter />;
}

export default App;
