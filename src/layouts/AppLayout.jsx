import React from 'react'
import {Outlet, ScrollRestoration} from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ActionAlert from '../components/utils/ActionAlert'

export default function AppLayout() {
    return (
        <>
            <ScrollRestoration />
            <ActionAlert delay={3000} />

            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
