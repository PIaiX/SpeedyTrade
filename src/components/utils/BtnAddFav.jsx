import React, {useState} from 'react'
import {HiBookmark} from 'react-icons/hi'

const BtnAddFav = (props) => {
    const [fav, setFav] = useState(props.add)
    return (
        <button
            type="button"
            onClick={() => setFav(fav ? false : true)}
            className={fav ? 'add-fav active' : 'add-fav'}
        >
            {fav ? (
                <span className="me-1">Добавлено&nbsp;в&nbsp;избранное</span>
            ) : (
                <span className="me-1">Добавить&nbsp;в&nbsp;избранное</span>
            )}
            <HiBookmark className="fs-13" />
        </button>
    )
}

export default BtnAddFav
