import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'

const Help = () => {
    const [tab, setTab] = useState(0)

    return (
        <div className='main'>
            <h4 className='color-1'>Помощь</h4>
            <div className='tabs-group mb-5'>
                <button type="button" className={(tab===0)?'active':''} onClick={()=>setTab(0)}>Тикеты</button>
                <button type="button" className={(tab===1)?'active':''} onClick={()=>setTab(1)}>Центр помощи</button>
                <button type="button" className={(tab===2)?'active':''} onClick={()=>setTab(2)}>Правила</button>
            </div>

            {
                (tab === 0) &&
                <div>
                    <h6>Создать новый тикет</h6>
                </div>
            }
            {
                (tab === 1) &&
                <div>
                    <h5 className='fw-4'>Продажа</h5>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Как продать?</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Что делать, если не удалось продать?</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Самые популярные вопросы, возникающие во время продажи</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <h5 className='fw-4 mt-5'>Покупка</h5>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Как купить?</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Что делать, если не удалось купить?</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Самые популярные вопросы, возникающие во время покупки</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            }
            {
                (tab === 2) &&
                <div>
                    <h5 className='color-1'>Правила для продавцов</h5>
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>Нарушение</th>
                                <th>Санкции</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Попытка передачи товара или оказания услуги без проведения платежа через FunPay. Обмен товарами или услугами.	</td>
                                <td>Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов нарушителя по мере их обнаружения.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h5 className='color-1 mt-5'>Правила для продавцов и покупателей</h5>
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>Нарушение</th>
                                <th>Санкции</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Попытка передачи товара или оказания услуги без проведения платежа через FunPay. Обмен товарами или услугами.	</td>
                                <td>Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов нарушителя по мере их обнаружения.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>При продаже в некоторых разделах сайта система предлагает участникам заказа перейти в Discord — для этого нужно просто нажать на ссылку. Однако обмен контактными данными в чате FunPay или в самом Discord (например, добавление друг друга в друзья) по-прежнему является нарушением.</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h5 className='color-1 mt-5'>Ответственность продавцов</h5>
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>Игровая валюта и предметы</th>
                                <th>Степень ответственности</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Попытка передачи товара или оказания услуги без проведения платежа через FunPay. Обмен товарами или услугами.	</td>
                                <td>Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов нарушителя по мере их обнаружения.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table striped borderless className='mt-4'>
                        <thead>
                            <tr>
                                <th>Аккаунты</th>
                                <th>Степень ответственности</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Попытка передачи товара или оказания услуги без проведения платежа через FunPay. Обмен товарами или услугами.	</td>
                                <td>Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов нарушителя по мере их обнаружения.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table striped borderless className='mt-4'>
                        <thead>
                            <tr>
                                <th>Услуги</th>
                                <th>Степень ответственности</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Попытка передачи товара или оказания услуги без проведения платежа через FunPay. Обмен товарами или услугами.	</td>
                                <td>Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов нарушителя по мере их обнаружения.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                                <td>Размещение объявлений на других биржах. При этом разрешается размещать объявления на форумах, продавать в магазины и т. д.</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>При продаже в некоторых разделах сайта система предлагает участникам заказа перейти в Discord — для этого нужно просто нажать на ссылку. Однако обмен контактными данными в чате FunPay или в самом Discord (например, добавление друг друга в друзья) по-прежнему является нарушением.</td>
                            </tr>
                        </tbody>
                    </Table>

                    <button type='button' className='btn-5 fs-11 mt-5'>Принять условия</button>
                </div>
            }
        </div>
    );
};

export default Help;