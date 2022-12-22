import React, {useCallback, useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import {FiArrowLeft, FiChevronDown, FiHelpCircle} from 'react-icons/fi'
import AdsTr4 from '../../components/AdsTr4'
import {Link} from 'react-router-dom'
import CreateTicketForm from '../../components/forms/CreateTicketForm'
import {getAllTickets} from '../../services/tickets'
import {useSelector} from 'react-redux'
import Skeleton from 'react-loading-skeleton'

const Help = () => {
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [tab, setTab] = useState(0)
    const [tickets, setTickets] = useState({
        isLoaded: false,
        items: [],
    })
    const [refetchFromCreate, setRefetchFromCreate] = useState(true)

    useEffect(() => {
        refetchFromCreate &&
            getAllTickets(userId)
                .then((res) => {
                    setTickets({isLoaded: true, items: res})
                    setRefetchFromCreate(false)
                })
                .catch(() => {
                    setTickets({isLoaded: true, items: null})
                })
                .finally(() => setRefetchFromCreate(false))
    }, [userId, refetchFromCreate])

    const seterRefetch = useCallback((value) => {
        setRefetchFromCreate(value)
    }, [])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Помощь</h4>
            </div>
            <div className="tabs-group mb-4 mb-sm-5">
                <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                    Тикеты
                </button>
                <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                    Центр помощи
                </button>
                <button type="button" className={tab === 2 ? 'active' : ''} onClick={() => setTab(2)}>
                    Правила
                </button>
            </div>

            {tab === 0 && (
                <div>
                    <h6>Создать новый тикет</h6>
                    <div className="achromat-3 d-flex align-items-start">
                        <FiHelpCircle className="fs-13" />
                        <p className="flex-1 ms-3">
                            Если ваш вопрос технического плана, то желательно предоставить как можно более подробную
                            информацию о проблеме. Пожалуйста, опишите, какие действия совершались до возникновения
                            вопроса, а также, по возможности, приложите необходимые скриншоты. Данная информация
                            значительно ускорит время ответа и избавит от лишних вопросов. Спасибо!
                        </p>
                    </div>

                    <CreateTicketForm setRefetch={seterRefetch} />

                    <h6 className="mt-5">Ваши тикеты</h6>
                    {tickets.isLoaded ? (
                        tickets.items?.length > 0 ? (
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Тема</th>
                                        <th>Последнее сообщение</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.items?.map((i) => (
                                        <AdsTr4
                                            key={i.id}
                                            ticketId={i.id}
                                            topic={i.topic}
                                            lastMessage={i?.lastMessage?.text}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <h6>Тикетов нет</h6>
                        )
                    ) : (
                        <Skeleton count={7} baseColor={`#322054`} highlightColor={`#5736db`} height={25} />
                    )}
                </div>
            )}
            {tab === 1 && (
                <div>
                    <h5 className="fw-4">Продажа</h5>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <FiHelpCircle className="me-4" />
                                <span>Как продать?</span>
                                <FiChevronDown className="chevron" />
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <FiHelpCircle className="me-4" />
                                <span>Что делать, если не удалось продать?</span>
                                <FiChevronDown className="chevron" />
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <FiHelpCircle className="me-4" />
                                <span>Самые популярные вопросы, возникающие во время продажи</span>
                                <FiChevronDown className="chevron" />
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <h5 className="fw-4 mt-4 mt-sm-5">Покупка</h5>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <FiHelpCircle className="me-4" />
                                <span>Как купить?</span>
                                <FiChevronDown className="chevron" />
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <FiHelpCircle className="me-4" />
                                <span>Что делать, если не удалось купить?</span>
                                <FiChevronDown className="chevron" />
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <FiHelpCircle className="me-4" />
                                <span>Самые популярные вопросы, возникающие во время покупки</span>
                                <FiChevronDown className="chevron" />
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            )}
            {tab === 2 && (
                <div>
                    <h5 className="color-1">Правила для продавцов</h5>
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>Нарушение</th>
                                <th>Санкции</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Попытка передачи товара или оказания услуги без проведения платежа через FunPay.
                                    Обмен товарами или услугами.{' '}
                                </td>
                                <td>
                                    Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов
                                    нарушителя по мере их обнаружения.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <h5 className="color-1 mt-4 mt-sm-5">Правила для продавцов и покупателей</h5>
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>Нарушение</th>
                                <th>Санкции</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Попытка передачи товара или оказания услуги без проведения платежа через FunPay.
                                    Обмен товарами или услугами.{' '}
                                </td>
                                <td>
                                    Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов
                                    нарушителя по мере их обнаружения.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    При продаже в некоторых разделах сайта система предлагает участникам заказа
                                    перейти в Discord — для этого нужно просто нажать на ссылку. Однако обмен
                                    контактными данными в чате FunPay или в самом Discord (например, добавление друг
                                    друга в друзья) по-прежнему является нарушением.
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <h5 className="color-1 mt-4 mt-sm-5">Ответственность продавцов</h5>
                    <Table striped borderless>
                        <thead>
                            <tr>
                                <th>Игровая валюта и предметы</th>
                                <th>Степень ответственности</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Попытка передачи товара или оказания услуги без проведения платежа через FunPay.
                                    Обмен товарами или услугами.{' '}
                                </td>
                                <td>
                                    Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов
                                    нарушителя по мере их обнаружения.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table striped borderless className="mt-4 mt-sm-4">
                        <thead>
                            <tr>
                                <th>Аккаунты</th>
                                <th>Степень ответственности</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Попытка передачи товара или оказания услуги без проведения платежа через FunPay.
                                    Обмен товарами или услугами.{' '}
                                </td>
                                <td>
                                    Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов
                                    нарушителя по мере их обнаружения.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table striped borderless className="mt-4 mt-sm-4">
                        <thead>
                            <tr>
                                <th>Услуги</th>
                                <th>Степень ответственности</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Попытка передачи товара или оказания услуги без проведения платежа через FunPay.
                                    Обмен товарами или услугами.{' '}
                                </td>
                                <td>
                                    Блокировка всех аккаунтов. Отказ в выплатах. Блокировка всех новых аккаунтов
                                    нарушителя по мере их обнаружения.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                                <td>
                                    Размещение объявлений на других биржах. При этом разрешается размещать объявления
                                    на форумах, продавать в магазины и т. д.
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    При продаже в некоторых разделах сайта система предлагает участникам заказа
                                    перейти в Discord — для этого нужно просто нажать на ссылку. Однако обмен
                                    контактными данными в чате FunPay или в самом Discord (например, добавление друг
                                    друга в друзья) по-прежнему является нарушением.
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <button type="button" className="btn-5 fs-11 mt-4 mt-sm-5">
                        Принять условия
                    </button>
                </div>
            )}
        </div>
    )
}

export default Help
