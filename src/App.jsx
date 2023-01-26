import React, {useEffect} from 'react'
import AppRouter from './routes/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.min.css'
import {useDispatch, useSelector} from 'react-redux'
import {initTheme} from './store/reducers/themeSlice'
import {logout, refreshAuth} from './store/actions/auth'
import {setLoadingRefresh} from './store/reducers/authSlice'
import {setDefaultLocale} from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import {initFingerprint} from './store/actions/fingerprint'
import Loader from './components/UI/Loader'
import {setSocketConnection} from '../src/services/sockets/socketInstance'
import useSocketConnect from '../src/hooks/socketConnect'

const App = () => {
    setDefaultLocale(ru)
    const dispatch = useDispatch()
    const fingerprint = useSelector((state) => state?.fingerprint?.value)
    const isLoadingRefresh = useSelector((state) => state?.auth?.isLoadingRefresh)
    const user = useSelector((state) => state?.auth?.user)

    useEffect(() => {
        dispatch(initTheme())
    }, [])

    useEffect(() => {
        user.id && setSocketConnection()
    }, [user])

    useEffect(() => {
        window.addEventListener('beforeunload', onUnloadHandler)
    }, [])

    useEffect(() => {
        // initial auth check
        if (fingerprint) {
            localStorage.setItem('fingerprint', fingerprint)

            if (localStorage.getItem('token')) {
                dispatch(refreshAuth())
            } else dispatch(setLoadingRefresh(false))
        } else dispatch(initFingerprint())
    }, [fingerprint])

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         dispatch(refreshAuth())
    //     } else {
    //         dispatch(refreshAuth())
    //     }
    // }, [])

    const onUnloadHandler = () => {
        const isOtherPC = localStorage.getItem('isOtherPC')
        if (isOtherPC === 'true') {
            dispatch(logout())
            localStorage.removeItem('isOtherPC')
        }
    }

    return isLoadingRefresh ? <></> : <AppRouter />
}
export default App
