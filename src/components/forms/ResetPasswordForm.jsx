import React, {useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {useForm} from 'react-hook-form'
import ValidateWrapper from '../UI/ValidateWrapper'
import {resetPasswordConfirm} from '../../services/resetPassword'
import {apiValidationRules} from '../../config/api'
import {dispatchAlert} from '../../helpers/alert'
import {useNavigate} from 'react-router-dom'

const ResetPasswordForm = ({email}) => {
    const navigate = useNavigate()
    const {
        register,
        getValues,
        formState: {errors},
        handleSubmit,
        setValue,
    } = useForm({mode: 'onSubmit', reValidateMode: 'onChange'})

    useEffect(() => {
        email && setValue('email', email)
    }, [email])

    const onSubmit = (data) => {
        resetPasswordConfirm(data)
            .then(() => {
                dispatchAlert('success', 'Пароль успешно изменен!')
                navigate('/login')
            })
            .catch(() => {
                dispatchAlert('danger', 'Произошла ошибка')
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3 g-sm-4 align-items-center">
                <Col md={4}>
                    <h6 className="mb-0">Код подтверждения:</h6>
                </Col>
                <Col md={8}>
                    <ValidateWrapper error={errors?.verifyCode}>
                        <input {...register('verifyCode', {required: apiValidationRules.required})} />
                    </ValidateWrapper>
                </Col>
                <Col md={4}>
                    <h6 className="mb-0">Новый пароль:</h6>
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

            <div className="reset-password-button">
                <button type="submit" className="btn-5 fs-13 px-5">
                    Восстановить пароль
                </button>
            </div>
        </form>
    )
}

export default ResetPasswordForm
