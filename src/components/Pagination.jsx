import React from 'react'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const Pagination = ({ meta, setCurrentPage }) => {

    return (
        <nav className="pagination">
            <ul>
                {meta?.firstPage !== meta?.currentPage && meta?.firstPage !== (meta?.currentPage - 1) &&
                    <li>
                        <button onClick={() => setCurrentPage(meta?.firstPageUrl)}>{meta?.firstPage}</button>
                    </li>}

                {meta?.currentPage - meta?.firstPage > 2 &&
                    <li className="ellipsis">
                        <IoEllipsisHorizontal />
                    </li>}

                {meta?.previousPageUrl && meta?.previousPageUrl !== meta?.firstPage &&
                    <li>
                        <button onClick={() => setCurrentPage(meta?.previousPageUrl)}>{meta?.currentPage - 1}</button>
                    </li>}

                <li>
                    <button className='active' disabled>{meta?.currentPage}</button>
                </li>

                {meta?.nextPageUrl && meta?.nextPageUrl !== meta?.lastPageUrl &&
                    <li>
                        <button onClick={() => setCurrentPage(meta?.nextPageUrl)}>{meta?.currentPage + 1}</button>
                    </li>}


                {meta?.lastPage - meta?.currentPage > 2 &&
                    <li className="ellipsis">
                        <IoEllipsisHorizontal />
                    </li>}

                {meta?.lastPage !== meta?.currentPage &&
                    < li >
                        <button onClick={() => setCurrentPage(meta?.lastPageUrl)}>{meta?.lastPage}</button>
                    </li>}
            </ul>
        </nav >
    )
}

export default Pagination
