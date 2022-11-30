import React from 'react'
import {ImStarEmpty, ImStarFull, ImStarHalf} from 'react-icons/im'

export default function StarRating(props) {
    const arr = [1, 2, 3, 4, 5]
    const num = Number(props.rate)
    const numRound = Math.round(Number(props.rate))
    return (
        <div className={'star-rating ' + props.className}>
            {arr.map((item) => {
                if (item <= num) {
                    return <ImStarFull key={item} />
                } else if (item === numRound) {
                    return <ImStarHalf key={item} />
                } else {
                    return <ImStarEmpty key={item} />
                }
            })}
        </div>
    )
}
