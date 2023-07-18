import React, { useEffect, useState } from 'react'
import InputFile from '../../components/utils/InputFile'
import ChatMessage from '../../components/ChatMessage'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link, useParams } from 'react-router-dom'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { BiTrash } from 'react-icons/bi'
import { FiChevronLeft, FiSend } from 'react-icons/fi'
import { createTicketMessage, getAllTicketMessages } from '../../services/tickets'
import InfiniteScroll from 'react-infinite-scroller'
import { useForm } from 'react-hook-form'
import { apiValidationRules } from '../../config/api'
import ValidateWrapper from '../../components/UI/ValidateWrapper'
import Loader from '../../components/UI/Loader'
import { useSelector } from 'react-redux'
import { dispatchAlert } from '../../helpers/alert'
import { convertToLocaleDate } from '../../helpers/convertToLocaleDate'
import { socketInstance } from '../../services/sockets/socketInstance'
import useSocketConnect from '../../hooks/socketConnect'
import useGetUserInfo from "../../hooks/axios/getUserInfo";
import {getImageURL} from "../../helpers/image";

const Ticket = () => {
    const { id } = useParams()
    const [messages, setMessages] = useState({
        isLoaded: false,
        items: [],
        meta: {},
    })
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [currentPage, setCurrentPage] = useState(1)
    const [isFileSent, setIsFileSent] = useState(false)
    const { isConnected } = useSocketConnect()
    const {user} = useGetUserInfo(1)

    const {
        register,
        formState: { errors },
        handleSubmit,
        // setValue,
        reset,
        // resetField,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            userId: userId ?? '',
            ticketId: id ?? '',
            text: '',
            medias: ''
        },
    })

    useEffect(() => {
        getMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (isFileSent) {
            setIsFileSent(!isFileSent)
        }
    }, [isFileSent])

    const groupBy = (arr, key) => {
        const initialValue = {}
        return arr?.reduce((acc, cval) => {
            const myAttribute = cval[key] && convertToLocaleDate(cval[key])
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc
        }, initialValue)
    }

    useEffect(() => {
        if (isConnected && socketInstance) {
            console.log(`Listening to answer on ticket`)
            socketInstance?.on('ticket:answerWasCreated', (newMessage) => {
                newMessage &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, newMessage] : [newMessage],
                    }))
            })
        }
        return () => {
            console.log(`Chat ${id} listener deactivated`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])

    const createMessage = (data) => {
        createTicketMessage(data)
            .then((res) => {
                if(!res.body)
                    return
                setMessages((prevState) => ({
                    ...prevState,
                    items: prevState.items ? [...prevState.items, res.body] : [res.body],
                }))
                reset()
                setIsFileSent(true)
            })
            .catch((e) => {
                console.log(e)
                dispatchAlert('danger', 'Произошла ошибка, сообщение не отправлено')
            })
    }
    const getMessages = () => {
        if (id) {
            getAllTicketMessages(id, { page: currentPage, limit: 4, orderBy: 'desc' })
                .then((res) => {
                    res &&
                        setMessages({
                            isLoaded: true,
                            items: [...res.data.reverse(), ...messages.items],
                            meta: res?.meta,
                        })
                    setCurrentPage((prevState) => prevState + 1)
                })
                .catch(() => {
                    setMessages({ isLoaded: true, items: null })
                })
        }
    }

    return (
        <div className="main p-0">
            <div className="message-window">
                <div className="top">
                    <Link to="/account/help">
                        <FiChevronLeft className="fs-13" />
                        <span className="d-none d-sm-inline ms-2">Назад</span>
                    </Link>
                    <div className="text-center">
                        <h4 className="color-1 mb-0 mb-sm-2">Служба поддержки</h4>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="img me-2 me-sm-4">
                            <img src={getImageURL(user?.item?.avatar)} alt="Иванченко Дарья" />
                        </div>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="simple">
                                <IoEllipsisHorizontal className="fs-15" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button">
                                    <BiTrash className="fs-13" />
                                    <span className="ms-2">Удалить тикет</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <div className="middle">
                        <InfiniteScroll
                            loadMore={getMessages}
                            isReverse={true}
                            loader={
                                <div key={99999} className="d-flex justify-content-center">
                                    <Loader />
                                </div>
                            }
                            hasMore={
                                messages?.items && messages?.meta
                                    ? messages.meta.total > messages.items.length
                                    : true
                            }
                            threshold={20}
                            useWindow={false}
                        >
                            {messages.items &&
                                Object
                                    .entries(groupBy(messages.items, 'createdAt'))
                                    ?.map((message, index) => (
                                    <ChatMessage key={message[0]} keyArr={message[0]} arr={message[1]} />
                                ))}
                        </InfiniteScroll>
                    </div>
                    <form onSubmit={handleSubmit(createMessage)}>
                        <InputFile register={register('medias')} isFileSent={isFileSent} setIsFileSent={setIsFileSent} multiple={true} />
                        <ValidateWrapper error={errors?.text}>
                            <input
                                type="text"
                                placeholder="Введите сообщение"
                                {...register('text', {
                                    required: apiValidationRules.required,
                                    minLength: { value: 0, message: 'Минимум 1 символ!' },
                                })}
                            />
                        </ValidateWrapper>
                        <button type="submit">
                            <FiSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Ticket
