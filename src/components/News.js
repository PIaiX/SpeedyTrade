import React from 'react';

function News(props) {
    return (
        <article className='news'>
            <img src='imgs/avatar.jpg' alt='picture'/>
            <div>
                <h5>Релиз Valkyrie Profile: Lenneth отложили в последнюю минуту</h5>
                <p>Последние новости из мира компьютерных, консольных и мобильных игр, фильмов и сериалов, высоких технологий и киберспорта</p>
                <div className='d-flex align-items-center mt-3'>
                    <span>24 сен. 22</span>
                    <span className='px-3 accent'>&#8226;</span>
                    <span>5 мин. чтения</span>
                </div>
            </div>
        </article>
    );
}

export default News;