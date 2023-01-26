import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {resetNotification} from '../../store/reducers/notificationSlice'
import {getImageURL} from '../../helpers/image'

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
        <div className={`action-notification ${showClassName}`}>
            <img src={getImageURL(notification?.avatar)} alt="avatar" />
            <span className="user">{notification?.user}</span>
            <span className="text">{notification?.message}</span>
        </div>
    )
}

export default ActionNotification
