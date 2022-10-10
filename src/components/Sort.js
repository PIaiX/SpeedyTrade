import React, {useState} from 'react';
import { HiArrowNarrowRight } from "react-icons/hi";

function Sort(props) {
    const [sortFull, setSortFull] = useState(false);

    return (
        <div className='sort'>
            <ul className={(sortFull)?'full':''}>
                <li><button type='button' className='btn-3'>Топ</button></li>
                <li><button type='button' className='btn-3'>0–9</button></li>
                <li><button type='button' className='btn-3'>A</button></li>
                <li><button type='button' className='btn-3'>B</button></li>
                <li><button type='button' className='btn-3'>C</button></li>
                <li><button type='button' className='btn-3'>D</button></li>
                <li><button type='button' className='btn-3'>E</button></li>
                <li><button type='button' className='btn-3'>F</button></li>
                <li><button type='button' className='btn-3'>G</button></li>
                <li><button type='button' className='btn-3'>H</button></li>
                <li><button type='button' className='btn-3'>I</button></li>
                <li><button type='button' className='btn-3'>J</button></li>
                <li><button type='button' className='btn-3'>K</button></li>
                <li><button type='button' className='btn-3'>L</button></li>
                <li><button type='button' className='btn-3'>M</button></li>
                <li><button type='button' className='btn-3'>N</button></li>
                <li><button type='button' className='btn-3'>O</button></li>
                <li><button type='button' className='btn-3'>O</button></li>
                <li><button type='button' className='btn-3'>Q</button></li>
                <li><button type='button' className='btn-3'>R</button></li>
                <li><button type='button' className='btn-3'>S</button></li>
                <li><button type='button' className='btn-3'>T</button></li>
                <li><button type='button' className='btn-3'>U</button></li>
                <li><button type='button' className='btn-3'>V</button></li>
                <li><button type='button' className='btn-3'>W</button></li>
                <li><button type='button' className='btn-3'>X</button></li>
                <li><button type='button' className='btn-3'>Y</button></li>
                <li><button type='button' className='btn-3'>Z</button></li>
                <li><button type='button' className='btn-3'>А</button></li>
                <li><button type='button' className='btn-3'>Б</button></li>
                <li><button type='button' className='btn-3'>В</button></li>
                <li><button type='button' className='btn-3'>Г</button></li>
                <li><button type='button' className='btn-3'>Д</button></li>
                <li><button type='button' className='btn-3'>Е</button></li>
                <li><button type='button' className='btn-3'>Ж</button></li>
                <li><button type='button' className='btn-3'>З</button></li>
                <li><button type='button' className='btn-3'>И</button></li>
                <li><button type='button' className='btn-3'>К</button></li>
                <li><button type='button' className='btn-3'>Л</button></li>
                <li><button type='button' className='btn-3'>М</button></li>
                <li><button type='button' className='btn-3'>Н</button></li>
                <li><button type='button' className='btn-3'>О</button></li>
                <li><button type='button' className='btn-3'>П</button></li>
                <li><button type='button' className='btn-3'>Р</button></li>
                <li><button type='button' className='btn-3'>С</button></li>
                <li><button type='button' className='btn-3'>Т</button></li>
                <li><button type='button' className='btn-3'>У</button></li>
                <li><button type='button' className='btn-3'>Ф</button></li>
                <li><button type='button' className='btn-3'>Х</button></li>
                <li><button type='button' className='btn-3'>Ц</button></li>
                <li><button type='button' className='btn-3'>Ч</button></li>
                <li><button type='button' className='btn-3'>Ш</button></li>
                <li><button type='button' className='btn-3'>Щ</button></li>
                <li><button type='button' className='btn-3'>Э</button></li>
                <li><button type='button' className='btn-3'>Ю</button></li>
                <li><button type='button' className='btn-3'>Я</button></li>
            </ul>
            <hr className='vertical mx-3'/>
            <button type='button' className={(sortFull)?'sort-more less':'sort-more'} onClick={()=>setSortFull((sortFull)?false:true)}>
                <HiArrowNarrowRight />
            </button>
        </div>
    );
}

export default Sort;