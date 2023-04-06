import React from 'react'
import { getImageURL } from '../helpers/image'
import Moment from 'react-moment'
import 'moment/locale/ru'
import { Link } from 'react-router-dom'

const News = (props) => {
    return (
        <article className="news">
            <Link to={`/news/${props?.slug}`}>
                <img src={getImageURL(props?.image)} alt={props?.title || ''} />
            </Link>
            <div>
                <Link to={`/news/${props?.slug}`}>
                    <h5>{props?.title}</h5>
                </Link>
                <p>{props?.suptitle}</p>
                <div className="d-flex align-items-center mt-3">
                    <span>
                        <Moment locale="ru" format="DD MMMM" date={props?.createdAt} />
                    </span>
                    <span className="px-3 accent">&#8226;</span>
                    <span>{props?.readingTimeFrom} мин. чтения</span>
                </div>
            </div>
        </article>
    )
}

export default News
