import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import AccountLayout from '../pages/account/AccountLayout'
import AccountMenu from '../pages/account/AccountMenu'
import PurchaseHistory from '../pages/account/PurchaseHistory'
import MyAds from '../pages/account/MyAds'
import PostAd from '../pages/account/PostAd'
import Finance from '../pages/account/Finance'
import SalesHistory from '../pages/account/SalesHistory'
import UserProfile from '../pages/account/UserProfile'
import Messages from '../pages/account/Messages'
import MessageWindow from '../pages/account/MessageWindow'
import Help from '../pages/account/Help'
import Reviews from '../pages/account/Reviews'
import Exit from '../pages/account/Exit'
import Ticket from '../pages/account/Ticket'

const AccountRouter = ({isMobile}) => {
    return (
        <Routes>
            <Route path="/" element={<AccountLayout isMobile={isMobile} />}>
                {isMobile ? (
                    <Route index element={<AccountMenu />} />
                ) : (
                    <Route index element={<Navigate to="profile" replace={true} />} />
                )}
                <Route path="profile" element={<UserProfile />} />
                <Route path="ads" element={<MyAds />} />
                <Route path="ads/new" element={<PostAd />} />
                <Route path="purchase-history" element={<PurchaseHistory />} />
                <Route path="sales" element={<SalesHistory />} />
                <Route path="finance" element={<Finance />} />
                <Route path="messages" element={<Messages />} />
                <Route path="messages/chat" element={<MessageWindow />} />
                <Route path="help" element={<Help />} />
                <Route path="help/ticket" element={<Ticket />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="exit" element={<Exit />} />
            </Route>
        </Routes>
    )
}

export default AccountRouter
