import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import { BiTrash, BiBlock, BiDotsHorizontalRounded } from "react-icons/bi"

const MessagePreview = () => {
    return (
        <li className='messages-list-preview'>
            <div className='img'>
                <img src='imgs/user2.png' alt='Иванченко Дарья'/>
                <div className='indicator unread'></div>
            </div>
            <div className='header'>
                <h4 className='color-1 mb-0 mb-md-2'>Иванченко Дарья</h4>
                <div className='fs-11 d-none d-md-block'>@yourdashulik</div>
            </div>
            <Link to='chat' className='message'>
                <img src='imgs/user.png' alt='Имя'/>
                <div>Да, конечно, давай! Ты уточняла вчера по поводу запасов алмазов, мне кажется т</div>
            </Link>
            <div className='date'>10.10.2022 в 14:45</div>
            <div className='count'>
                <span>2</span>
            </div>
            <div className='controls'>
                <button type='button'>
                    <BiTrash className='fs-13'/>
                    <span className='ms-2'>Удалить сообщение</span>
                </button>
                <button type='button'>
                    <BiBlock className='fs-13'/>
                    <span className='ms-2'>Заблокировать</span>
                </button>
            </div>
            <div className='drop d-md-none'>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <BiDotsHorizontalRounded/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">
                            <BiTrash className='fs-13'/>
                            <span className='ms-2'>Удалить сообщение</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <BiBlock className='fs-13'/>
                            <span className='ms-2'>Заблокировать</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </li>
    );
};

export default MessagePreview;