import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {resetNotification} from '../../store/reducers/notificationSlice'
import {getImageURL} from '../../helpers/image'
import {Link} from 'react-router-dom'

const ActionNotification = ({delay}) => {
    const notification = useSelector((state) => state?.notification)
    const showClassName = `${notification?.isShow ? 'show' : ''}`
    const dispatch = useDispatch()

    useEffect(() => {
        if (notification?.isShow) {
            const timeoutId = setTimeout(() => {
                dispatch(resetNotification())
            }, delay)

            return () => clearTimeout(timeoutId)
        }
    }, [notification])

    return (
        <Link
            to={`/account/messages/chat/${notification?.conversation}`}
            className={`action-notification ${showClassName}`}
            onClick={() => dispatch(resetNotification())}
        >
            <img src={getImageURL(notification?.avatar)} alt="avatar" />
            <span className="user">{notification?.user}</span>
            <span className="text">
                {notification?.message.length > 20
                    ? notification?.message.substring(0, 20) + '...'
                    : notification?.message}
            </span>
        </Link>
    )
}

export default ActionNotification
