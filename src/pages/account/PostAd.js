import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import AdsTr2 from '../../components/AdsTr2'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi"

const optionsPlatform = [
    { value: '1', label: 'Платформа 1' },
    { value: '2', label: 'Платформа 2' },
    { value: '3', label: 'Платформа 3' }
]
const optionsGames = [
    { value: '1', label: 'Игра 1' },
    { value: '2', label: 'Игра 2' },
    { value: '3', label: 'Игра 3' }
]

const PostAd = () => {
    return (
        <div className='main'>
            <div className='d-flex align-items-center mb-4'>
                <Link to='/account/ads' className='btn-1 p-2 me-4 d-lg-none'><FiArrowLeft className='fs-15'/></Link>
                <h4 className='color-1 mb-0'>Мои объявления</h4>
            </div>
            <p className='mb-4'>Добавление нового объявления</p>
            <form>
                <Row className='g-3 g-lg-4 align-items-center'>
                    <Col xs={12} sm={3} md={2}>Платформа:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="platform" placeholder='Выбрать' classNamePrefix="react-select" options={optionsPlatform} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Игра:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Сервер:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Предмет:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Уровень:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Раса:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Экипировка:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12}>
                        <hr className='horizontal' />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Профессия:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="platform" placeholder='Выбрать' classNamePrefix="react-select" options={optionsPlatform} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Описание:</Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select name="platform" placeholder='Выбрать' classNamePrefix="react-select" options={optionsPlatform} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12}>
                        <hr className='horizontal' />
                    </Col>
                    <Col xs={12} sm={3} md={2}>Цена:</Col>
                    <Col xs={12} sm={6} md={4} className='d-flex align-items-center'>
                        <input type='number' placeholder='0' className='flex-1'/>
                        <span className='ms-3'>руб.</span>
                    </Col>
                    <Col xs={12}>
                        <label>
                            <input type='checkbox' defaultChecked={true} />
                            <span>Активное</span>
                        </label>
                    </Col>
                    <Col xs={12}>
                        <hr className='horizontal' />
                    </Col>
                    <Col xs={12}>
                        <h6 className='color-2'>Золото ArcheAge: Unchained</h6>
                        <Table borderless responsive className='my-4'>
                            <thead>
                                <tr>
                                    <th>Показать</th>
                                    <th>Сервер</th>
                                    <th>Сторона</th>
                                    <th>Наличие</th>
                                    <th>Цена, руб. <div>за 1 000 ед.</div></th>
                                    <th>Мин. сумма заказа <div>чем меньше, тем лучше</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AdsTr2 />
                                <AdsTr2 />
                                <AdsTr2 />
                                <AdsTr2 />
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <div className='d-flex'>
                    <button type='button' className='btn-5'>Опубликовать объявление</button>
                    <button type='reset' className='btn-1 ms-2 ms-sm-3'>Отмена</button>
                </div>
            </form>
        </div>
    );
};

export default PostAd;