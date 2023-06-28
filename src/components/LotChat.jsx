import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getImageURL } from '../helpers/image'
import { convertToLocaleDate } from '../helpers/convertToLocaleDate'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import useSocketConnect from '../hooks/socketConnect'
import { socketInstance } from '../services/sockets/socketInstance'
import {
    emitCreateMessage,
    emitPaginateMessages,
    emitViewedMessage,
    emitGetConversationWithUserId,
} from '../services/sockets/messages'

import InputFile from '../components/utils/InputFile'
import Dropdown from 'react-bootstrap/Dropdown'
import { FiAlertTriangle, FiBell, FiMoreHorizontal, FiSend, FiTrash2 } from 'react-icons/fi'
import InfiniteScroll from 'react-infinite-scroller'
import ValidateWrapper from '../components/UI/ValidateWrapper'
import ChatMessage from './ChatMessage'

const LotChat = ({ lotUser }) => {
    const user = useSelector((state) => state?.auth?.user)
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const { isConnected } = useSocketConnect()
    const { id } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [conversationId, setConversationId] = useState()
    const [conversation, setConversation] = useState()
    const [isFileSent, setIsFileSent] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            userId: lotUser.id,
            text: '',
            fromId: user?.id,
            lotId: id,
            attachedfile: '',
        },
    })

    const [messages, setMessages] = useState({
        isLoaded: false,
        items: [],
        meta: null,
    })

    // useEffect(() => {
    //     const chatBody = document.getElementById('chatBody')
    //     return () => {
    //         chatBody.scrollTop = chatBody.scrollHeight
    //     }
    // })

    useEffect(() => {
        let setConvId = async () => {
            if (lotUser) {
                let res = await emitGetConversationWithUserId(lotUser.id)
                if(res.status==200){
                    setConversation(res.body)
                }
                res.status === 200 ? setConversationId(res.body.id) : console.log(res)
                conversationId && setValue('conversationId', res.body.id)
            }
        }
        setConvId()
    }, [lotUser])

    useEffect(() => {
        if (isConnected && socketInstance) {
            socketInstance?.on('message:create', (newMessage) => {
                newMessage &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, newMessage] : [newMessage],
                    }))
            })
            socketInstance?.on('message:viewed', () => {
                setMessages((prevState) => ({
                    ...prevState,
                    items: prevState.items && prevState.items.map((i) => ({ ...i, isViewed: true })),
                }))
            })
            lotUser.id && emitViewedMessage({ userId: lotUser.id })
        }
        return () => {
            socketInstance?.removeAllListeners()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])

    const createMessage = (payload) => {
        const formData = new FormData()
        formData.append('attachedfile', payload.attachedfile[0])
        emitCreateMessage(payload)
            .then((res) => {
                res &&
                    messages.items &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, res.body] : [res.body],
                    }))
                setIsFileSent(true)
                reset()
            })
            .catch((e) => console.log(e))
    }

    const getMessages = () => {
        if (lotUser.id) {
            emitPaginateMessages({ userId: lotUser.id }, { page: currentPage, limit: 10, orderBy: 'desc' })
                .then((res) => {
                    if (res.status === 200) {
                        setMessages({
                            isLoaded: true,
                            items: [...res.body.data.reverse(), ...messages.items],
                            meta: res?.body?.meta,
                        })
                        setCurrentPage(currentPage + 1)
                    }
                })
                .catch(() => setMessages({ isLoaded: true, items: null, meta: null }))
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
        <>
            <div className="top">
                <Link to={`/user/${lotUser.id}`} className="d-flex align-items-center">
                    <div className="img me-2 me-sm-3">
                        <img src={getImageURL(lotUser.avatar)} alt={lotUser.fullName} />
                        <div className={lotUser.isOnline ? 'indicator unread' : 'indicator'}></div>
                    </div>
                    <div>
                        <h5 className="achromat-2 mb-0 mb-sm-1">{lotUser.fullName}</h5>
                        <div className="achromat-3 fs-09">
                            {lotUser.isOnline ? 'Онлайн' : 'Был(а) онлайн ' + lotUser.lastSeenForUser}
                        </div>
                    </div>
                </Link>
                {/* <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <FiMoreHorizontal className="fs-15" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">
                            <FiBell className="fs-13" />
                            <span className="ms-2">Включить оповещения</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <FiAlertTriangle className="fs-13" />
                            <span className="ms-2">Пожаловаться</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <FiTrash2 className="fs-13" />
                            <span className="ms-2">Удалить диалог</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </div>
            <div className="middle" id="chatBody">
                {isAuth ? (
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
                            <ChatMessage key={key} keyArr={key[0]} arr={key[1]} avatarUser={lotUser.avatar} />
                        ))}
                    </InfiniteScroll>
                ) : (
                    <div>Чат доступен только авторизованным пользователям</div>
                )}
            </div>
            <form onSubmit={handleSubmit(createMessage)}>
                {
                    conversation?.isBlockedForUser ?
                        <div>
                            Пользователь запретил оправку сообщений.
                        </div>
                        :<>
                            <InputFile register={register('attachedfile')} isFileSent={isFileSent} setIsFileSent={setIsFileSent} disabled={!isAuth} />
                            <ValidateWrapper error={errors?.text}>
                                <input
                                    type="text"
                                    placeholder="Введите сообщение"
                                    {...register('text', {
                                        required: 'Минимум 1 знак',
                                    })}
                                    disabled={!isAuth}
                                />
                            </ValidateWrapper>

                            <button type="submit" disabled={!isAuth}>
                                <FiSend />
                            </button>
                        </>
                        }
            </form>
        </>
    )
}

export default LotChat
