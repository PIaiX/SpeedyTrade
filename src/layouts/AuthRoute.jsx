import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AuthRoute = ({children}) => {
    const auth = useSelector((state) => state?.auth)
    if (!auth.isLoadingRefresh) return auth.isAuth ? children : <Navigate to="/" />
}

export default AuthRoute
