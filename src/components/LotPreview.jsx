import React from 'react'
import {useSelector} from 'react-redux'
import StarRating from './utils/StarRating'
import {Link} from 'react-router-dom'

const timeOnSite = (timeDate) => {
    let date = new Date(timeDate)
    let month = date.toLocaleString('ru-RU', {month: 'long'})
    let year = date.toLocaleString('ru-RU', {year: 'numeric'})
    let string
    if (month.endsWith('ь')) {
        string = month.replace(/ь/i, 'я') + ' ' + year
    } else {
        string = month.concat('а') + ' ' + year
    }
    return string
}

const LotPreview = (props) => {
    const currentUserId = useSelector((state) => state.auth.user.id)

    return (
        <tr className="lot-preview">
            <td>
                <Link to={`/lot/${props.lotId}`}>
                    {props.description.length > 150
                        ? props.description.substring(0, 150) + '...'
                        : props.description}
                </Link>
            </td>
            <td>
                <Link
                    to={props.userId === currentUserId ? '/account/profile' : `/user/${props.userId}`}
                    className="lot-preview-user"
                >
                    <div className="img">
                        <img src={props.avatar ?? '/images/user2.png'} alt={props.fullName} />
                        <div className="indicator online"></div>
                    </div>
                    <div>
                        <h5 className="achromat-2 mb-1">{props.fullName}</h5>
                        <div className="achromat-3 mb-1">@{props.nickname}</div>
                        <StarRating rate={props.rating} className="justify-content-start fs-08" />
                        <div>На&nbsp;сайте с&nbsp;{timeOnSite(props.createdAt)}&nbsp;г</div>
                    </div>
                </Link>
            </td>
            <td>
                <div className="color-1 fw-7">{props.price}&nbsp;руб.</div>
            </td>
        </tr>
    )
}

export default LotPreview
