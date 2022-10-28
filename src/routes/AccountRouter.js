import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import AccountLayout from '../pages/account/AccountLayout'
import AccountMenu from '../pages/account/AccountMenu'
import PurchaseHistory from '../pages/account/PurchaseHistory'
import MyAds from '../pages/account/MyAds'
import PostAd from '../pages/account/PostAd'
import Finance from '../pages/account/Finance'
import SalesHistory from '../pages/account/SalesHistory'
import UserProfile from '../pages/account/UserProfile'


const AccountRouter = ({isMobile}) => {
    return (
        <Routes>
            <Route path="/" element={<AccountLayout isMobile={isMobile}/>}>
                {isMobile
                    ? <Route index element={<AccountMenu />} />
                    : <Route index element={<Navigate to="profile" replace={true} />} />
                }
                <Route path="profile" element={<UserProfile/>}/>
                <Route path="ads" element={<MyAds/>}/>
                <Route path="ads/new" element={<PostAd/>}/>
                <Route path="purchase-history" element={<PurchaseHistory/>}/>
                <Route path="sales" element={<SalesHistory/>}/>
                <Route path="finance" element={<Finance />}/>
            </Route>
        </Routes>
    );
};

export default AccountRouter