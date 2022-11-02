import React from 'react'
import StarRating from './utils/StarRating'
import { Link } from 'react-router-dom'

const ReviewBlock = () => {
    return (
        <div className='review-block'>
            <Link to='/user'>
            <img src='imgs/user2.png' alt='Владимирская Елена'/>
            </Link>
            <div className='flex-1 ms-2 ms-sm-4'>
                <div className='d-sm-flex align-items-center mb-2'>
                    <h5 className='achromat-2 mb-0'>Колесникова Ирина</h5>
                    <span className='achromat-3 ms-sm-3'>@Irishka1911</span>
                </div>
                <StarRating rate={3.8} className='justify-content-start mb-3'/>
                <div className='achromat-3 mb-3'>Will To Live Online, 15 000 руб.</div>
                <p>Отличный продавец! Выдал сочный аккаунт со всеми данными и секретным кодом. Рекомендую))</p>
            </div>
        </div>
    );
};

export default ReviewBlock;