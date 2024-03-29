import React, { useCallback, useEffect, useState } from 'react'
import StarRating from '../../components/utils/StarRating'
import Review from '../../components/Review'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import useGetReview from '../../hooks/axios/getReview'
import { useSelector } from 'react-redux'
import { getMyReviews } from '../../services/reviews'

const Reviews = () => {
    const user = useSelector((state) => state?.auth?.user)
    const [tab, setTab] = useState(0)
    const theme = useSelector((state) => state?.theme?.mode)
    const { reviews } = useGetReview(user?.id)
    const [myReviews, setMyReviews] = useState({
        isLoaded: false,
        items: [],
    })

    useEffect(() => {
        getMyReviews(user?.id)
            .then((res) => setMyReviews({ isLoaded: true, items: res }))
            .catch(() => setMyReviews({ isLoaded: true, items: [] }))
    }, [user?.id])

    const refetch = useCallback(() => {
        getMyReviews(user?.id)
            .then((res) => setMyReviews({ isLoaded: true, items: res }))
            .catch(() => setMyReviews({ isLoaded: true, items: [] }))
    }, [user?.id])

    return (
        <div className="main">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                        <FiArrowLeft className="fs-15" />
                    </Link>
                    <h4 className="color-1 mb-0">Отзывы</h4>
                </div>
                <div className="d-flex align-items-center mt-3 mt-sm-0">
                    <span className="me-4">Ваш рейтинг:</span>
                    <StarRating rate={user?.rating} />
                </div>
            </div>

            <div className="tabs-group">
                <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                    Отзывы на меня
                </button>
                <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                    Мои отзывы
                </button>
            </div>

            {tab === 0 ? (
                <div>
                    {reviews?.items?.length > 0 ? (
                        reviews.items?.map((i) => (
                            <Review
                                key={i.id}
                                myReview={false}
                                text={i.text}
                                avatar={i.user?.avatar}
                                fullName={i.user?.fullName}
                                nickname={i.user?.nickname}
                                rating={i.rating}
                                created={i.createdAtForUser}
                                userId={i.userId}
                            />
                        ))
                    ) : (
                        <h6>Отзывов нет</h6>
                    )}
                </div>
            ) : (
                <div>
                    {myReviews.items?.length > 0 ? (
                        myReviews.items?.map((i) => (
                            <Review
                                reviewId={i.id}
                                key={i.id}
                                myReview={true}
                                text={i.text}
                                avatar={i.user?.avatar}
                                fullName={i.user?.fullName}
                                nickname={i.user?.nickname}
                                rating={i.rating}
                                created={i.createdAtForUser}
                                userId={i.userId}
                                seterRefetch={refetch}
                            />
                        ))
                    ) : (
                        <h6>Отзывов нет</h6>
                    )}
                </div>
            )}
        </div>
    )
}

export default Reviews
