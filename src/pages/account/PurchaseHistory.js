import React from 'react'
import Table from 'react-bootstrap/Table'
import AdsTr3 from '../../components/AdsTr3'
import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi"

const PurchaseHistory = () => {
    return (
        <div className='main'>
            <div className='d-flex align-items-center mb-4'>
                <Link to='/account' className='btn-1 py-2 me-4 d-lg-none'><FiArrowLeft className='fs-15'/></Link>
                <h4 className='color-1 mb-0'>История покупок</h4>
            </div>

            <Table borderless responsive className='my-sm-4'>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Заказ</th>
                        <th>Описание</th>
                        <th>Продавец</th>
                        <th>Статус</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                    <AdsTr3 />
                </tbody>
            </Table>
            <Pagination />
        </div>
    );
};

export default PurchaseHistory;