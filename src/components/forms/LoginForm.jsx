import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import ValidateWrapper from '../UI/ValidateWrapper'
import {login} from '../../store/actions/auth'
import LoaderButton from '../UI/LoaderButton'

const LoginForm = () => {
    const dispatch = useDispatch()
    const isLoadingLogin = useSelector((state) => state?.auth?.isLoadingLogin)

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
    } = useForm({mode: 'onChange', reValidateMode: 'onChange'})

    const onSubmitLogin = (data) => dispatch(login(data))

    return (
        <form onSubmit={handleSubmit(onSubmitLogin)}>
            <Row className="g-3 g-sm-4 align-items-center">
                <Col md={4}>
                    <h6 className="mb-0">Email:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.email}>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', {
                                required: 'Заполните поле',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Введен некорректный email',
                                },
                            })}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Пароль:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.password}>
                        <InputPassword
                            register={register('password', {
                                required: 'Заполните поле',
                            })}
                        />
                    </ValidateWrapper>
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
            <LoaderButton
                type="submit"
                className="btn-5 fs-13 px-5 mt-4 mx-auto"
                loaderProps={{size: 22}}
                disabled={!isValid}
            >
                {!isLoadingLogin ? 'Войти' : null}
            </LoaderButton>
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
