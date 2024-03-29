import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { BiEdit, BiTrash, BiShow } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { getUserLots } from '../../services/lots'
import { getAllGamesWhereIHaveLots } from '../../services/games'
import Pagination from '../../components/Pagination'

const MyAds = () => {
    const [userLots, setUserLots] = useState([])
    const [currentPage, setCurrentPage] = useState('/?page=1')
    const [perPage, setPerPage] = useState(6)
    const [games, setGames] = useState([])
    const [filterGame, setFilterGame] = useState('')
    const userId = useSelector((state) => state.auth.user.id)

    useEffect(() => {
        getAllGamesWhereIHaveLots().then((arr) => arr && setGames(arr))
    }, [])

    useEffect(() => {
        setCurrentPage('/?page=1')
    }, [filterGame])

    useEffect(() => {
        currentPage && getUserLots(userId, currentPage, perPage, filterGame, '').then((arr) => {
            setUserLots(arr)
        })
    }, [currentPage, filterGame])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Мои объявления</h4>
            </div>
            <Link to="new" className="btn-5">
                + Разместить новое объявление
            </Link>

            {/* ---------------- Filters --------------------------------------------------------------------------- */}
            <Row xs={1} sm={3} className="gy-3 gy-sm-0 gx-3 gx-md-4 mt-4">
                <Col className="d-xl-flex align-items-center">
                    <span className="me-3">Игра:</span>
                    <select defaultValue={0} onChange={(e) => setFilterGame(e.target.value)}>
                        <option value={''}>Все игры</option>
                        {games?.map((game) => (
                            <option value={game?.id} key={game?.id}>
                                {game?.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>

            {/* ---------------- Lots ------------------------------------------------------------------------------ */}
            <Table borderless responsive className="my-4">
                <thead>
                    <tr>
                        <th>Название&nbsp;игры</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userLots?.data?.map((lot) => (
                        <tr key={lot.id}>
                            <td>{lot?.gameInfo?.name}</td>
                            <td>
                                {lot?.description && lot.description.length > 150
                                    ? lot?.description.substring(0, 150) + '...'
                                    : lot?.description}
                            </td>
                            <td>{lot?.price}&nbsp;руб.</td>
                            <td>
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="simple">
                                        <IoEllipsisHorizontal />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as="button">
                                            <BiShow />
                                            <Link to={`/lot/${lot.id}`}>Открыть</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button">
                                            <BiEdit />
                                            <Link to={`edit/${lot.id}`}>Редактировать</Link>
                                        </Dropdown.Item>
                                        {/*<Dropdown.Item*/}
                                        {/*    as="button"*/}
                                        {/*    onClick={()=>alert(lot?.id)}*/}
                                        {/*>*/}
                                        {/*    <BiTrash />*/}
                                        {/*    <span>Удалить запись</span>*/}
                                        {/*</Dropdown.Item>*/}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* ---------------- Pagination ------------------------------------------------------------------------ */}

            <Pagination
                meta={userLots?.meta}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            {/* <nav className="pagination">
                <ul>
                    {pagesArr?.map((page) => (
                        <li key={'page' + page}>
                            <button
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={page === currentPage ? 'active' : undefined}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav > */}
        </div >
    )
}

export default MyAds
