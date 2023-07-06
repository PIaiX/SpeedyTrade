import React from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
    BiBookOpen,
    BiConversation,
    BiEnvelope,
    BiHistory,
    BiLike,
    BiLogOut,
    BiNews,
    BiUserCircle,
    BiWallet,
} from 'react-icons/bi'

export default function AccountMenu() {
    const unreadCount = useSelector((state) => state?.notification?.unreadCount)
    const saleCount = useSelector((state) => state?.notification?.saleCount)

    return (
        <nav className="menu">
            <ul>
                <li>
                    <NavLink to="profile">
                        <BiUserCircle />
                        <span>Профиль</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="ads">
                        <BiNews />
                        <span>Мои объявления</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="purchase-history">
                        <BiHistory />
                        <span>История покупок</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="sales">
                        <BiBookOpen />
                        <span>История продаж</span>
                        {saleCount && <span className="unread-conversations-count">{saleCount}</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="finance">
                        <BiWallet />
                        <span>Финансы</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="messages">
                        <BiEnvelope />
                        <span>Сообщения</span>
                        {unreadCount && <span className="unread-conversations-count">{unreadCount}</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="help">
                        <BiConversation />
                        <span>Помощь</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="reviews">
                        <BiLike />
                        <span>Отзывы</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="exit">
                        <BiLogOut />
                        <span>Выйти</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
