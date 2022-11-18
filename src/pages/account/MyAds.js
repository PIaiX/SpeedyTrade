import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import AdsTr from '../../components/AdsTr'
import {Link} from 'react-router-dom'
import Pagination from '../../components/Pagination'
import {FiArrowLeft} from 'react-icons/fi'

const MyAds = () => {
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
            <Row xs={1} sm={3} className="gy-3 gy-sm-0 gx-3 gx-md-4 mt-4">
                <Col className="d-xl-flex align-items-center">
                    <span className="me-3">Игра:</span>
                    <select defaultValue={3}>
                        <option disabled>Игра</option>
                        <option value={1}>Игра 1</option>
                        <option value={2}>Игра 2</option>
                        <option value={3}>Игра 3</option>
                        <option value={4}>Игра 4</option>
                        <option value={5}>Игра 5</option>
                    </select>
                </Col>
                <Col className="d-xl-flex align-items-center">
                    <span className="me-3">Сервер:</span>
                    <select defaultValue={3}>
                        <option disabled>Сервер</option>
                        <option value={1}>Сервер 1</option>
                        <option value={2}>Сервер 2</option>
                        <option value={3}>Сервер 3</option>
                        <option value={4}>Сервер 4</option>
                        <option value={5}>Сервер 5</option>
                    </select>
                </Col>
                <Col className="d-xl-flex align-items-center">
                    <span className="me-3">Платформа:</span>
                    <select defaultValue={3}>
                        <option disabled>Платформа</option>
                        <option value={1}>Платформа 1</option>
                        <option value={2}>Платформа 2</option>
                        <option value={3}>Платформа 3</option>
                        <option value={4}>Платформа 4</option>
                        <option value={5}>Платформа 5</option>
                    </select>
                </Col>
            </Row>

            <Table borderless responsive className="my-4">
                <thead>
                    <tr>
                        <th>Название&nbsp;игры</th>
                        <th>Платформа</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <AdsTr
                        game={'Genshin Impact'}
                        platform={'Android'}
                        description={
                            'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'
                        }
                        price={3000}
                    />
                    <AdsTr
                        game={'Genshin Impact'}
                        platform={'Android'}
                        description={
                            'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'
                        }
                        price={3000}
                    />
                    <AdsTr
                        game={'Genshin Impact'}
                        platform={'Android'}
                        description={
                            'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'
                        }
                        price={3000}
                    />
                    <AdsTr
                        game={'Genshin Impact'}
                        platform={'Android'}
                        description={
                            'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'
                        }
                        price={3000}
                    />
                    <AdsTr
                        game={'Genshin Impact'}
                        platform={'Android'}
                        description={
                            'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'
                        }
                        price={3000}
                    />
                </tbody>
            </Table>
            <Pagination />
        </div>
    )
}

export default MyAds
