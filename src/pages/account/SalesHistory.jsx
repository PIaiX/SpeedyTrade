import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import AdsTr3 from '../../components/AdsTr3'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {useSelector} from 'react-redux'
import usePagination from '../../hooks/pagination'
import {getSale} from '../../services/purchases'
import Paginate from '../../components/utils/paginate'

const SalesHistory = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [saleHistory, setSaleHistory] = useState({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const generalLimit = 10

    const { paginationItems, pageCount, selectedPage, handlePageClick } = usePagination(
        saleHistory?.items,
        generalLimit,
        saleHistory?.meta?.total
    )

    useEffect(() => {
        getSale({ page: selectedPage + 1, limit: generalLimit }, userId)
            .then((res) => setSaleHistory({ isLoaded: true, meta: res?.meta, items: res?.data }))
            .catch(() => setSaleHistory({ isLoaded: true, meta: null, items: null }))
    }, [userId, selectedPage])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">История продаж</h4>
            </div>

            {saleHistory.meta?.total > 0 ? (
                <Table borderless responsive className="my-sm-4">
                    <thead>
                        <tr>
                            <>
                                <th>Дата</th>
                                <th>Заказ</th>
                                <th>Описание</th>
                                <th>Покупатель</th>
                                <th>Статус</th>
                                <th>Цена</th>
                                <th></th>
                            </>
                        </tr>
                    </thead>

                    <tbody>
                        {paginationItems?.map((i) => (
                            <AdsTr3
                                key={i?.id}
                                lotId={i?.lotId}
                                status={i?.statusForUser}
                                createdAt={i?.lot?.createdAtForUser}
                                description={i?.lot?.description}
                                userId={i?.user?.id}
                                userNickname={i?.user?.nickname}
                                price={i?.lot?.price}
                                priceCommission={i?.lot?.priceCommission}
                            />
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h6>История пуста</h6>
            )}

            {saleHistory.isLoaded && paginationItems?.length > 0 && (
                <Paginate
                    onPageChange={handlePageClick}
                    forcePage={selectedPage}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                />
            )}
        </div>
    )
}

export default SalesHistory
