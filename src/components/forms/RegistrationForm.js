import React, {useCallback, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {Link, useNavigate} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {login} from '../../store/actions/auth'
import {authRegistration, authRegistrationEmailVerify} from '../../services/auth'
import LoaderButton from '../UI/LoaderButton'

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const [isLoadingEmailVerify, setIsLoadingEmailVerify] = useState(false)

    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        watch,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const onSubmitRegistration = useCallback((data) => {
        authRegistration(data)
            .then((res) => res && console.log('res', res))
            .catch((error) => error && console.log('error', error))
    }, [])

    const onSubmitEmailVerify = useCallback((email) => {
        setIsLoadingEmailVerify(true)
        authRegistrationEmailVerify({email})
            .then((res) => res && setIsLoadingEmailVerify(false))
            .catch((error) => error && setIsLoadingEmailVerify(false))
    }, [])

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
                                required: 'Заполните поле',
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
                                required: 'Заполните поле',
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
                                required: 'Заполните поле',
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
                                required: 'Заполните поле',
                                onChange: () => clearErrors('email'),
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Введен некорректный email',
                                },
                            })}
                        />
                        <LoaderButton
                            loaderProps={{size: 20}}
                            className={`btn-4 ws-no px-3 flex-1 active`}
                            disabled={!watch('email')}
                            onClick={() => onSubmitEmailVerify(getValues('email'))}
                        >
                            {!isLoadingEmailVerify ? 'Выслать код' : null}
                        </LoaderButton>
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
                            {...register('verifyCode', {required: 'Заполните поле'})}
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
                            required: 'Заполните поле',
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
                            required: 'Заполните поле',
                            validate: (value) => getValues('password') === value || 'Пароли не совпадают',
                        })}
                    />
                </Col>
            </Row>
            {/* todo: add disabled styles for button */}
            <button type="submit" className="btn-5 fs-13 mt-4 mx-auto" disabled>
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
