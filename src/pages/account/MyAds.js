import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoEllipsisHorizontal } from "react-icons/io5"

const MyAds = () => {
    return (
        <div className='main'>
            <h4 className='color-1'>Мои объявления</h4>
            <button type='button' className='btn-5'>+ Разместить новое объявление</button>
            <Row md={3} className='mt-4'>
                <Col className='d-flex align-items-center'>
                    <span className='me-3'>Игра:</span>
                    <select defaultValue={3}>
                        <option disabled>Игра</option>
                        <option value={1}>Игра 1</option>
                        <option value={2}>Игра 2</option>
                        <option value={3}>Игра 3</option>
                        <option value={4}>Игра 4</option>
                        <option value={5}>Игра 5</option>
                    </select>
                </Col>
                <Col className='d-flex align-items-center'>
                    <span className='me-3'>Сервер:</span>
                    <select defaultValue={3}>
                        <option disabled>Сервер</option>
                        <option value={1}>Сервер 1</option>
                        <option value={2}>Сервер 2</option>
                        <option value={3}>Сервер 3</option>
                        <option value={4}>Сервер 4</option>
                        <option value={5}>Сервер 5</option>
                    </select>
                </Col>
                <Col className='d-flex align-items-center'>
                    <span className='me-3'>Платформа:</span>
                    <select defaultValue={3}>
                        <option disabled>Платформа</option>
                        <option value={1}>Платформа 1</option>
                        <option value={2}>Платформа 2</option>
                        <option value={3}>Платформа 3</option>
                        <option value={4}>Платформа 4</option>
                        <option value={5}>Платформа 5</option>
                    </select>
                </Col>
            </Row>

            <Table borderless>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Заказ</th>
                        <th>Уровень</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>24.08.2022</td>
                        <td>#CTWVZGG6</td>
                        <td>4738</td>
                        <td>ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar</td>
                        <td>3 000 руб.</td>
                        <td>
                            
                            <Dropdown align="end">
                                <Dropdown.Toggle>
                                    <IoEllipsisHorizontal/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Удалить запись</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                </tbody>
                </Table>

        </div>
    );
};

export default MyAds;