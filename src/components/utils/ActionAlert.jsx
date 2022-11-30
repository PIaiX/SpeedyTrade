import React, {useEffect} from 'react'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {CgDanger} from 'react-icons/cg'
import {useDispatch, useSelector} from 'react-redux'
import {resetAlert} from '../../store/reducers/alertSlice'

const ActionAlert = ({delay}) => {
    const alert = useSelector((state) => state?.alert)
    const variantClassName = `${alert?.variant ? 'action-alert_' + alert.variant : ''}`
    const showClassName = `${alert?.isShow ? 'show' : ''}`
    const dispatch = useDispatch()

    useEffect(() => {
        if (alert?.isShow) {
            const timeoutId = setTimeout(() => dispatch(resetAlert()), delay)

            return () => clearTimeout(timeoutId)
        }
    }, [alert])

    return (
        <div className={`action-alert ${variantClassName} ${showClassName}`}>
            {alert?.variant === 'success' && <AiOutlineCheckCircle className="action-alert__icon" />}
            {alert?.variant === 'danger' && <CgDanger className="action-alert__icon" />}
            <span>{alert?.message}</span>
        </div>
    )
}

export default ActionAlert
