import React, {useEffect, useState} from 'react'
import {ImStarFull} from 'react-icons/im'

export default function InputRating(props) {
    const {rating} = props
    const [ratingValue, setRatingValue] = useState(rating?rating:1)

    useEffect(() => {
        ratingValue && props.seterRating && props.seterRating(ratingValue)
    }, [props.seterRating, ratingValue])

    return (
        <div className={'input-rating ' + props.className}>
            <div className="stars">
                <button
                    type="button"
                    onClick={() => setRatingValue(5)}
                    className={ratingValue === 5 ? 'active' : ''}
                >
                    <ImStarFull />
                </button>
                <button
                    type="button"
                    onClick={() => setRatingValue(4)}
                    className={ratingValue === 4 ? 'active' : ''}
                >
                    <ImStarFull />
                </button>
                <button
                    type="button"
                    onClick={() => setRatingValue(3)}
                    className={ratingValue === 3 ? 'active' : ''}
                >
                    <ImStarFull />
                </button>
                <button
                    type="button"
                    onClick={() => setRatingValue(2)}
                    className={ratingValue === 2 ? 'active' : ''}
                >
                    <ImStarFull />
                </button>
                <button
                    type="button"
                    onClick={() => setRatingValue(1)}
                    className={ratingValue === 1 ? 'active' : ''}
                >
                    <ImStarFull />
                </button>
            </div>
        </div>
    )
}
