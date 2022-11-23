import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import {ScrollRestoration} from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <ScrollRestoration />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
