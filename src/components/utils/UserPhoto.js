import React from 'react'
import {IoPersonCircle} from 'react-icons/io5'
import {BiTrash, BiImageAdd} from 'react-icons/bi'

const UserPhoto = (props) => {
    return (
        <div className="user-photo">
            {props.imgUrl ? <img src={props.imgUrl} alt={props.name} /> : <IoPersonCircle className="replacement" />}
            <div className="btns">
                <button type="button">
                    <BiTrash className="fs-15" />
                    <span className="ms-1">Удалить фото</span>
                </button>
                <button type="button" className="mt-3">
                    <BiImageAdd className="fs-15" />
                    <span className="ms-1">Загрузить фото</span>
                </button>
            </div>
        </div>
    )
}

export default UserPhoto
