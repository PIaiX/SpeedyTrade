import React, { useState } from 'react'
import { submitPurchase } from '../services/lots'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { BiHelpCircle, BiLike } from 'react-icons/bi'

const AdsTr3 = (props) => {

    const [status, setStatus] = useState(props?.status)

    const handler = () => {
        submitPurchase(props?.purchaseId)
            .then(res => setStatus(res.body.statusForUser))
    }

    return (
        <tr>
            <td>{props?.createdAt}</td>
            <td>{props?.purchaseId}</td>
            <td>{props?.description}</td>
            <td>{props?.userNickname}</td>
            <td>{status}</td>
            <td>{props?.price} руб.</td>
            <td>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <IoEllipsisHorizontal />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">
                            <BiLike />
                            <div onClick={handler}>Подтвердить</div>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <BiHelpCircle />
                            <div>Запросить помощ</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default AdsTr3
