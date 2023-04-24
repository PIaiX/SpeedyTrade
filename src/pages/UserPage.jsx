import React, { useCallback, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import StarRating from '../components/utils/StarRating'
import InputRating from '../components/utils/InputRating'
import ReviewBlock from '../components/ReviewBlock'
import { VscChromeClose } from 'react-icons/vsc'
import useGetUserInfo from '../hooks/axios/getUserInfo'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getImageURL } from '../helpers/image'
import Moment from 'react-moment'
import { useForm } from 'react-hook-form'
import { getLotsByUserAndGame, getSellerLots } from '../services/lots'
import { createReview, getUserReviewsByFilter } from '../services/reviews'
import { dispatchAlert } from '../helpers/alert'
import ValidateWrapper from '../components/UI/ValidateWrapper'
import { Link } from 'react-router-dom'
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { getAllGamesWhereUserHasLots } from '../services/games'

const UserPage = () => {
    const { id } = useParams()
    const [showReview, setShowReview] = useState(false)
    const currentUser = useSelector((state) => state?.auth?.user)
    const [filterParam, setFilterParam] = useState('init')
    const [refatch, setRefatch] = useState(true)
    const { user } = useGetUserInfo(id)
    const [reviews, setReviews] = useState()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' })
    const [sellerLots, setSellerLots] = useState({
        isLoaded: false,
        items: [],
    })

    const [rating, setRating] = useState(null)
    useEffect(() => {
        getSellerLots(id)
            .then((res) => {
                setSellerLots({ isLoaded: true, items: res?.data })
            })
            .catch(() => { })
    }, [id])

    useEffect(() => {
        if (refatch) {
            setRefatch(false)
        }
    }, [refatch])

    const seterRating = useCallback((value) => {
        setRating(value)
    }, [])

    useEffect(() => {
        getUserReviewsByFilter(id).then(res => {
            if (res) {
                setReviews(res)
            }
        })
        console.log(filterParam)
    }, [filterParam])

    const [showAllGames, setShowAllGames] = useState(false)
    const [games, setGames] = useState()
    useEffect(() => {
        getAllGamesWhereUserHasLots(id)
            .then(res => { setGames(res); res && setActiveGame(res[0].id) })
    }, [])

    const [activeGame, setActiveGame] = useState()
    const [lots, setLots] = useState()
    useEffect(() => {
        activeGame && getLotsByUserAndGame(id, activeGame).then(res => setLots(res.data))
    }, [activeGame])

    const onSubmitCreateReview = (data) => {
        const userId = currentUser.id
        const req = { ...data, rating, userId }
        createReview(req)
            .then(() => {
                setRefatch(true)
                setShowReview(false)
                dispatchAlert('success', 'Отзыв успешно отправлен')
                reset()
            })
            .catch(() => dispatchAlert('danger', 'Произошла ошибка'))
    }

    return (
        <>
            <main>
                <section className="user-page pt-5 mb-6">
                    <Container>
                        <Row className='gx-lg-5'>
                            <Col xs={12} lg={7}>
                                <Row className='mb-4 mb-sm-5'>
                                    <Col xs={12} sm={5}>
                                        {user.isLoaded ? (
                                            <img src={getImageURL(user.item?.avatar)} alt="" className="img" />
                                        ) : null}
                                    </Col>
                                    <Col xs={12} sm={7}>
                                        {user.isLoaded ? (
                                            <>
                                                <h4 className='mb-2'><span className='total-invert'>{user.item?.fullName}</span> - <span className='achromat-3 fw-4'>@{user.item?.nickname}</span></h4>
                                                <div className='achromat-3'>{user.item?.isOnline ? 'Онлайн' : 'Был(а) онлайн ' + user.item?.lastSeenForUser}</div>
                                            </>
                                        ) : null}
                                        {user.isLoaded ? (
                                            <p className="total-invert mt-2">
                                                На сайте с <Moment format={'LL'} date={user.item?.createdAt} />
                                            </p>
                                        ) : null}

                                        <div className="d-flex mt-4 mt-sm-5 text-center">
                                            <div>
                                                <p className='total-invert mb-3'>Рейтинг</p>
                                                {user.isLoaded ? (
                                                    <StarRating rate={user.item?.rating || 0} className="justify-content-start" />
                                                ) : null}
                                            </div>
                                            <div className='ms-4 ms-xl-5'>
                                                <div className="num">
                                                    {user.isLoaded ? (
                                                        user.item?.salesCount
                                                    ) : 0}
                                                </div>
                                                <p className='lh-1 total-invert mt-1'>Завершенных сделок</p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setShowReview(true)}
                                            className="btn-6 mt-4"
                                            disabled={currentUser?.id === +id}
                                        >
                                            Оставить отзыв
                                        </button>
                                    </Col>
                                </Row>

                                <h6>Предложения пользователя</h6>
                                <ul className='list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 g-2 g-sm-3 g-xl-4'>
                                    {games && games.slice(0, showAllGames ? 100 : 3).map(game =>
                                        <li key={'game-' + game.id}>
                                            <button
                                                type='button'
                                                className={`game-btn ${activeGame === game.id ? 'active' : ''}`}
                                                onClick={() => setActiveGame(game.id)}
                                            >
                                                <img src={getImageURL(game.logo)} alt={game.name} />
                                                <h5>{game.name}</h5>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                                <button
                                    type='button'
                                    className='d-flex flex-column align-items-center achromat-3 mx-auto mt-4'
                                    onClick={() => setShowAllGames(!showAllGames)}
                                >
                                    <span>{showAllGames ? 'Скрыть' : 'Показать все'}</span>
                                    {showAllGames ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                                </button>

                                <Table borderless responsive className="mt-4 mt-sm-5">
                                    <thead>
                                        <tr>
                                            <th width="55%">Описание</th>
                                            <th>Количество</th>
                                            <th>Цена</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lots && lots.map(lot =>
                                            <tr className='position-relative' key={'lots-' + lot.id}>
                                                <td><Link className='stretched-link' to={`/lot/${lot.id}`}>{lot.description}</Link></td>
                                                <td>{lot.amount}</td>
                                                <td><div className="color-1 fw-7">{lot.priceCommission}&nbsp;руб.</div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs={12} lg={5}>
                                <div className="d-flex align-items-center mt-5 mt-lg-0 mb-4">
                                    <span>Показать:</span>
                                    <select className="flex-1 ms-4" onChange={(e) => setFilterParam(e.target.value)}>
                                        <option value="init">Все отзывы</option>
                                        <option value="5">5 звезд</option>
                                        <option value="4">4 звезды</option>
                                        <option value="3">3 звезды</option>
                                        <option value="2">2 звезды</option>
                                        <option value="1">1 звезда</option>
                                    </select>
                                </div>
                                {reviews ?
                                    reviews?.map(i =>
                                        <ReviewBlock
                                            key={i.id}
                                            fullName={i.user?.fullName}
                                            avatar={i.user?.avatar}
                                            rating={i.rating}
                                            description={i.text}
                                            nickname={i.user?.nickname}
                                        />)
                                    : <h6>Отзывов нет</h6>
                                }
                            </Col>
                        </Row>

                        {/* <Row className="gy-4 gy-sm-5 gx-4 gx-xxl-5">
                            <Col sm={5} md={4} lg={3}>
                                {user.isLoaded ? (
                                    <img src={getImageURL(user.item?.avatar)} alt="" className="img" />
                                ) : null}
                            </Col>
                            <Col sm={7} md={8} lg={4} xl={3}>
                                {user.isLoaded ? (
                                    <>
                                        <h4>{user.item?.fullName}</h4>
                                        <div className='achromat-3 mb-3'>{user.item?.isOnline ? 'Онлайн' : 'Был(а) онлайн ' + user.item?.lastSeenForUser}</div>
                                    </>
                                ) : null}
                                {user.isLoaded ? (
                                    <StarRating rate={user.item?.rating || 0} className="justify-content-start" />
                                ) : null}
                                {user.isLoaded ? (
                                    <p className="mt-4">
                                        На сайте с <Moment format={'LL'} date={user.item?.createdAt} />
                                    </p>
                                ) : null}
                                {user.isLoaded ? (
                                    <p className="mt-2">
                                        Завершено сделок: <strong>{user.item?.salesCount}</strong>
                                    </p>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => setShowReview(true)}
                                    className="btn-6 mt-4"
                                    disabled={currentUser?.id === +id}
                                >
                                    Оставить отзыв
                                </button>
                            </Col>
                            <Col xs={12} lg={5} xl={6}>
                                <Row className="info g-2 g-sm-4">
                                    <Col xs={5}>Имя:</Col>
                                    <Col xs={7}>
                                        {user.isLoaded ? (
                                            user.item?.firstName
                                        ) : null}
                                    </Col>
                                    <Col xs={5}>Фамилия:</Col>
                                    <Col xs={7}>
                                        {user.isLoaded ? (
                                            user.item?.lastName
                                        ) : null}
                                    </Col>
                                    <Col xs={5}>Ник:</Col>
                                    <Col xs={7}>
                                        {user.isLoaded ? (
                                            `@${user.item?.nickname}`
                                        ) : null}
                                    </Col>
                                    <Col xs={5}>Пол:</Col>
                                    <Col xs={7}>
                                        {user.isLoaded ? (
                                            `${user.item?.sex ? 'Женский' : 'Мужской'}`
                                        ) : null}
                                    </Col>
                                    <Col xs={5}>Дата рождения:</Col>
                                    <Col xs={7}>
                                        {user.isLoaded ? (
                                            user.item?.birthdayForUser
                                        ) : null}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} lg={7}>
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
                                {reviews?
                                    reviews?.map(i=>
                                        <ReviewBlock
                                            key={i.id}
                                            fullName={i.user?.fullName}
                                            avatar={i.user?.avatar}
                                            rating={i.rating}
                                            description={i.text}
                                            nickname={i.user?.nickname}
                                        />)
                                    : <h6>Отзывов нет</h6>
                                }
                            </Col>
                        </Row> */}
                    </Container>
                </section>
            </main>

            <Modal show={showReview} onHide={() => setShowReview(false)}>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="color-1">Оставьте отзыв</h3>
                        <button type="button" onClick={() => setShowReview(false)} className="btn-4 px-3 py-2">
                            <VscChromeClose />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitCreateReview)}>
                        <div className="mb-2">Приобретенный лот:</div>

                        <select
                            style={errors.lotId ? { borderColor: 'red' } : undefined}
                            {...register('lotId', {
                                setValueAs: (v) => parseInt(v),
                                min: {
                                    value: 1,
                                    message: 'Выберите значение',
                                },
                            })}
                        >
                            <option value={'0'}>Нет лотов</option>
                            {sellerLots.items?.length > 0 &&
                                sellerLots.items?.map((i) => (
                                    <option key={i.id} value={i.lotId}>
                                        {i.lot.description}
                                    </option>
                                ))}
                        </select>
                        {errors.lotId && <p style={{ fontSize: '0.8em', color: 'red' }}>{errors.lotId.message}</p>}

                        <div className="mt-4 mb-2">Ваша оценка:</div>
                        <InputRating className="fs-15" seterRating={seterRating} />
                        <div className="mt-4 mb-2">Текст отзыва:</div>
                        <ValidateWrapper error={errors?.text}>
                            <textarea
                                rows={5}
                                placeholder="Отзыв"
                                {...register('text', { required: 'Заполните поле' })}
                            />
                        </ValidateWrapper>
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
