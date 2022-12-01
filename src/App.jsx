import React, {useEffect} from 'react'
import AppRouter from './routes/AppRouter'
import fingerprint from '@fingerprintjs/fingerprintjs'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.min.css'
import {useDispatch, useSelector} from 'react-redux'
import {initTheme} from './store/reducers/themeSlice'
import {refreshAuth} from './store/actions/auth'
import {setLoadingRefresh} from './store/reducers/authSlice'

const App = () => {
    const isLoadingRefresh = useSelector((state) => state?.auth?.isLoadingRefresh)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initTheme())

        fingerprint
            .load()
            .then((fp) => fp.get())
            .then((result) => {
                localStorage.setItem('fingerprint', result.visitorId)
            })
    }, [])

    useEffect(() => {
        // initial auth check
        if (localStorage.getItem('token')) {
            dispatch(refreshAuth())
        } else dispatch(setLoadingRefresh(false))
    }, [])

    return !isLoadingRefresh ? <AppRouter /> : null
}
export default App
