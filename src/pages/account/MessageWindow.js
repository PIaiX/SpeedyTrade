import React from 'react'
import { FiSend, FiChevronLeft } from "react-icons/fi"
import InputFile from '../../components/utils/InputFile';
import Dropdown from 'react-bootstrap/Dropdown'
import { IoEllipsisHorizontal } from "react-icons/io5"
import { BiTrash, BiBlock } from "react-icons/bi"

const MessageWindow = () => {
    return (
        <div className='main p-0'>
            <div className='message-window'>
                <div className='top'>
                    <buttob type='button'>
                        <FiChevronLeft className='fs-13'/>
                        <span className='ms-2'>Назад</span>
                    </buttob>
                    <div className='text-center'>
                        <h4 className='color-1 mb-2'>Иванченко Дарья</h4>
                        <div className='fs-09'>Был(а) онлайн 15 минут назад</div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='img me-4'>
                            <img src='imgs/user2.png' alt='Иванченко Дарья'/>
                            <div className='indicator'></div>
                        </div>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="simple">
                                <IoEllipsisHorizontal className='fs-15'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button">
                                    <BiTrash className='fs-13'/>
                                    <span className='ms-2'>Удалить диалог</span>
                                </Dropdown.Item>
                                <Dropdown.Item as="button">
                                    <BiBlock className='fs-13'/>
                                    <span className='ms-2'>Заблокировать</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='middle'>
                    
                </div>
                <form>
                    <InputFile multiple={true} />
                    <input type='text' placeholder='Введите сообщение' />
                    <button type='submit'><FiSend /></button>
                </form>
            </div>
        </div>
    );
};

export default MessageWindow;