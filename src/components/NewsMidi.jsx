import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from "react-icons/fi"
import { getImageURL } from '../helpers/image'

const NewsMidi = ({ news }) => {

  function createMarkup() {
    return { __html: news.description };
  }

  return (
    <article className='news-midi'>
      <div className='text'>
        <h3>{news.title}</h3>
        <p dangerouslySetInnerHTML={createMarkup()}></p>
        <time>{new Date(news.createdAt).toLocaleDateString('ru', { dateStyle: 'full' })}</time>
        <Link to={`/news/${news.slug}`} className='stretched-link'>
          <span>Читать далее</span>
          <FiArrowRight />
        </Link>
      </div>
      <img src={getImageURL(news.image)} alt={news.title} />
    </article>
  );
};

export default NewsMidi