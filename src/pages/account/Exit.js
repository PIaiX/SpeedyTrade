import React from 'react'
import { Link } from 'react-router-dom'

const Exit = () => {
    return (
        <div className='main'>
            <h4 className='color-1'>Выйти из личного кабинета?</h4>
            <div className='d-flex align-items-center mt-5'>
                <button type='button' className='btn-5'>Выйти</button>
                <Link to='/' className='btn-1 ms-4'>Вернуться на Главную</Link>
            </div>
        </div>
    );
};

export default Exit;