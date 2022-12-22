import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link, NavLink} from 'react-router-dom'
import {FiMoreHorizontal, FiTrash2} from 'react-icons/fi'

const AdsTr4 = ({ticketId, lastMessage, topic}) => {
    return (
        <tr>
            <td>{ticketId}</td>
            <td>
                <NavLink to={`ticket/${ticketId}`}>{topic}</NavLink>
            </td>
            <td>
                <NavLink to={`ticket/${ticketId}`}>{lastMessage}</NavLink>
            </td>
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
