import React from 'react'
import StarRating from './utils/StarRating'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

const LotPreview = (props) => {
    return (
        <tr className="lot-preview">
            <td>{props.platform}</td>
            <td>
                <Link to={`/lot/${props.lotId}`}>{props.description}</Link>
            </td>
            <td>
                <Link to={`/user/${props.userId}`} className="lot-preview-user">
                    <div className="img">
                        <img src={props.avatar} alt="Колесникова Ирина" />
                        <div className="indicator online" />
                    </div>
                    <div>
                        <h5 className="achromat-2 mb-1">{props.fullName}</h5>
                        <div className="achromat-3 mb-1">{`@${props.nickname}`}</div>
                        <StarRating rate={5} className="justify-content-start fs-08" />
                        <div>
                            На&nbsp;сайте с <Moment format={'LL'} date={props.createdAt} />
                        </div>
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
