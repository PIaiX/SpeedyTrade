import React, {useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {userUpdatePassword} from '../../services/user'
import {dispatchAlert} from '../../helpers/alert'

const ChangePasswordForm = () => {
    const userId = useSelector((state) => state?.auth?.user?.id)

    const {
        register,
        getValues,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({mode: 'onSubmit', reValidateMode: 'onChange'})

    const onSubmit = (data) => {
        userUpdatePassword(data, userId)
            .then(() => dispatchAlert('success', 'Пароль успешно изменен'))
            .catch(() => console.log('12'))
    }

    return (
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <h6>Изменить пароль</h6>
            <Col xs={12} xl={8}>
                <Row className="g-3 g-xl-4 align-items-center">
                    <Col md={3}>
                        <div>Старый пароль:</div>
                    </Col>
                    <Col md={9}>
                        <InputPassword
                            register={register('oldPassword', {
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
                    <Col md={3}>
                        <div>Новый пароль:</div>
                    </Col>
                    <Col md={9}>
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
                    </Col>
                    <Col md={3}>
                        <div>Повторить пароль:</div>
                    </Col>
                    <Col md={9}>
                        <InputPassword
                            register={register('passwordConfirm', {
                                required: 'Заполните поле',
                                validate: (value) => getValues('password') === value || 'Пароли не совпадают',
                            })}
                        />
                    </Col>
                    <Col xs={12}>
                        <button type="submit" className="btn-5">
                            Сохранить
                        </button>
                    </Col>
                </Row>
            </Col>
        </form>
    )
}

export default ChangePasswordForm
