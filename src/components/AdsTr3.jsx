import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiEdit, BiTrash} from 'react-icons/bi'
import InputRating from './utils/InputRating'

const AdsTr3 = (props) => {
    return (
        <tr>
            <td>{props?.createdAt}</td>
            <td>{props?.lotId}</td>
            <td>{props?.description}</td>
            <td>{props?.lotId}</td>
            <td>{props?.status}</td>
            <td>{props?.price} руб.</td>
        </tr>
    )
}

export default AdsTr3
