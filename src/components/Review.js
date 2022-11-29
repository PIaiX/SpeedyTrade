import React from 'react'
import {Link} from 'react-router-dom'
import {FiTrash2} from 'react-icons/fi'
import StarRating from './utils/StarRating'

const Review = (props) => {
    return (
        <div className="user-review">
            <div className="img">
                <Link to="/user">
                    <img src="images/user2.png" alt="Владимирская Елена" />
                </Link>
            </div>
            <div className="grid-1">
                <h4 className="color-1">
                    <Link to="/user">Владимирская Елена</Link>
                </h4>
            </div>
            <div className="grid-2">
                <h5>@lenok420</h5>
            </div>
            <div className="grid-3">
                <StarRating rate={3} className="justify-content-start" />
            </div>
            <div className="grid-4">
                <time>29.08.2022</time>
            </div>
            <div className="grid-5">
                <p>{props.text}</p>
            </div>
            {props.myReview && (
                <div className="grid-6">
                    <button type="button">
                        <FiTrash2 className="fs-13" />
                        <span className="ms-2">Удалить</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Review
