import React from 'react'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/actions/auth'

const Exit = () => {
    const dispatch = useDispatch()

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Выйти из личного кабинета?</h4>
            </div>
            <div className="d-flex align-items-center mt-4 mt-xl-5">
                <button type="button" className="btn-5" onClick={() => dispatch(logout())}>
                    Выйти
                </button>
                <Link to="/" className="btn-1 ms-2 ms-sm-4">
                    Вернуться на Главную
                </Link>
            </div>
        </div>
    )
}

export default Exit
