import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import StarRating from '../components/utils/StarRating'
import InputRating from '../components/utils/InputRating'
import ReviewBlock from '../components/ReviewBlock'
import {VscChromeClose} from 'react-icons/vsc'
import Select from 'react-select'

const optionsLots = [
    {value: '1', label: 'Лот 1'},
    {value: '2', label: 'Лот 2'},
    {value: '3', label: 'Лот 3'},
    {value: '4', label: 'Лот 4'},
    {value: '5', label: 'Лот 5'},
    {value: '6', label: 'Лот 6'},
]

const UserPage = () => {
    const [showReview, setShowReview] = useState(false)

    const handleCloseReview = () => setShowReview(false)
    const handleShowReview = () => setShowReview(true)
    return (
        <>
            <main>
                <Container>
                    <section className="user-page pt-5 mb-6">
                        <Row className="gy-4 gy-sm-5 gx-4 gx-xxl-5">
                            <Col sm={5} md={4} lg={3}>
                                <img src="imgs/user.png" alt="" className="img" />
                            </Col>
                            <Col sm={7} md={8} lg={4} xl={3}>
                                <h4>Колесникова Ирина</h4>
                                <StarRating rate={4.1} className="justify-content-start" />
                                <p className="mt-4">На сайте с сентября 2019 г.</p>
                                <p className="mt-2">
                                    Завершено сделок: <strong>100</strong>
                                </p>
                                <button type="button" onClick={handleShowReview} className="btn-6 mt-4">
                                    Оставить отзыв
                                </button>
                            </Col>
                            <Col xs={12} lg={5} xl={6}>
                                <Row className="info g-2 g-sm-4">
                                    <Col xs={5}>Имя:</Col>
                                    <Col xs={7}>Ирина</Col>
                                    <Col xs={5}>Фамилия:</Col>
                                    <Col xs={7}>Колесникова</Col>
                                    <Col xs={5}>Ник:</Col>
                                    <Col xs={7}>Irishka1911</Col>
                                    <Col xs={5}>Пол:</Col>
                                    <Col xs={7}>Женский</Col>
                                    <Col xs={5}>Дата рождения::</Col>
                                    <Col xs={7}>11.11.2001</Col>
                                </Row>
                            </Col>
                            <Col xs={12} lg={7}>
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

            <Modal show={showReview} onHide={handleCloseReview}>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="color-1">Оставьте отзыв</h3>
                        <button type="button" onClick={handleCloseReview} className="btn-4 px-3 py-2">
                            <VscChromeClose />
                        </button>
                    </div>

                    <form>
                        <div className="mb-2">Приобретенный лот:</div>
                        <Select
                            name="lot"
                            placeholder="Выбрать"
                            classNamePrefix="react-select"
                            options={optionsLots}
                            isClearable={true}
                            isSearchable={true}
                        />
                        <div className="mt-4 mb-2">Ваша оценка:</div>
                        <InputRating className="fs-15" />
                        <div className="mt-4 mb-2">Текст отзыва:</div>
                        <textarea rows={5} placeholder="Отзыв"></textarea>
                        <button type="submit" className="btn-5 w-100 mt-4">
                            Отправить
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserPage
