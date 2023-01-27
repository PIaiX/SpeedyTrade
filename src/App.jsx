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
import {setNotification, setUnreadCount} from './store/reducers/notificationSlice'

import {BASE_URL_SOCKET} from './config/api'
import {io} from 'socket.io-client'

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

    const onUnloadHandler = () => {
        const isOtherPC = localStorage.getItem('isOtherPC')
        if (isOtherPC === 'true') {
            dispatch(logout())
            localStorage.removeItem('isOtherPC')
        }
    }

    // Global notification listener
    useEffect(() => {
        let socketNotification = io(`${BASE_URL_SOCKET}`, {
            auth: {token: `Bearer ${localStorage.getItem('token')}`},
        })

        if (user.id && socketNotification) {
            console.log('Start listen to notification')
            socketNotification.on('message:create', (newMessage) => {
                if (newMessage.userId !== user.id) {
                    dispatch(setNotification(newMessage))
                }
            })
            socketNotification.on('conversation:unreadCount', (count) => {
                dispatch(setUnreadCount(count))
            })
        }

        return () => {
            console.log('Stop listen to notification')
            socketNotification?.off('message:create')
            socketNotification?.off('conversation:unreadCount')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingRefresh])

    return isLoadingRefresh ? <></> : <AppRouter />
}
export default App
