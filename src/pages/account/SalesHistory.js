import React from 'react'
import Table from 'react-bootstrap/Table'
import AdsTr3 from '../../components/AdsTr3';
import Pagination from '../../components/Pagination';

const SalesHistory = () => {
    return (
        <div className='main'>
            <h4 className='color-1'>История продаж</h4>

            <Table borderless className='my-4'>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Заказ</th>
                        <th>Описание</th>
                        <th>Покупатель</th>
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

export default SalesHistory;