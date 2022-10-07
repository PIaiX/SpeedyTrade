import React from 'react';
import { useRoutes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Layout from '../components/Layout';
import Home from '../pages/Home';

export const routeList = [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {index: true, element: <Home />},
        // {path: 'registration', element: <Registration /> , breadcrumb: 'Регистрация'},
        // {path: 'login', element: <Login /> , breadcrumb: 'Вход в личный кабинет'},
        // {path: 'reset-password', element: <ResetPassword /> , breadcrumb: 'Восстановление пароля'},
        // {path: 'personal-account/*', element: <PersonalAccount /> , breadcrumb: 'Личный кабинет'},
      ],
    },
  ];

export default function AppRouter() {
    const Wrapper = ({ children }) => {
      const {pathname} = useLocation();
      useLayoutEffect(() => document.documentElement.scrollTo(0, 0), [pathname])
      return children
    }
  
    const element = useRoutes(routeList)
  
    return (
      <Wrapper>
          {element}
      </Wrapper>
    );
  }