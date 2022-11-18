import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

import InputFile from '../components/utils/InputFile'
import ChatBox from '../components/ChatBox'
import Dropdown from 'react-bootstrap/Dropdown'
import {FiSend, FiBell, FiAlertTriangle, FiTrash2, FiMoreHorizontal} from 'react-icons/fi'
import StarRating from '../components/utils/StarRating'
import ReviewBlock from '../components/ReviewBlock'

const optionsPayment = [
    {value: '1', label: 'Тип оплаты 1'},
    {value: '2', label: 'Тип оплаты 2'},
    {value: '3', label: 'Тип оплаты 3'},
]

const Lot = () => {
    useEffect(() => {
        const chatBody = document.getElementById('chatBody')
        return () => {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    })

    return (
        <main>
            <Container>
                <section className="lot-page pt-4 pt-sm-5 mb-6">
                    <Row className="gx-4 gy-5">
                        <Col xs={12} lg={7}>
                            <h1>Оформление заказа</h1>
                            <Row className="g-3 g-sm-4">
                                <Col md={3}>Платформа:</Col>
                                <Col md={9}>
                                    <div className="box">
                                        <p>Android</p>
                                    </div>
                                </Col>
                                <Col md={3}>Краткое описание:</Col>
                                <Col md={9}>
                                    <div className="box">
                                        <p>
                                            ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без
                                            ранга, 150 шт., Avatar
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>Подробное описание: </Col>
                                <Col md={9}>
                                    <div className="box">
                                        <p>
                                            ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без
                                            ранга, 150 шт., Avatar
                                        </p>
                                        <p>
                                            366M - силы
                                            <br />
                                            383 - уровень героев
                                            <br />
                                            34 - возвышенных героев
                                            <br />6 - героев иномирцев(Мерлин,Артур,Да Винчи,Баба Яга,Жанна
                                            д'Арк,Аинз )
                                            <br />
                                            Можно приобрести Геральта и Йенифер
                                            <br />
                                            Глава 37-4
                                            <br />
                                            Уровень аккаунта 199
                                            <br />
                                            70 Уровень Старейшего Древа
                                        </p>
                                        <p>
                                            8 Героев 30/30 SI
                                            <br />8 Героев 9/9 Мебель и еще несколько на подходе
                                            <br />6 Героев 4/4 T4
                                            <br />6 Героев 4/4 T3
                                            <br />
                                            Все герои, у которых разблокирован SI, имеют легендарный SI +
                                            <br />
                                            VIP 10
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>Способ оплаты:</Col>
                                <Col md={9}>
                                    <Select
                                        name="payment"
                                        placeholder="Выбрать"
                                        classNamePrefix="react-select"
                                        options={optionsPayment}
                                        isClearable={true}
                                        isSearchable={true}
                                    />
                                </Col>
                                <Col md={3}>
                                    <button type="button" className="btn-5 w-100">
                                        Оплатить
                                    </button>
                                </Col>
                                <Col md={9}>
                                    <p className="achromat-3">
                                        * Продавец не сможет получить оплату до тех пор, пока вы не подтвердите
                                        выполнение всех его обязательств
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} lg={5}>
                            <div className="message-window">
                                <div className="top">
                                    <div className="d-flex align-items-center">
                                        <div className="img me-2 me-sm-3">
                                            <img src="imgs/user2.png" alt="Иванченко Дарья" />
                                            <div className="indicator online"></div>
                                        </div>
                                        <div>
                                            <h5 className="achromat-2 mb-0 mb-sm-1">Иванченко Дарья</h5>
                                            <div className="achromat-3 fs-09">Был(а) онлайн 15 минут назад</div>
                                        </div>
                                    </div>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="simple">
                                            <FiMoreHorizontal className="fs-15" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as="button">
                                                <FiBell className="fs-13" />
                                                <span className="ms-2">Включить оповещения</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button">
                                                <FiAlertTriangle className="fs-13" />
                                                <span className="ms-2">Пожаловаться</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button">
                                                <FiTrash2 className="fs-13" />
                                                <span className="ms-2">Удалить диалог</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
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
                        </Col>
                        <Col xs={12} lg={7}>
                            <div className="d-flex align-items-center mb-4">
                                <h3 className="me-4">Рейтинг продавца</h3>
                                <StarRating rate={2.8} />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <span>Показать:</span>
                                <select className="w-50 ms-4">
                                    <option>Все отзывы</option>
                                    <option>5 звезд</option>
                                    <option>4 звезды</option>
                                    <option>3 звезды</option>
                                    <option>2 звезды</option>
                                    <option>1 звезда</option>
                                </select>
                            </div>

                            <ReviewBlock />
                            <ReviewBlock />
                            <ReviewBlock />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Lot
