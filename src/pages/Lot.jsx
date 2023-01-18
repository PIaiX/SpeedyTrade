import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

import StarRating from '../components/utils/StarRating'
import ReviewBlock from '../components/ReviewBlock'
import Skeleton from 'react-loading-skeleton'
import useGetLotReviews from '../hooks/axios/getReview'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import useGetOneLot from '../hooks/axios/getOneLot'
import LotChat from '../components/LotChat'

const optionsPayment = [
    {value: '1', label: 'Тип оплаты 1'},
    {value: '2', label: 'Тип оплаты 2'},
    {value: '3', label: 'Тип оплаты 3'},
]

const Lot = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const {id} = useParams()
    const {lot} = useGetOneLot(id)
    const {reviews} = useGetLotReviews(lot?.item?.id)

    const [filterParam, setFilterParam] = useState('init')

    const filtredReviews = () => {
        if (filterParam === 'init') {
            return reviews.items
        } else {
            return reviews.items?.filter((i) => i.rating === +filterParam)
        }
    }

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
                                    {lot.isLoaded ? (
                                        <div className="box">
                                            <p>{lot.item?.platform?.name}</p>
                                        </div>
                                    ) : (
                                        <Skeleton
                                            baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                            highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    )}
                                </Col>
                                <Col md={3}>Описание:</Col>
                                <Col md={9}>
                                    {lot.isLoaded ? (
                                        <div className="box">
                                            <p>{lot.item?.description}</p>
                                        </div>
                                    ) : (
                                        <Skeleton
                                            baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                            highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    )}
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
                                        выполнение всех его обязательств
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} lg={5}>
                            <div className="message-window">
                                <LotChat />
                            </div>
                        </Col>
                        <Col xs={12} lg={7}>
                            <div className="d-flex align-items-center mb-4">
                                <h3 className="me-4">Рейтинг продавца</h3>
                                <StarRating rate={lot.item?.user?.rating} />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <span>Показать:</span>
                                <select className="w-50 ms-4" onChange={(e) => setFilterParam(e.target.value)}>
                                    <option value="init">Все отзывы</option>
                                    <option value="5">5 звезд</option>
                                    <option value="4">4 звезды</option>
                                    <option value="3">3 звезды</option>
                                    <option value="2">2 звезды</option>
                                    <option value="1">1 звезда</option>
                                </select>
                            </div>
                            {reviews.isLoaded ? (
                                filtredReviews().length > 0 ? (
                                    filtredReviews().map((i) => (
                                        <ReviewBlock
                                            key={i.id}
                                            fullName={i.user?.fullName}
                                            userId={i.user?.id}
                                            avatar={i.user?.avatar}
                                            rating={i.rating}
                                            description={i.text}
                                            nickname={i.user?.nickname}
                                        />
                                    ))
                                ) : (
                                    <h6>Отзывов нет</h6>
                                )
                            ) : (
                                <Skeleton
                                    count={1}
                                    baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                    highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                    width={'100%'}
                                    height={'200px'}
                                />
                            )}
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Lot
