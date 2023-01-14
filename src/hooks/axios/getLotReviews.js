import {useEffect, useState} from 'react'
import {getLotReviews} from '../../services/lots'

const useGetLotsReviews = (lotId, refatch = true) => {
    const [reviews, setReviews] = useState({
        isLoaded: false,
        items: [],
    })

    useEffect(() => {
        userId &&
            getLotReviews(lotId)
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

export default useGetLotsReviews
