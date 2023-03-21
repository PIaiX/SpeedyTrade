import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import useSocketConnect from '../hooks/socketConnect'
import { socketInstance } from '../services/sockets/socketInstance'
import { emitCreatePublicMessage, emitPaginatePublicMessages } from '../services/sockets/messages'

import { FiSend } from 'react-icons/fi'
import InfiniteScroll from 'react-infinite-scroller'
import ChatMessage from './ChatMessage'
import { convertToLocaleDate } from '../helpers/convertToLocaleDate'
import InputFile from '../components/utils/InputFile'
import ValidateWrapper from '../components/UI/ValidateWrapper'

function ChatWindow() {
    const user = useSelector((state) => state?.auth?.user)
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const { isConnected } = useSocketConnect()
    const [currentPage, setCurrentPage] = useState(1)

    const [messages, setMessages] = useState({
        isLoaded: false,
        items: [],
        meta: null,
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            text: '',
            attachedfile: '',
            isViewed: true,
        },
    })

    useEffect(() => {
        const chatBody = document.getElementById('chatBody')
        return () => {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    })

    useEffect(() => {
        if (isConnected && socketInstance) {
            socketInstance?.on('pcmessage:create', (newMessage) => {
                newMessage &&
                    setMessages((prevState) => ({
                        ...prevState,
                        items: prevState.items ? [...prevState.items, newMessage] : [newMessage],
                    }))
            })
        }
        return () => {
            socketInstance?.removeAllListeners()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

    const createMessage = (payload) => {
        const formData = new FormData()
        formData.append('attachedfile', payload.attachedfile[0])
        emitCreatePublicMessage(payload)
            .then((res) => {
                reset()
            })
            .catch((e) => console.log(e))
    }

    const getMessages = () => {
        user &&
            emitPaginatePublicMessages({ page: currentPage, limit: 10, orderBy: 'desc' })
                .then((res) => {
                    if (res.status === 200) {
                        setMessages({
                            isLoaded: true,
                            items: [...res.body.data.reverse(), ...messages.items],
                            meta: res?.body?.meta,
                        })
                        setCurrentPage(currentPage + 1)
                    } else {
                        console.log(res)
                    }
                })
                .catch(() => setMessages({ isLoaded: true, items: null, meta: null }))
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
        <section className="chat">
            <div className="chat-title">
                <h2 className="mb-0">Онлайн-чат</h2>
                <p className="d-none d-sm-block ms-4">Продажа в чате запрещена</p>
            </div>
            <div className="chat-window">
                <div className="chat-space" id="chatBody">
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
                            <ChatMessage key={key} keyArr={key[0]} arr={key[1]} avatarUser={user.avatar} />
                        ))}
                    </InfiniteScroll>
                </div>
                <form onSubmit={handleSubmit(createMessage)}>
                    <InputFile register={register('attachedfile')} disabled={!isAuth} />

                    <ValidateWrapper error={errors?.text}>
                        <input
                            type="text"
                            placeholder="Начните общаться"
                            {...register('text', {
                                required: 'Минимум 1 знак',
                            })}
                            disabled={!isAuth}
                        />
                    </ValidateWrapper>

                    <hr className="vertical mx-2 mx-sm-3" />

                    <button type="submit" disabled={!isAuth}>
                        <FiSend />
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ChatWindow
