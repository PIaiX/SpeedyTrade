import React, { useEffect, useState } from 'react'
// import {useSelector} from 'react-redux'
import MessagePreview from '../../components/MessagePreview'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiSearch } from 'react-icons/fi'

import useSocketConnect from '../../hooks/socketConnect'
import { emitPaginateConversation } from '../../services/sockets/conversations'
import { socketInstance } from '../../services/sockets/socketInstance'

const Messages = () => {
    // const user = useSelector((state) => state?.auth?.user)
    const { isConnected } = useSocketConnect()
    const [currentPage, setCurrentPage] = useState(1)
    const [conversations, setConversations] = useState()
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (isConnected && socketInstance) {
            socketInstance?.on('message:create', (newMessage) => {
                emitPaginateConversation({ page: currentPage, nickname: search })
                    .then((res) => (res.status === 200 ? setConversations(res.body.data) : console.log(res)))
                    .catch((e) => console.log(e))
            })
        }
        return () => {
            socketInstance?.removeAllListeners()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setTimeout(() => {
            emitPaginateConversation({ page: currentPage, nickname: search })
                .then((res) => (res.status === 200 ? setConversations(res.body.data) : console.log(res)))
                .catch((e) => console.log(e))
        }, 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <div className="main p-0 py-3 py-sm-4">
            <div className="d-flex justify-content-between flex-wrap align-items-center mb-3 mb-sm-4 mx-3 mx-sm-4 mx-lg-5">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Сообщения</h4>
                <div className='chat-search'>
                    <input type={'text'} onChange={e => setSearch(e.target.value)} />
                    <div><FiSearch /></div>
                </div>
            </div>

            <ul className="messages-list">
                {conversations &&
                    conversations.map((conversation) => {
                        return <MessagePreview key={conversation.id} conversation={conversation} />
                    })}
            </ul>
        </div>
    )
}

export default Messages
