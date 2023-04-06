import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import AdsTr3 from '../../components/AdsTr3'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { getPurchases } from '../../services/purchases'
import { useSelector } from 'react-redux'
import Paginate from '../../components/utils/paginate'
import usePagination from '../../hooks/pagination'

const PurchaseHistory = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [purchase, setPurchase] = useState({
        isLoaded: false,
        items: null,
        meta: null,
    })
    const generalLimit = 10

    const { paginationItems, pageCount, selectedPage, setSelectedPage, handlePageClick } = usePagination(
        purchase?.items,
        generalLimit,
        purchase?.meta?.total
    )

    useEffect(() => {
        getPurchases({ page: selectedPage + 1, limit: generalLimit }, userId)
            .then((res) => setPurchase({ isLoaded: true, meta: res?.meta, items: res?.data }))
            .catch(() => setPurchase({ isLoaded: true, meta: null, items: null }))
    }, [userId, selectedPage])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 py-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">История покупок</h4>
            </div>

            {purchase.meta?.total > 0 ? (
                <Table borderless responsive className="my-sm-4">
                    <thead>
                        <tr>
                            <>
                                <th>Дата</th>
                                <th>Заказ</th>
                                <th>Описание</th>
                                <th>Продавец</th>
                                <th>Статус</th>
                                <th>Стоимость</th>
                                <th></th>
                            </>
                        </tr>
                    </thead>

                    <tbody>
                        {paginationItems?.map((i) => (
                            <AdsTr3
                                key={i?.id}
                                purchaseId={i?.id}
                                lotId={i?.lotId}
                                status={i?.statusForUser}
                                createdAt={i?.lot?.createdAtForUser}
                                description={i?.lot?.description}
                                userNickname={i?.lot?.user.nickname}
                                price={i?.lot?.priceCommission * i?.amount}
                                priceCommission={i?.lot?.priceCommission}
                            />
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h6>История пуста</h6>
            )}

            {purchase.isLoaded && paginationItems?.length > 0 && (
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

export default PurchaseHistory
