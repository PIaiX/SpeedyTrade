import React, {useCallback, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {authRegistration, authRegistrationEmailVerify} from '../../services/auth'
import LoaderButton from '../UI/LoaderButton'
import {validateFormFromApi} from '../../helpers/form'
import ValidateWrapper from '../UI/ValidateWrapper'

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const [isLoadingEmailVerify, setIsLoadingEmailVerify] = useState(false)

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        watch,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const onSubmitRegistration = useCallback((data) => {
        authRegistration(data)
            .then((res) => res && console.log('res', res))
            .catch((error) => error && console.log('error', error))
    }, [])

    const onSubmitEmailVerify = useCallback(() => {
        const email = watch('email')

        if (email) {
            setIsLoadingEmailVerify(true)
            authRegistrationEmailVerify({email})
                .then((res) => res && setIsLoadingEmailVerify(false))
                .catch((error) => {
                    validateFormFromApi(error, setError)
                    error && setIsLoadingEmailVerify(false)
                })
        } else setError('email', {type: 'custom', message: 'Заполните поле'})
    }, [watch('email')])

    return (
        <Form onSubmit={handleSubmit(onSubmitRegistration)}>
            <Row className="g-3 g-sm-4 align-items-center">
                <Col md={4}>
                    <h6 className="mb-0">Имя:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.firstName}>
                        <input
                            type="text"
                            placeholder="Имя"
                            {...register('firstName', {
                                required: 'Заполните поле',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                            })}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Фамилия:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.lastName}>
                        <input
                            type="text"
                            placeholder="Фамилия"
                            {...register('lastName', {
                                required: 'Заполните поле',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                            })}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Ник:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.nickname}>
                        <input
                            type="text"
                            placeholder="Ник"
                            {...register('nickname', {
                                required: 'Заполните поле',
                                minLength: {value: 2, message: 'Минимум 2 символа'},
                            })}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Email:</h6>
                </Col>
                <Col md={8}>
                    <div className="email-verify-wrapper">
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
                        <LoaderButton
                            type="button"
                            loaderProps={{size: 18}}
                            className={`btn-4 ws-no px-3 ${!errors?.email && watch('email') ? 'active' : ''}`}
                            onClick={() => onSubmitEmailVerify()}
                            disabled={isLoadingEmailVerify}
                        >
                            {!isLoadingEmailVerify ? 'Выслать код' : null}
                        </LoaderButton>
                    </div>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Код с почты:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.verifyCode}>
                        <input
                            type="text"
                            placeholder="Код"
                            className="w-100"
                            {...register('verifyCode', {required: 'Заполните поле'})}
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
                    </ValidateWrapper>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Подтверждение пароля:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.passwordConfirm}>
                        <InputPassword
                            register={register('passwordConfirm', {
                                required: 'Заполните поле',
                                validate: (value) => getValues('password') === value || 'Пароли не совпадают',
                            })}
                        />
                    </ValidateWrapper>
                </Col>
            </Row>
            <button type="submit" className="btn-5 fs-13 mt-4 mx-auto" disabled={!isValid}>
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
