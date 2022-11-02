import React from 'react'
import { useRoutes, useLocation } from "react-router-dom"
import { useLayoutEffect } from "react"
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Account from '../pages/account/Account'
import UserPage from '../pages/UserPage'

export const routeList = [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {index: true, element: <Home />},
        {path: 'account/*', element: <Account/>},
        {path: 'user', element: <UserPage/>},
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