import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getImageURL} from '../helpers/image'
// import Moment from 'react-moment'
import {convertToLocaleDate} from '../helpers/convertToLocaleDate'
import {useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {getOneLot} from '../services/lots'

import useSocketConnect from '../hooks/socketConnect'
import {socketInstance} from '../services/sockets/socketInstance'
import {
    emitCreateMessage,
    emitPaginateMessages,
    emitViewedMessage,
    emitGetConversationWithUserId,
} from '../services/sockets/messages'
// import {emitGetConversation} from '../services/sockets/conversations'

import InputFile from '../components/utils/InputFile'
import Dropdown from 'react-bootstrap/Dropdown'
import {FiAlertTriangle, FiBell, FiMoreHorizontal, FiSend, FiTrash2} from 'react-icons/fi'
import InfiniteScroll from 'react-infinite-scroller'
import ValidateWrapper from '../components/UI/ValidateWrapper'
import ChatMessage from './ChatMessage'

const LotChat = () => {
    const user = useSelector((state) => state?.auth?.user)
    const {isConnected} = useSocketConnect()
    const {id} = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    // const [isFetching, setIsFetching] = useState(true)

    const [lotUser, setLotUser] = useState()
    const [conversationId, setConversationId] = useState()

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            conversationId: conversationId,
            text: '',
            fromId: user?.id,
            sendFromLot: id,
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
        id && getOneLot(id).then((res) => setLotUser(res.user))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let setConvId = async () => {
            if (lotUser) {
                let res = await emitGetConversationWithUserId(lotUser.id)
                res.status === 200 ? setConversationId(res.body.id) : console.log(res)
                setValue('conversationId', res.body.id)
            }
        }
        setConvId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lotUser])

    // useEffect(() => {
    //     setValue('conversationId', conversationId)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [conversationId])

    useEffect(() => {
        if (isConnected && socketInstance) {
            socketInstance?.on('message:create', (newMessage) => {
                newMessage &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, newMessage] : [newMessage],
                    }))
            })
            conversationId && user?.id && emitViewedMessage(conversationId, user?.id)
            socketInstance?.on('message:viewed', () => {
                setMessages((prevState) => ({
                    ...prevState,
                    items: prevState.items && prevState.items.map((i) => ({...i, isViewed: true})),
                }))
            })
        }
        return () => {
            socketInstance?.removeAllListeners()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createMessage = (payload) => {
        console.log(payload)
        emitCreateMessage(payload)
            .then((res) => {
                res &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, res.body] : [res.body],
                    }))
                reset()
            })
            .catch((e) => console.log(e))
    }

    const getMessages = () => {
        if (conversationId) {
            emitPaginateMessages(conversationId, {page: currentPage, limit: 10, orderBy: 'desc'})
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
            // .finally(() => setIsFetching(false))
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
                <div className="d-flex align-items-center">
                    <div className="img me-2 me-sm-3">
                        <img src={getImageURL(lotUser?.avatar)} alt={lotUser?.fullName} />
                        <div className="indicator online"></div>
                    </div>
                    <div>
                        <h5 className="achromat-2 mb-0 mb-sm-1">{lotUser?.fullName}</h5>
                        <div className="achromat-3 fs-09">Был(а) онлайн 15 минут назад</div>
                    </div>
                </div>
                <Dropdown align="end">
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
                </Dropdown>
            </div>
            <div className="middle" id="chatBody">
                <InfiniteScroll
                    loadMore={getMessages}
                    isReverse={true}
                    hasMore={messages?.items && messages.meta ? messages.meta.total > messages.items.length : true}
                    threshold={100}
                    useWindow={false}
                >
                    {Object.entries(groupBy(messages?.items, 'createdAt')).map((key, index) => (
                        <ChatMessage key={key} keyArr={key[0]} arr={key[1]} avatarUser={lotUser?.avatar} />
                    ))}
                </InfiniteScroll>
            </div>
            <form onSubmit={handleSubmit(createMessage)}>
                <InputFile multiple={true} />

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
        </>
    )
}

export default LotChat
