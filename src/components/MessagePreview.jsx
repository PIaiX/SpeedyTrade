import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import { BiBlock, BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import { getImageURL } from '../helpers/image'
import Moment from 'react-moment'
import {emitBannedConversation} from "../services/sockets/conversations";

const MessagePreview = ({ conversation, BlockChat }) => {
    const user = useSelector((state) => state?.auth?.user)
    const BanDialog=()=>{
        emitBannedConversation(conversation?.id)
            .then(res => BlockChat({...conversation, isBlockedForUser:true}))
    }

    return (
        <li className="messages-list-preview">
            <div className="img">
                <img src={getImageURL(conversation?.user?.avatar)} alt="Avatar" />
                {conversation?.user?.isOnline && <div className="indicator unread"></div>}
            </div>
            <div className="header">
                <h4 className="color-1 mb-0 mb-md-2">@{conversation?.user?.nickname}</h4>
                {/* <div className="fs-11 d-none d-md-block">@{conversation?.user?.nickname}</div> */}
            </div>
            {conversation.lastMessage && (
                <div className="message">
                    <img
                        src={getImageURL(
                            conversation.lastMessage.userId === conversation.user.id
                                ? conversation.user.avatar
                                : user.avatar
                        )}
                        alt="Имя"
                    />
                    <div>
                        {conversation.lastMessage.text.length > 100
                            ? conversation.lastMessage.text.substring(0, 100) + '...'
                            : conversation.lastMessage.text}
                    </div>
                </div>
            )}
            <div className="date">
                <Moment locale="ru" format="DD.MM.YYYY" date={conversation.updatedAt} />
                {' в '}
                <Moment locale="ru" format="HH:MM" date={conversation.updatedAt} />
            </div>{' '}
            <div className="count">
                {conversation.newMessagesCount && <span>{conversation.newMessagesCount}</span>}
            </div>
            <Link to={`chat/${conversation.id}`} aria-label="link to chat" className="link-to-chat" />
            <div className="controls">
                {/* <button type="button">
                    <BiTrash className="fs-13" />
                    <span className="ms-2">Удалить сообщение</span>
                </button> */}
                <button type="button" onClick={BanDialog}>
                    <BiBlock className="fs-13" />
                    <span className="ms-2">{conversation?.isBlockedForUser?'Заблокировано':'Заблокировать'}</span>
                </button>
            </div>
            <div className="drop d-md-none">
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <BiDotsHorizontalRounded />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {/* <Dropdown.Item as="button">
                            <BiTrash className="fs-13" />
                            <span className="ms-2">Удалить сообщение</span>
                        </Dropdown.Item> */}
                        <Dropdown.Item as="button" onClick={BanDialog}>
                            <BiBlock className="fs-13" />
                            <span className="ms-2">{conversation?.isBlockedForUser?'Заблокировано':'Заблокировать'}</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </li>
    )
}

export default MessagePreview
