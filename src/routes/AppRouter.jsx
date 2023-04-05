import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import UserPage from '../pages/UserPage'
import Game from '../pages/Game'
import Lot from '../pages/Lot'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import ResetPassword from '../pages/ResetPassword'
import AppLayout from '../layouts/AppLayout'
import AuthRoute from '../layouts/AuthRoute'
import AccountRouter from './AccountRouter'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import CookiesPolicy from '../pages/CookiesPolicy'
import Document from '../pages/Document'
import AllNews from '../pages/AllNews'
import NewsPage from '../pages/NewsPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="user/:id" element={<UserPage />} />
            <Route path="game/:slug/:regId?/:catId?" element={<Game />} />
            <Route path="lot/:id" element={<Lot />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="cookies" element={<CookiesPolicy />} />
            <Route path="document/:id" element={<Document />} />
            <Route path="news" element={<AllNews />} />
            <Route path="news/:newsId" element={<NewsPage />} />

            <Route
                path="account/*"
                element={
                    <AuthRoute>
                        <AccountRouter />
                    </AuthRoute>
                }
            />
        </Route>
    )
)

export default function AppRouter() {
    return <RouterProvider router={router} />
}
