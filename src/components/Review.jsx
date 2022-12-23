import React from 'react'
import {Link} from 'react-router-dom'
import {FiTrash2} from 'react-icons/fi'
import StarRating from './utils/StarRating'
import {getImageURL} from '../helpers/image'
import {useSelector} from 'react-redux'

const Review = (props) => {
    const userId = useSelector((state) => state?.auth?.user?.id)

    return (
        <div className="user-review">
            <div className="img">
                <Link to={+props?.userId === userId ? '/account/profile' : `/user/${props?.userId}`}>
                    <img src={getImageURL(props?.avatar)} alt="Владимирская Елена" />
                </Link>
            </div>
            <div className="grid-1">
                <h4 className="color-1">
                    <Link to={+props?.userId === userId ? '/account/profile' : `/user/${props?.userId}`}>
                        {props?.fullName}
                    </Link>
                </h4>
            </div>
            <div className="grid-2">
                <h5>@{props?.nickname}</h5>
            </div>
            <div className="grid-3">
                <StarRating rate={props?.rating} className="justify-content-start" />
            </div>
            <div className="grid-4">
                <time>{props?.created}</time>
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
