import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import InputFile from '../../components/utils/InputFile'
import ChatBox from '../../components/ChatBox'
import Dropdown from 'react-bootstrap/Dropdown'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiBlock, BiTrash} from 'react-icons/bi'
import {FiChevronLeft, FiSend} from 'react-icons/fi'

const MessageWindow = () => {
    useEffect(() => {
        const chatBody = document.getElementById('chatBody')
        return () => {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    })

    return (
        <div className="main p-0">
            <div className="message-window">
                <div className="top">
                    <Link to="/account/messages">
                        <FiChevronLeft className="fs-13" />
                        <span className="d-none d-sm-inline ms-2">Назад</span>
                    </Link>
                    <div className="text-center">
                        <h4 className="color-1 mb-0 mb-sm-2">Иванченко Дарья</h4>
                        <div className="fs-09">Был(а) онлайн 15 минут назад</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="img me-2 me-sm-4">
                            <img src="/images/user2.png" alt="Иванченко Дарья" />
                            <div className="indicator"></div>
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
                    <time>21.09.22</time>
                    <ChatBox />
                    <ChatBox />
                    <time>Сегодня</time>
                    <ChatBox />
                    <ChatBox />
                </div>
                <form>
                    <InputFile multiple={true} />
                    <input type="text" placeholder="Введите сообщение" />
                    <button type="submit">
                        <FiSend />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MessageWindow
