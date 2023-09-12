import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ActionAlert from "../components/utils/ActionAlert";
import ActionNotification from "../components/utils/ActionNotification";

export default function AppLayout() {
  return (
    <>
      {/* <ScrollRestoration /> */}
      {/* Добавлял баг со скроллом к чату после обновления страницы */}
      <ActionAlert delay={3000} />
      <ActionNotification delay={5000} />

      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
