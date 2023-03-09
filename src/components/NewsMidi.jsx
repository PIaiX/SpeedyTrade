import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";

const NewsMidi = () => {
  return (
    <article className='news-midi'>
      <div className='text'>
        <h3>Название новости</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam fermentum viverra euismod. Semper dui dui, eros, viverra vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam fermentum viverra euismod.</p>
        <time>22 Июня, 2022</time>
        <Link to='/news/111' className='stretched-link'>
          <span>Читать далее</span>
          <FiArrowRight/>
        </Link>
      </div>
      <img src="/images/avatar.jpg" alt="Название новости" />
    </article>
  );
};

export default NewsMidi;