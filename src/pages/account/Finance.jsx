import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { getBalanceOperations } from '../../services/balance'
import Pagination from '../../components/Pagination'

const Finance = () => {
    const [tab, setTab] = useState(0)
    const [sum, setSum] = useState(0)
    const [card, setCard] = useState()
    const [showAdd, setShowAdd] = useState(false)
    const [operations, setOperations] = useState()
    const [currentPage, setCurrentPage] = useState("/?page=1")

    useEffect(() => {
        tab === 1 &&
            getBalanceOperations(currentPage)
                .then(res => setOperations(res))

    }, [tab])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Финансы</h4>
            </div>
            <div className="tabs-group mb-4 mb-sm-5">
                <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                    Баланс
                </button>
                <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                    История списаний и пополнений
                </button>
            </div>

            {tab === 0 ? (
                <form>
                    <fieldset>
                        <legend>Сумма пополнения:</legend>
                        <div className="d-flex align-items-center">
                            <div className="me-4">Пополнить на сумму:</div>
                            <input
                                type="number"
                                placeholder="0"
                                value={sum}
                                onChange={(e) => setSum(e.target.value)}
                            />
                            <div className="ms-3">руб.</div>
                        </div>
                        <div className="d-flex flex-wrap mt-3 mt-sm-4 mb-4 mb-sm-5">
                            <button
                                type="button"
                                onClick={() => setSum(500)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                500
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(1000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                1 000
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(1500)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                1 500
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(2000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                2 000
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(3000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                3 000
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(5000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                5 000
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(10000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                10 000
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(15000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                15 000
                            </button>
                            <button
                                type="button"
                                onClick={() => setSum(20000)}
                                className="btn-6 py-2 me-2 me-sm-3 mb-2"
                            >
                                20 000
                            </button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Способ оплаты:</legend>
                        <ul className="cards-list">
                            <li className={card === 0 ? 'bank-card active' : 'bank-card'} onClick={() => setCard(0)}>
                                <img src="/images/bank/тинькофф.png" alt="тинькофф" className="bank-img" />
                                <div className="info">
                                    <img src="/images/bank/mastercard.png" alt="mastercard" className="bank-type" />
                                    <div className="number">** 8765</div>
                                </div>
                            </li>
                            <li className={card === 1 ? 'bank-card active' : 'bank-card'} onClick={() => setCard(1)}>
                                <img src="/images/bank/sber.png" alt="sber" className="bank-img" />
                                <div className="info">
                                    <img src="images/bank/visa.png" alt="visa" className="bank-type" />
                                    <div className="number">** 8765</div>
                                </div>
                            </li>
                            <li className="add-card" onClick={() => setShowAdd(showAdd ? false : true)}>
                                <img src="/images/bank/card-replacement.png" alt="card" />
                                <div>Добавить новую карту</div>
                            </li>
                        </ul>
                        {showAdd && (
                            <div className="card-imitation">
                                <div className="front">
                                    <div className="mb-1 mb-md-2">Номер карты:</div>
                                    <input
                                        type="number"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-100 mb-3 mb-md-4"
                                    />
                                    <div className="mb-1 mb-md-2">Действует до:</div>
                                    <div className="d-flex align-items-center">
                                        <input type="number" placeholder="ММ" />
                                        <span className="mx-2">/</span>
                                        <input type="number" placeholder="ГГ" />
                                    </div>
                                    <img src="/images/bank/visa.png" alt="visa" className="bank-type" />
                                </div>
                                <div className="back">
                                    <div className="mb-2">CVV/CVC:</div>
                                    <input type="number" placeholder="000" />
                                    <div className="fs-08 mt-1">три цифры с обратной стороны карты</div>
                                </div>
                            </div>
                        )}
                    </fieldset>

                    <label className="mt-4 mt-sm-5">
                        <input type="checkbox" />
                        <span>
                            Запомнить карту. Сохраняя карту, вы соглашаетесь с{' '}
                            <a href="/" className="color-4 text-decoration-underline">
                                условиями привязки карты
                            </a>
                        </span>
                    </label>
                    <div className='d-flex gap-3'>
                        <button type="button" disabled={true} className="btn-5 mt-4 mt-sm-5">
                            Оплатить {sum} руб.
                        </button>
                        <button type="button" disabled={true} className="btn-5 mt-4 mt-sm-5">
                            Вывод средств
                        </button>
                    </div>
                </form>
            ) : (
                <div className='d-flex flex-column h-100'>
                    <h6>Ваши списания и пополнения:</h6>
                    <Table striped borderless className="my-3 my-sm-4 h-100">
                        <tbody>
                            {operations?.data.map(operation =>
                                <tr key={operation.id}>
                                    <td>{operation.type === "sale" ? 'Пополнение' : 'Списание'} {operation.createdAtForUser} г.</td>
                                    <td className="text-end fw-7">{operation.price} руб.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination
                        meta={operations?.meta}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    )
}

export default Finance
