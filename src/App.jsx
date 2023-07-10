import React, { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initTheme } from './store/reducers/themeSlice'
import { logout, refreshAuth } from './store/actions/auth'
import { setLoadingRefresh, setUser } from './store/reducers/authSlice'
import { setDefaultLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import { initFingerprint } from './store/actions/fingerprint'
import Loader from './components/UI/Loader'
import { setSocketConnection } from '../src/services/sockets/socketInstance'
import {setNotification, setSaleCount, setUnreadCount} from './store/reducers/notificationSlice'

import { BASE_URL_SOCKET } from './config/api'
import { io } from 'socket.io-client'
import { addNotification, removeMessageNotification } from './store/reducers/notificationMenuSlice'
import swal from 'sweetalert'

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

    const onUnloadHandler = (event) => {
        event.preventDefault()
        const isOtherPC = localStorage.getItem('isOtherPC')
        if (isOtherPC === 'true') {
            dispatch(logout())
            localStorage.removeItem('isOtherPC')
            localStorage.removeItem('token')
        }
    }

    // Global notification listener
    useEffect(() => {
        let socketNotification = io(`${BASE_URL_SOCKET}`, {
            auth: { token: `Bearer ${localStorage.getItem('token')}` },
        })

        if (user.id && socketNotification) {
            console.log('Start listen to notification')
            socketNotification.on('message:create', (newMessage) => {
                if (newMessage.userId !== user.id) {
                    dispatch(setNotification(newMessage))
                    dispatch(addNotification({
                        text: 'Новое сообщение от ' + newMessage.userName,
                        link: '/account/messages/chat/' + newMessage.conversationId,
                        id: newMessage.id,
                        conversationId: newMessage.conversationId
                    }))
                }
            })
            socketNotification.on('conversation:unreadCount', (count) => {
                dispatch(setUnreadCount(count))
            })

            socketNotification.on('lots:unseenBoughts', ({unseenBoughts}) => {
                dispatch(setSaleCount(unseenBoughts))
            })

            socketNotification?.on('ticket:answerWasCreated', (ticket) => {
                ticket &&
                    dispatch(addNotification({
                        text: 'Ответ от техподдержки ',
                        link: '/account/help/ticket/' + ticket.ticketId,
                        id: ticket.con
                    }))
                swal('У Вас новое уведомление')
            })
            // socketNotification?.on('lots:wasBought', (sold) => {
            //     sold &&
            //         dispatch(addNotification({
            //             text: `Ваш лот №${sold.lotId} приобретен`,
            //             link: '/account/sales',
            //             id: sold.id
            //         }))
            //     swal('У Вас новое уведомление')
            // })
            socketNotification?.on('message:viewed', (message) => {
                if (message.userId == user.id) {
                    dispatch(removeMessageNotification(message.conversationId))
                }
            })
        }

        return () => {
            console.log('Stop listen to notification')
            socketNotification?.off('message:create')
            socketNotification?.off('conversation:unreadCount')
            socketNotification?.off('ticket:answerWasCreated')
            socketNotification?.off('lots:wasBought')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingRefresh, user])

    return isLoadingRefresh ? <></> : <AppRouter />
}
export default App
