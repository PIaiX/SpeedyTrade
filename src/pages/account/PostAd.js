import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import AdsTr2 from '../../components/AdsTr2'

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
            <h4 className='color-1'>Мои объявления</h4>
            <p className='mb-4'>Добавление нового объявления</p>
            <form>
                <Row className='g-4 align-items-center'>
                    <Col md={2}>Платформа:</Col>
                    <Col md={10}>
                        <Select name="platform" placeholder='Выбрать' classNamePrefix="react-select" options={optionsPlatform} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Игра:</Col>
                    <Col md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Сервер:</Col>
                    <Col md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Предмет:</Col>
                    <Col md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Уровень:</Col>
                    <Col md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Раса:</Col>
                    <Col md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Экипировка:</Col>
                    <Col md={10}>
                        <Select name="game" placeholder='Выбрать' classNamePrefix="react-select" options={optionsGames} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12}>
                        <hr className='horizontal' />
                    </Col>
                    <Col md={2}>Профессия:</Col>
                    <Col md={10}>
                        <Select name="platform" placeholder='Выбрать' classNamePrefix="react-select" options={optionsPlatform} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col md={2}>Описание:</Col>
                    <Col md={10}>
                        <Select name="platform" placeholder='Выбрать' classNamePrefix="react-select" options={optionsPlatform} isClearable={true} isSearchable={true} />
                    </Col>
                    <Col xs={12}>
                        <hr className='horizontal' />
                    </Col>
                    <Col md={2}>Цена:</Col>
                    <Col md={4} className='d-flex align-items-center'>
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
                        <Table borderless className='my-4'>
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
                    <button type='button' className='btn-1 ms-3'>Отмена</button>
                </div>
            </form>
        </div>
    );
};

export default PostAd;