import React from 'react'
import {Rating} from 'react-simple-star-rating'
import {useSelector} from 'react-redux'

const StarRating = (props) => {
    const theme = useSelector((state) => state?.theme?.mode)

    return (
        <Rating
            fillColor={theme === 'light' ? '#F05D66' : '#322054'}
            emptyColor={theme === 'light' ? '#cccccc' : '#8e72ff'}
            {...props}
        />
    )
}

export default StarRating
