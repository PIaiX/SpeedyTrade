import React, {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {Link, useNavigate} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {setUser} from '../../store/reducers/authSlice'
import {confirmRegistration, emailVerify} from '../../services/registration'

import {useDispatch} from 'react-redux'

const RegistrationForm = () => {
    const {
        register,
        formState: {errors, isValid, isValidating},
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        resetField,
        reset,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [timeoutForButton, setTimeoutForButton] = useState(false)
    const onSubmitRegistration = (data) => {
        confirmRegistration(data).then((res) => {
            dispatch(setUser(res))
            localStorage.setItem('token', res?.token)
            navigate('/account/profile')
        })
    }

    const onSubmitConfirmEmail = (email) => {
        emailVerify(email)
            .then(() => {
                setTimeoutForButton(true)
                setTimeout(() => setTimeoutForButton(false), 5000)
            })
            .catch((error) => {
                error?.response?.data?.errors?.errors?.forEach((i) => {
                    i?.message?.includes('Значение уже занято') &&
                        setError('email', {type: 'custom', message: 'Значение уже занято!'})
                })
            })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmitRegistration)}>
            <Row className="g-3 g-sm-4 align-items-center">
                <Col md={4}>
                    <h6 className="mb-0">Имя:</h6>
                </Col>
                <Col md={8}>
                    <div className="validator">
                        <input
                            type="text"
                            className={`${errors?.firstName ? 'validate-input' : ''}`}
                            placeholder="Имя"
                            {...register('firstName', {
                                required: 'Введите имя',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                            })}
                        />
                        <span className="validate-error">{errors?.firstName?.message}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Фамилия:</h6>
                </Col>
                <Col md={8}>
                    <div className="validator">
                        <input
                            type="text"
                            placeholder="Фамилия"
                            className={`${errors?.lastName ? 'validate-input' : ''}`}
                            {...register('lastName', {
                                required: 'Введите фамилию',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                            })}
                        />
                        <span className="validate-error">{errors?.lastName?.message}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Ник:</h6>
                </Col>
                <Col md={8}>
                    <div className="validator">
                        <input
                            type="text"
                            placeholder="Ник"
                            className={`${errors?.nickname ? 'validate-input' : ''}`}
                            {...register('nickname', {
                                required: 'Введите ник',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                            })}
                        />
                        <span className="validate-error">{errors?.nickname?.message}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Email:</h6>
                </Col>
                <Col md={8}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`${errors?.email ? 'validate-input' : ''}`}
                            {...register('email', {
                                required: 'Введите Email',
                                onChange: () => clearErrors('email'),
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Введен некорректный email',
                                },
                            })}
                        />
                        <button
                            type="button"
                            className={`btn-4 ws-no px-3 flex-1 ${timeoutForButton ? 'active' : ''}`}
                            disabled={timeoutForButton}
                            onClick={() => {
                                if (getValues('email')) {
                                    onSubmitConfirmEmail(getValues('email'))
                                } else {
                                    setError('email', {type: 'custom', message: 'Введите Email'})
                                }
                            }}
                        >
                            {errors?.email?.message
                                ? errors?.email?.message
                                : timeoutForButton
                                ? 'Проверьте почту'
                                : 'Выслать код'}
                        </button>
                    </div>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Код с почты:</h6>
                </Col>
                <Col md={8}>
                    <div className="validator">
                        <input
                            type="text"
                            placeholder="Код"
                            className={`w-100 ${errors?.verifyCode ? 'validate-input' : ''}`}
                            {...register('verifyCode', {required: 'Введите код с почты!'})}
                        />
                        <span className="validate-error">{errors?.verifyCode?.message}</span>
                    </div>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Пароль:</h6>
                </Col>
                <Col md={8}>
                    <InputPassword
                        className={errors?.password ? 'validator' : ''}
                        forInputClassName={errors?.password ? 'validate-input' : ''}
                        errorMessage={errors?.password?.message}
                        register={register('password', {
                            required: 'Введите пароль',
                            minLength: {
                                value: 8,
                                message: 'Минимум 8 символов',
                            },
                            maxLength: {
                                value: 15,
                                message: 'Максимум 15 символов',
                            },
                            pattern: {
                                value: /(.*[0-9].*[A-Z])|(.*[A-Z].*[0-9])/gm,
                                message: 'Нет заглавная буквы или цифры',
                            },
                        })}
                    />
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Подтверждение пароля:</h6>
                </Col>
                <Col md={8}>
                    <InputPassword
                        className={errors?.passwordConfirm ? 'validator' : ''}
                        forInputClassName={errors?.passwordConfirm ? 'validate-input' : ''}
                        errorMessage={errors?.passwordConfirm?.message}
                        register={register('passwordConfirm', {
                            required: 'Введите пароль',
                            validate: (value) => getValues('password') === value || 'Пароли не совпадают',
                        })}
                    />
                </Col>
            </Row>
            <button type="submit" className="btn-5 fs-13 mt-4 mx-auto">
                Зарегистрироваться
            </button>
            <p className="text-center achromat-3 fs-08 mt-3">
                Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия
                <br /> <Link to="/">пользовательского соглашения</Link>
            </p>
            <h6 className="mt-4 mt-sm-5 text-center">
                У Вас уже аккаунт?
                <Link to="/login" className="color-1">
                    {' '}
                    Войти
                </Link>
            </h6>
        </Form>
    )
}

export default RegistrationForm
