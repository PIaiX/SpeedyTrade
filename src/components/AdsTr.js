import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiTrash, BiEdit} from 'react-icons/bi'

const AdsTr = (props) => {
    return (
        <tr>
            <td>{props.game}</td>
            <td>{props.platform}</td>
            <td>{props.description}</td>
            <td>{props.price}&nbsp;руб.</td>
            <td>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <IoEllipsisHorizontal />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">
                            <BiEdit />
                            <span>Редактировать</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <BiTrash />
                            <span>Удалить запись</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default AdsTr
