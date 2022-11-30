import React, {useState} from 'react'
import {ImStarFull} from 'react-icons/im'

export default function InputRating(props) {
    const [ratingValue, setRatingValue] = useState()
    return (
        <div className={'input-rating ' + props.className}>
            <input type="number" name="ratingValue" value={ratingValue} hidden />
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
