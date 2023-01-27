import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import InputFile from '../../components/utils/InputFile'
import Dropdown from 'react-bootstrap/Dropdown'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiBlock, BiTrash} from 'react-icons/bi'
import {FiChevronLeft, FiSend} from 'react-icons/fi'
import {getImageURL} from '../../helpers/image'

import {useForm} from 'react-hook-form'
import useSocketConnect from '../../hooks/socketConnect'
import {socketInstance} from '../../services/sockets/socketInstance'
import {emitCreateMessage, emitPaginateMessages, emitViewedMessage} from '../../services/sockets/messages'
import {emitGetConversation} from '../../services/sockets/conversations'
import ValidateWrapper from '../../components/UI/ValidateWrapper'
import {convertToLocaleDate} from '../../helpers/convertToLocaleDate'
import ChatMessage from '../../components/ChatMessage'
import InfiniteScroll from 'react-infinite-scroller'

const MessageWindow = () => {
    const user = useSelector((state) => state?.auth?.user)
    const {id} = useParams()
    const {isConnected} = useSocketConnect()
    const [currentPage, setCurrentPage] = useState(1)
    const [conversation, setConversation] = useState()

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            conversationId: id,
            text: '',
            fromId: user?.id,
            attachedfile: '',
        },
    })

    const [messages, setMessages] = useState({
        isLoaded: false,
        items: [],
        meta: null,
    })

    useEffect(() => {
        const chatBody = document.getElementById('chatBody')
        return () => {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    })

    useEffect(() => {
        setTimeout(() => {
            id && emitGetConversation(id).then((res) => setConversation(res))
        }, 10)
    }, [id])

    useEffect(() => {
        if (isConnected && socketInstance) {
            console.log(`Chat ${id} listener activated`)
            socketInstance?.on('message:create', (newMessage) => {
                newMessage &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, newMessage] : [newMessage],
                    }))
            })
            socketInstance?.on('message:viewed', (data) => {
                setMessages((prevState) => ({
                    ...prevState,
                    items: prevState.items && prevState.items.map((i) => ({...i, isViewed: true})),
                }))
            })
            id && user?.id && emitViewedMessage({conversationId: id})
        }
        return () => {
            console.log(`Chat ${id} listener deactivated`)
            socketInstance?.off('message:create')
            socketInstance?.off('message:viewed')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])

    const createMessage = (payload) => {
        const formData = new FormData()
        formData.append('attachedfile', payload.attachedfile[0])
        emitCreateMessage(payload)
            .then((res) => {
                res &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, res.body] : [res.body],
                    }))
                reset({
                    conversationId: id,
                    text: '',
                    fromId: user?.id,
                    attachedfile: '',
                })
            })
            .catch((e) => console.log(e))
    }

    const getMessages = () => {
        if (id) {
            emitPaginateMessages({conversationId: id}, {page: currentPage, limit: 10, orderBy: 'desc'})
                .then((res) => {
                    res &&
                        messages.items &&
                        setMessages({
                            isLoaded: true,
                            items: [...res.body.data.reverse(), ...messages.items],
                            meta: res?.body?.meta,
                        })
                    setCurrentPage(currentPage + 1)
                })
                .catch(() => setMessages({isLoaded: true, items: null, meta: null}))
        }
    }

    const groupBy = (arr, key) => {
        const initialValue = {}
        return arr?.reduce((acc, cval) => {
            const myAttribute = cval[key] && convertToLocaleDate(cval[key])
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc
        }, initialValue)
    }

    return (
        <div className="main p-0">
            <div className="message-window">
                <div className="top">
                    <Link to="/account/messages">
                        <FiChevronLeft className="fs-13" />
                        <span className="d-none d-sm-inline ms-2">Назад</span>
                    </Link>
                    <div className="text-center">
                        <h4 className="color-1 mb-0 mb-sm-2">{conversation?.user?.fullName}</h4>
                        <div className="fs-09">
                            {conversation?.user?.isOnline
                                ? 'Онлайн'
                                : 'Был(а) онлайн ' + conversation?.user?.lastSeenForUser}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="img me-2 me-sm-4">
                            <img src={getImageURL(conversation?.user?.avatar)} alt={conversation?.user?.fullName} />
                            <div className={conversation?.user?.isOnline ? 'indicator unread' : 'indicator'}></div>
                        </div>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="simple">
                                <IoEllipsisHorizontal className="fs-15" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button">
                                    <BiTrash className="fs-13" />
                                    <span className="ms-2">Удалить диалог</span>
                                </Dropdown.Item>
                                <Dropdown.Item as="button">
                                    <BiBlock className="fs-13" />
                                    <span className="ms-2">Заблокировать</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="middle" id="chatBody">
                    <InfiniteScroll
                        loadMore={getMessages}
                        isReverse={true}
                        hasMore={
                            messages?.items && messages.meta ? messages.meta.total > messages.items.length : true
                        }
                        threshold={100}
                        useWindow={false}
                    >
                        {Object.entries(groupBy(messages?.items, 'createdAt')).map((key, index) => (
                            <ChatMessage key={key} keyArr={key[0]} arr={key[1]} />
                        ))}
                    </InfiniteScroll>
                </div>
                <form onSubmit={handleSubmit(createMessage)}>
                    <InputFile multiple={true} register={register('attachedfile')} />

                    <ValidateWrapper error={errors?.text}>
                        <input
                            type="text"
                            placeholder="Введите сообщение"
                            {...register('text', {
                                required: 'Минимум 1 знак',
                            })}
                        />
                    </ValidateWrapper>

                    <button type="submit">
                        <FiSend />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MessageWindow
