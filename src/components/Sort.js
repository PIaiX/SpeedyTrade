import React, { useState } from 'react';
import { HiArrowNarrowRight } from "react-icons/hi";

function Sort(props) {
    const [sortFull, setSortFull] = useState(false);

    return (
        <div className='sort'>
            <ul className={(sortFull)?'full':''}>
                <li><button type='button' className='btn-2'>Топ</button></li>
                <li><button type='button' className='btn-2'>0–9</button></li>
                <li><button type='button' className='btn-2'>A</button></li>
                <li><button type='button' className='btn-2'>B</button></li>
                <li><button type='button' className='btn-2'>C</button></li>
                <li><button type='button' className='btn-2'>D</button></li>
                <li><button type='button' className='btn-2'>E</button></li>
                <li><button type='button' className='btn-2'>F</button></li>
                <li><button type='button' className='btn-2'>G</button></li>
                <li><button type='button' className='btn-2'>H</button></li>
                <li><button type='button' className='btn-2'>I</button></li>
                <li><button type='button' className='btn-2'>J</button></li>
                <li><button type='button' className='btn-2'>K</button></li>
                <li><button type='button' className='btn-2'>L</button></li>
                <li><button type='button' className='btn-2'>M</button></li>
                <li><button type='button' className='btn-2'>N</button></li>
                <li><button type='button' className='btn-2'>O</button></li>
                <li><button type='button' className='btn-2'>O</button></li>
                <li><button type='button' className='btn-2'>Q</button></li>
                <li><button type='button' className='btn-2'>R</button></li>
                <li><button type='button' className='btn-2'>S</button></li>
                <li><button type='button' className='btn-2'>T</button></li>
                <li><button type='button' className='btn-2'>U</button></li>
                <li><button type='button' className='btn-2'>V</button></li>
                <li><button type='button' className='btn-2'>W</button></li>
                <li><button type='button' className='btn-2'>X</button></li>
                <li><button type='button' className='btn-2'>Y</button></li>
                <li><button type='button' className='btn-2'>Z</button></li>
                <li><button type='button' className='btn-2'>А</button></li>
                <li><button type='button' className='btn-2'>Б</button></li>
                <li><button type='button' className='btn-2'>В</button></li>
                <li><button type='button' className='btn-2'>Г</button></li>
                <li><button type='button' className='btn-2'>Д</button></li>
                <li><button type='button' className='btn-2'>Е</button></li>
                <li><button type='button' className='btn-2'>Ж</button></li>
                <li><button type='button' className='btn-2'>З</button></li>
                <li><button type='button' className='btn-2'>И</button></li>
                <li><button type='button' className='btn-2'>К</button></li>
                <li><button type='button' className='btn-2'>Л</button></li>
                <li><button type='button' className='btn-2'>М</button></li>
                <li><button type='button' className='btn-2'>Н</button></li>
                <li><button type='button' className='btn-2'>О</button></li>
                <li><button type='button' className='btn-2'>П</button></li>
                <li><button type='button' className='btn-2'>Р</button></li>
                <li><button type='button' className='btn-2'>С</button></li>
                <li><button type='button' className='btn-2'>Т</button></li>
                <li><button type='button' className='btn-2'>У</button></li>
                <li><button type='button' className='btn-2'>Ф</button></li>
                <li><button type='button' className='btn-2'>Х</button></li>
                <li><button type='button' className='btn-2'>Ц</button></li>
                <li><button type='button' className='btn-2'>Ч</button></li>
                <li><button type='button' className='btn-2'>Ш</button></li>
                <li><button type='button' className='btn-2'>Щ</button></li>
                <li><button type='button' className='btn-2'>Э</button></li>
                <li><button type='button' className='btn-2'>Ю</button></li>
                <li><button type='button' className='btn-2'>Я</button></li>
            </ul>
            <hr className='vertical mx-3'/>
            <button type='button' className={(sortFull)?'sort-more less':'sort-more'} onClick={()=>setSortFull((sortFull)?false:true)}>
                <HiArrowNarrowRight />
            </button>
        </div>
    );
}

export default Sort;