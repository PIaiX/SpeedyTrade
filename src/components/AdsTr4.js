import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'
import {FiMoreHorizontal, FiTrash2} from 'react-icons/fi'

const AdsTr4 = () => {
    return (
        <tr>
            <td>839503-24</td>
            <td>
                <Link to="ticket">Не получается совершить покупку</Link>
            </td>
            <td>12:24 20.10.2022</td>
            <td>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <FiMoreHorizontal />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">
                            <FiTrash2 />
                            <span>Удалить запись</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default AdsTr4
