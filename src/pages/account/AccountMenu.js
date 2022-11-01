import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiUserCircle, BiNews, BiHistory, BiBookOpen, BiEnvelope, BiWallet, BiCog, BiConversation, BiLogOut, BiLike } from "react-icons/bi"

export default function AccountMenu() {
    return (
        <nav className='menu'>
            <ul>
                <li>
                    <NavLink to='profile'>
                        <BiUserCircle/>
                        <span>Профиль</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='ads'>
                        <BiNews/>
                        <span>Мои объявления</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='purchase-history'>
                        <BiHistory/>
                        <span>История покупок</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='sales'>
                        <BiBookOpen/>
                        <span>История продаж</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='finance'>
                        <BiWallet/>
                        <span>Финансы</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='messages'>
                        <BiEnvelope/>
                        <span>Сообщения</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='settings'>
                        <BiCog/>
                        <span>Настройки</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='help'>
                        <BiConversation/>
                        <span>Помощь</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='reviews'>
                        <BiLike/>
                        <span>Отзывы</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='exit'>
                        <BiLogOut/>
                        <span>Выйти</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}