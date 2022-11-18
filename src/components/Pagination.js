import React from 'react'
import {IoEllipsisHorizontal} from 'react-icons/io5'

const Pagination = () => {
    return (
        <nav className="pagination">
            <ul>
                <li>
                    <a href="/" className="active">
                        1
                    </a>
                </li>
                <li>
                    <button>2</button>
                </li>
                <li className="ellipsis">
                    <IoEllipsisHorizontal />
                </li>
                <li>
                    <button>10</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
