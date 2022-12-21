import React from 'react'
import {IoPersonCircle} from 'react-icons/io5'
import {BiImageAdd, BiTrash} from 'react-icons/bi'

const UserPhoto = ({imgUrl, name, onChange, onDelete}) => {
    return (
        <div className="user-photo">
            {imgUrl ? <img src={imgUrl} alt={name} /> : <IoPersonCircle className="replacement" />}
            <div className="btns">
                <button type="button" onClick={onDelete}>
                    <BiTrash className="fs-15" />
                    <span className="user-photo_remove ms-1">Удалить фото</span>
                </button>
                <button type="button" className="user-photo_upload mt-3">
                    <input
                        type="file"
                        onChange={onChange}
                        onClick={(e) => {
                            const element = e.target
                            element.value = ''
                        }}
                    />
                    <BiImageAdd className="fs-15" />
                    <span className="ms-1">Загрузить фото</span>
                </button>
            </div>
        </div>
    )
}

export default UserPhoto
