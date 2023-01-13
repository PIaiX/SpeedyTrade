import React from 'react'
import StarRating from './utils/StarRating'
import {Link} from 'react-router-dom'
import {getImageURL} from '../helpers/image'

const ReviewBlock = (props) => {
    return (
        <div className="review-block">
            <Link to="/user">
                <img src={getImageURL(props?.avatar)} alt={props?.fullName} />
            </Link>
            <div className="flex-1 ms-2 ms-sm-4">
                <div className="d-sm-flex align-items-center mb-2">
                    <h5 className="achromat-2 mb-0">{props?.fullName}</h5>
                    <span className="achromat-3 ms-sm-3">@{props?.nickname}</span>
                </div>
                <StarRating rate={props?.rating} className="justify-content-start mb-3" />
                {/*<div className="achromat-3 mb-3">Will To Live Online, 15 000 руб.</div>*/}
                <p>{props?.description}</p>
            </div>
        </div>
    )
}

export default ReviewBlock
