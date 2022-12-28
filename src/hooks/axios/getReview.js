import {useEffect, useState} from 'react'
import {getUserReviews} from '../../services/reviews'

const useGetReview = (userId, refatch = true) => {
    const [reviews, setReviews] = useState({
        isLoaded: false,
        items: [],
    })

    useEffect(() => {
        userId &&
            getUserReviews(userId)
                .then((res) => {
                    setReviews({
                        isLoaded: true,
                        items: res,
                    })
                })
                .catch((err) => {
                    setReviews({
                        isLoaded: false,
                        items: [],
                    })
                })
    }, [userId, refatch])
    return {reviews}
}

export default useGetReview
