import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

import StarRating from '../components/utils/StarRating'
import ReviewBlock from '../components/ReviewBlock'
import useGetLotReviews from '../hooks/axios/getReview'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetOneLot from '../hooks/axios/getOneLot'
import LotChat from '../components/LotChat'
import swal from 'sweetalert'
import { purchaseLot } from '../services/lots'

const optionsPayment = [
    { value: 'balance', label: 'С баланса' },
    { value: 'card', label: 'Банковской картой' },
]

const Lot = () => {
    const nav = useNavigate()
    const userId = useSelector(state => state.auth.user.id)
    const theme = useSelector((state) => state?.theme?.mode)
    const { id } = useParams()
    const { lot } = useGetOneLot(id)
    const { reviews } = useGetLotReviews(lot?.item?.id)
    const [purchaseDto, setPurchaseDto] = useState({
        lotId: Number(id),
        amount: 1,
        // paymentType: 'balance',
    })

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
                                <Col md={3}>Описание:</Col>
                                <Col md={9}>
                                    {lot.isLoaded ? (
                                        <div className="box">
                                            <p>{lot.item?.description}</p>
                                        </div>
                                    ) : null}
                                </Col>
                                <Col md={3}>Способ оплаты:</Col>
                                <Col md={9}>
                                    <Select
                                        name="payment"
                                        placeholder="Выбрать"
                                        classNamePrefix="react-select"
                                        options={optionsPayment}
                                        defaultValue={{ value: 'balance', label: 'С баланса' }}
                                        onChange={(e) => setPurchaseDto({ ...purchaseDto, paymentType: e.value })}
                                    />
                                </Col>
                                <Col md={3}>Количество:</Col>
                                <Col md={3}>
                                    <input
                                        type='number'
                                        defaultValue={1}
                                        name="payment"
                                        placeholder="Выбрать"
                                        onChange={(e) => setPurchaseDto({ ...purchaseDto, amount: e.target.valueAsNumber })}
                                    />
                                </Col>
                                <Col md={3}>Доступно:</Col>
                                <Col md={3}>
                                    <input
                                        type='number'
                                        value={lot.item.amount}
                                        disabled={true}
                                    />
                                </Col>
                                <Col md={4}>
                                    <button
                                        type="button"
                                        className="btn-5 w-100"
                                        onClick={() => {
                                            // if (!purchaseDto.paymentType) return swal('Выберите способ оплаты')
                                            swal({
                                                title: "Хотите приобрести данный лот?",
                                                text: lot.item?.description,
                                                buttons: ['Отмена', 'Да']
                                            })
                                                .then(ok => ok && purchaseLot(purchaseDto))
                                                .then(res => res.status === 200
                                                    ?
                                                    swal({
                                                        title: "Успешно приобретено:",
                                                        text: lot.item?.description,
                                                        icon: "success"
                                                    }).then(() => nav('/account/purchase-history'))
                                                    : console.log(res) //swal('Ошибка', res.message, "error")
                                                )
                                                .catch((error) => console.log(error)) // swal('Ошибка', error.message, "error"))
                                        }}
                                        disabled={!purchaseDto.amount || purchaseDto.amount < 1 || purchaseDto.amount > lot.item.amount}
                                    >
                                        Оплатить {purchaseDto.amount ? (lot.item.priceCommission * purchaseDto.amount).toFixed(2) : '0'}&nbsp;руб.
                                    </button>
                                </Col>
                                <Col md={8}>
                                    <p className="achromat-3">
                                        * Продавец не сможет получить оплату до тех пор, пока вы не подтвердите
                                        выполнение всех его обязательств
                                    </p>
                                </Col>
                            </Row>

                            <Col xs={12} lg={7}>
                                <div className="d-flex align-items-center mt-5 mb-4">
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
                                ) : null}
                            </Col>
                        </Col>
                        <Col xs={12} lg={5}>
                            <div className="message-window">
                                {lot.item.user && lot.item.user.id !== userId && <LotChat lotUser={lot.item.user} />}
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Lot
