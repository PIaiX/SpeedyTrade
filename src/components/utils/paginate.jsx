import React from 'react'
import ReactPaginate from 'react-paginate'

const Paginate = (props) => {
    return (
        <nav className="pagination">
            <ReactPaginate
                breakClassName="ellipsis"
                breakLinkClassName="ellipsis"
                activeLinkClassName="active"
                nextClassName="d-none"
                nextLinkClassName="d-none"
                previousClassName="d-none"
                previousLinkClassName="d-none"
                {...props}
            />
        </nav>
    )
}

export default Paginate
