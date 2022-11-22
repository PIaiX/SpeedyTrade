import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {Link, useNavigate} from 'react-router-dom'
import {setUser} from '../../store/reducers/authSlice'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {loginInProfile} from '../../services/login'

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({mode: 'onSubmit', reValidateMode: 'onChange'})

    const onSubmitLogin = (data) => {
        loginInProfile(data)
            .then((res) => {
                localStorage.setItem('token', res?.token)
                dispatch(setUser(res))
                navigate('/account/profile')
            })
            .catch()
    }

    return (
        <form onSubmit={handleSubmit(onSubmitLogin)}>
            <Row className="g-3 g-sm-4 align-items-center">
                <Col md={4}>
                    <h6 className="mb-0">Email:</h6>
                </Col>
                <Col md={8}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {required: 'Обязательное поле'})}
                    />
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Пароль:</h6>
                </Col>
                <Col md={8}>
                    <InputPassword register={register('password', {required: 'Обязательное поле'})} />
                </Col>
            </Row>
            <div className="mt-4 d-flex align-items-center justify-content-between">
                <label>
                    <input type="checkbox" />
                    <span>Запомнить меня</span>
                </label>
                <Link to="/reset-password" className="achromat-1 fw-5">
                    Забыли пароль?
                </Link>
            </div>
            <button type="submit" className="btn-5 fs-13 px-5 mt-4 mx-auto">
                Войти
            </button>
            <h6 className="mt-4 mt-sm-5 text-center">
                У Вас еще нет аккаунта?{' '}
                <Link to="/registration" className="color-1">
                    Зарегистрироваться
                </Link>
            </h6>
        </form>
    )
}

export default LoginForm
