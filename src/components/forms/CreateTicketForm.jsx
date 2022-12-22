import React, {useCallback, useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputFile from '../utils/InputFile'
import {useForm} from 'react-hook-form'
import {apiValidationRules} from '../../config/api'
import {createTicket} from '../../services/tickets'
import {useSelector} from 'react-redux'
import ValidateWrapper from '../UI/ValidateWrapper'
import {dispatchAlert} from '../../helpers/alert'

const CreateTicketForm = ({setRefetch}) => {
    const userId = useSelector((state) => state?.auth?.user?.id)

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            text: '',
            topic: '',
            userId,
        },
    })

    const [isFileSent, setIsFileSent] = useState(false)

    useEffect(() => {
        if (isFileSent) {
            setIsFileSent(!isFileSent)
        }
    }, [isFileSent])

    const createNewTicket = (data) => {
        const formData = new FormData()

        for (const key in data) {
            if (key !== 'media') {
                formData.append(key, data[key])
            }
        }

        Object.values(data?.media).forEach((i) => formData.append('medias[]', i))

        createTicket(formData)
            .then(() => {
                dispatchAlert('success', 'Тикет успешно создан')
                reset()
                setRefetch(true)
                setIsFileSent(true)
            })
            .catch(() => {
                dispatchAlert('danger', 'Произошла ошибка')
            })
    }

    return (
        <form className="mt-4 mt-sm-5" onSubmit={handleSubmit(createNewTicket)}>
            <Row className="g-3 g-sm-4">
                <Col md={2}>
                    <div>Тема:</div>
                </Col>
                <Col md={10}>
                    <ValidateWrapper error={errors?.topic}>
                        <input
                            type="text"
                            placeholder="Тема тикета"
                            {...register('topic', {
                                required: apiValidationRules.required,
                                minLength: {value: 5, message: 'Минимум 5 символов'},
                            })}
                        />
                    </ValidateWrapper>
                </Col>
                <Col md={2}>
                    <div>Сообщение:</div>
                </Col>
                <Col md={10}>
                    <ValidateWrapper error={errors?.text}>
                        <textarea
                            rows={5}
                            placeholder="Сообщение"
                            {...register('text', {
                                required: apiValidationRules.required,
                                minLength: {value: 5, message: 'Минимум 5 символов'},
                            })}
                        />
                    </ValidateWrapper>
                    <InputFile
                        withText={true}
                        multiple={true}
                        register={register('media')}
                        isFileSent={isFileSent}
                    />
                </Col>
            </Row>
            <button type="submit" className="btn-5 mt-4">
                Отправить тикет
            </button>
        </form>
    )
}

export default CreateTicketForm
