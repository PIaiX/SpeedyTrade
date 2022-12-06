import React, {useEffect} from 'react'
import AppRouter from './routes/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.min.css'
import {useDispatch, useSelector} from 'react-redux'
import {initTheme} from './store/reducers/themeSlice'
import {refreshAuth} from './store/actions/auth'
import {setLoadingRefresh} from './store/reducers/authSlice'
import {setDefaultLocale} from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerprintJS.load()

const App = () => {
    setDefaultLocale(ru)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initTheme())
        ;(async () => {
            // Get the visitor identifier when you need it.
            const fp = await fpPromise
            const result = await fp.get()

            localStorage.setItem('fingerprint', result.visitorId)
        })()

        if (localStorage.getItem('token')) {
            dispatch(refreshAuth())
        } else dispatch(setLoadingRefresh(false))
    }, [])

    return <AppRouter />
}
export default App
