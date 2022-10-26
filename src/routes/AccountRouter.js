import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import AccountLayout from '../pages/account/AccountLayout'
import AccountMenu from '../pages/account/AccountMenu'
import History from '../pages/account/History'
import MyAds from '../pages/account/MyAds'
import SaleHistory from '../pages/account/SaleHistory'
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
                <Route path="history" element={<History/>}/>
                <Route path="sales" element={<SaleHistory/>}/>
            </Route>
        </Routes>
    );
};

export default AccountRouter