import {useEffect, useState} from 'react'
import {getMyReviews} from '../services/reviews'

const useGetMyReview = (userId) => {
    const [myReviews, setMyReviews] = useState({
        isLoaded: false,
        items: [],
    })

    useEffect(() => {
        getMyReviews(userId)
            .then((res) => setMyReviews({isLoaded: true, items: res}))
            .catch(() => setMyReviews({isLoaded: true, items: []}))
    }, [])

    return {myReviews}
}

export default useGetMyReview
