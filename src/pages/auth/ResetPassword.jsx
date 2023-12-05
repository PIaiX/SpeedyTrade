import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import ResetPasswordForm from '../../components/forms/ResetPasswordForm'
import { useForm } from 'react-hook-form'
import ValidateWrapper from '../../components/UI/ValidateWrapper'
import { apiValidationRules } from '../../config/api'
import { resetPasswordEmailVerify } from '../services/resetPassword'
import { dispatchAlert } from '../helpers/alert'

const ResetPassword = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        getValues,
    } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' })

    const onSubmit = (data) => {
        resetPasswordEmailVerify(data)
            .then(() => dispatchAlert('success', 'Код отправлен, проверьте почту!'))
            .catch((res) => {
                if (res.response.data.errors.errors) setError('email', { type: 'custom', message: 'Email не найден' })
            })
    }

    return (
        <main>
            <Container>
                <section className="pt-4 pt-sm-5 mb-6">
                    <Row className="justify-content-center">
                        <Col xs={12} lg={10} xl={8} xxl={7}>
                            <h1 className="text-center">Восстановление пароля</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                                    required: apiValidationRules.required,
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: 'Введен некорректный email',
                                                    },
                                                })}
                                            />
                                        </ValidateWrapper>
                                    </Col>
                                </Row>
                                <div className="reset-password-button">
                                    <button type="submit" className="btn-5 fs-13 px-5">
                                        Отправить код
                                    </button>
                                </div>
                            </form>

                            <ResetPasswordForm email={getValues('email')} />

                            <h6 className="mt-4 mt-sm-5 text-center">
                                <Link to="/login" className="color-1">
                                    Я вспомнил пароль
                                </Link>
                            </h6>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default ResetPassword
