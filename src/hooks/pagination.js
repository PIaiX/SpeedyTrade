import {useEffect, useState} from 'react'

const usePagination = (items, limit, total, currPage) => {
    const [paginationItems, setPaginationItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [selectedPage, setSelectedPage] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + limit

        setPaginationItems(items?.slice(itemOffset, endOffset))
        if ((total && limit) || (total === 0 && limit)) {
            setPageCount(Math.ceil(total / limit))
        }
    }, [itemOffset, limit, items, total])

    const handlePageClick = ({selected}) => {
        const newOffset = (selected * limit) % items?.length
        setSelectedPage(selected)
        setItemOffset(newOffset)
    }

    return {pageCount, paginationItems, selectedPage, setSelectedPage, handlePageClick}
}

export default usePagination
