import React from 'react'
import {
    useRoutes,
    useLocation,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'
import Home from '../pages/Home'
import Account from '../pages/account/Account'
import UserPage from '../pages/UserPage'
import Game from '../pages/Game'
import Lot from '../pages/Lot'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import ResetPassword from '../pages/ResetPassword'
import Layout from '../components/Layout'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="account/*" element={<Account />} />
            <Route path="user" element={<UserPage />} />
            <Route path="game/:slug" element={<Game />} />
            <Route path="game/lot" element={<Lot />}>
                <Route path="lot" element={<Lot />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="reset-password" element={<ResetPassword />} />
        </Route>
    )
)

export default function AppRouter() {
    return <RouterProvider router={router} />
}
