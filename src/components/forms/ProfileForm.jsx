import React, {useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useForm, Controller} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import ValidateWrapper from '../UI/ValidateWrapper'
import {useSelector} from 'react-redux'

const ProfileForm = ({onSubmit}) => {
    const user = useSelector((state) => state?.auth?.user)

    const {
        register,
        formState: {errors, isValid, isDirty},
        handleSubmit,
        control,
        getValues,
        watch,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            nickname: user.nickname ?? '',
            phone: user.phone ?? '',
            sex: user.sex ?? true,
            email: user.email ?? '',
            birthday: user.birthday ? moment(user.birthday).format('YYYY-MM-DD') : '',
        },
    })

    // useEffect(() => {
    //     console.log('form', watch())
    // }, [watch])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3 g-xl-4 align-items-center">
                <Col md={3}>
                    <div>Имя:</div>
                </Col>
                <Col md={9}>
                    <input type="text" placeholder="Имя" defaultValue={user?.firstName} />
                </Col>
                <Col md={3}>
                    <div>Фамилия:</div>
                </Col>
                <Col md={9}>
                    <input type="text" placeholder="Фамилия" defaultValue={user?.lastName} />
                </Col>
                <Col md={3}>
                    <div>Ник:</div>
                </Col>
                <Col md={9}>
                    <input type="text" placeholder="Ник" defaultValue={user?.nickname} />
                </Col>
                <Col md={3}>
                    <div>Пол:</div>
                </Col>
                <Col md={9} className="d-flex">
                    <label>
                        <input type="radio" name="sex" defaultChecked={true} />
                        <span>Женский</span>
                    </label>
                    <label className="ms-4">
                        <input type="radio" name="sex" />
                        <span>Мужской</span>
                    </label>
                </Col>
                <Col md={3}>
                    <div>Дата рождения:</div>
                </Col>
                <Col md={9} className="d-sm-flex">
                    <ValidateWrapper error={errors?.birthday} className="w-100">
                        <Controller
                            name="birthday"
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={getValues('birthday')}
                                    onChange={(date) => field.onChange(date)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            )}
                            rules={{required: 'Заполните поле'}}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={3}>
                    <div>Телефон:</div>
                </Col>
                <Col md={9}>
                    <ValidateWrapper error={errors?.phone}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({field}) => (
                                <PhoneInput
                                    inputClass="phone-input"
                                    country={'ru'}
                                    placeholder="Номер телефона"
                                    specialLabel={null}
                                    value={getValues('phone')}
                                    onChange={(phone) => field.onChange(phone)}
                                />
                            )}
                            rules={{
                                required: 'Заполните поле',
                                minLength: {
                                    value: 11,
                                    message: 'введите номер до конца',
                                },
                            }}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={3}>
                    <div>Email:</div>
                </Col>
                <Col md={9}>
                    <ValidateWrapper error={errors?.email}>
                        <input
                            type="email"
                            placeholder="email@email.com"
                            {...register('email', {required: 'Заполните поле'})}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={9} offset={3}>
                    <label>
                        <input type="checkbox" {...register('sex')} />
                        <span>Получать уведомления на почту</span>
                    </label>
                </Col>
            </Row>
            <div className="d-flex mt-4">
                <button type="submit" className="btn-5">
                    Сохранить изменения
                </button>
                <button type="button" className="btn-1 ms-2 ms-sm-4">
                    Отмена
                </button>
            </div>
        </form>
    )
}

export default ProfileForm
