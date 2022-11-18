import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {FiSearch} from 'react-icons/fi'
import LotPreview from '../components/LotPreview'
import BtnAddFav from '../components/utils/BtnAddFav'

const Game = () => {
    return (
        <main>
            <Container>
                <section className="game-page pt-4 pt-sm-5 mb-6">
                    <div className="d-md-flex align-items-center justify-content-between mb-4 mb-sm-5">
                        <h1 className="mb-md-0">Аккаунты Genshin Impact</h1>
                        <BtnAddFav add={false} />
                    </div>
                    <Row>
                        <Col xs={12} lg={7} xl={8}>
                            <img
                                src="imgs/slider-main/genshin.jpg"
                                alt="genshin"
                                className="main-img mb-4 mb-lg-0"
                            />
                        </Col>
                        <Col xs={12} lg={5} xl={4} className="achromat-1 fs-11">
                            <p>
                                На бирже Games.ru вы можете купить аккаунт <strong>Genshin Impact</strong> по его
                                реальной рыночной цене.
                            </p>
                            <p>
                                Продавцами являются другие игроки, а честность сделок обеспечивает система
                                безопасности (продавец не может получить деньги до выполнения своих обязательств).
                            </p>
                            <p>Пользователям разрешено продавать аккаунты, полученные только легальным путем.</p>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap mt-4 mt-sm-5">
                        <button type="button" className="active btn-7 flex-column mb-2 me-2 me-lg-4">
                            <span className="fw-5">Аккаунты</span>
                            <span>473</span>
                        </button>
                        <button type="button" className="btn-7 flex-column mb-2 me-2 me-lg-4">
                            <span className="fw-5">Услуги</span>
                            <span>46</span>
                        </button>
                        <button type="button" className="btn-7 flex-column mb-2 me-2 me-lg-4">
                            <span className="fw-5">Алмазы</span>
                            <span>272</span>
                        </button>
                        <button type="button" className="btn-7 flex-column mb-2 me-2 me-lg-4">
                            <span className="fw-5">Донат</span>
                            <span>92</span>
                        </button>
                        <button type="button" className="btn-7 flex-column mb-2 me-2 me-lg-4">
                            <span className="fw-5">Прочее</span>
                            <span>958</span>
                        </button>
                    </div>

                    <div className="d-xl-flex flex-row-reverse align-items-center mt-4 mt-sm-5 mb-4">
                        <div className="d-sm-flex flex-row-reverse align-items-center mb-3 mb-xl-0">
                            <button type="button" className="btn-5 ms-sm-4 mb-3 mb-sm-0">
                                Продать аккаунты
                            </button>
                            <form className="form-search-2 ms-xl-4">
                                <input type="search" placeholder="Поиск по описанию" />
                                <button type="submit">
                                    <FiSearch />
                                </button>
                            </form>
                        </div>
                        <div className="d-sm-flex align-items-center flex-1">
                            <select defaultValue={2} className="flex-1">
                                <option disabled>Сортировать по</option>
                                <option value={1}>Сортировка 1 </option>
                                <option value={2}>Сортировка 2</option>
                            </select>
                            <select defaultValue={1} className="flex-1 ms-sm-3 ms-md-4 mt-3 mt-sm-0">
                                <option disabled>Платформа</option>
                                <option value={1}>Платформа 1 </option>
                                <option value={2}>Платформа 2</option>
                            </select>
                            <div className="d-flex align-items-center ms-sm-3 ms-md-4 mt-3 mt-sm-0">
                                <span>
                                    Только продавцы
                                    <br className="d-none d-sm-inline d-md-none" /> онлайн:
                                </span>
                                <label className="switch ms-2">
                                    <input type="checkbox" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <Table borderless responsive className="mb-5">
                        <thead>
                            <tr>
                                <th>Платформа</th>
                                <th>Описание</th>
                                <th>Продавец</th>
                                <th>Цена</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LotPreview />
                            <LotPreview />
                            <LotPreview />
                            <LotPreview />
                            <LotPreview />
                            <LotPreview />
                            <LotPreview />
                            <LotPreview />
                        </tbody>
                    </Table>

                    <p>
                        Когда в конце сентября 2020 года была запущена RPG Genshin Impact, многие игроки отнеслись к
                        ней скептически из-за визуального стиля и геймплея. Загвоздка была в том, что этот проект
                        сильно напомнил геймерам шедевральную The Legend of Zelda: Breath of the Wild, которая
                        считается одной из самых высокооценённых игр. И да, сперва этот факт разгневал многих фанатов
                        Зельды, но когда шумиха о плагиате понемногу начала сходить на нет, игроки осознали свою
                        ошибку. Они увидели, что Genshin Impact не только умело эксплуатирует полюбившуюся всем
                        стилистику, но и сопровождает ее отличной боевой системой.
                    </p>
                    <p>
                        Игра распространяется по модели free-to-play, в ней присутствуют некоторые методы
                        монетизации. При желании насладиться игровым процессом без серьезных временных затрат
                        вы сможете, купив аккаунт Genshin Impact, и если переплачивать за игровые скины, шмотки и
                        экипировку вам не хочется, присмотритесь к нашей бирже.
                    </p>
                    <p>
                        В получении сильнейших героев вам поможем Games.ru — крупнейшая биржа игровых ценностей, где
                        можно купить все необходимое напрямую у игрока и не бояться обмана. Заплаченные покупателем
                        средства изначально замораживаются на сайте и поступают продавцу, когда покупающая сторона
                        получила все необходимые данные от аккаунта и убедилась в его качестве. Но это не
                        единственное достоинство нашей торговой площадки! Преимуществ много, попробуем перечислить их
                        все: свободный рынок, большое количество предложений, множество различных способов оплаты,
                        интуитивно понятный интерфейс, быстрое выполнение заказов, регулярно пополняемый ассортимент
                        и конечно, упомянутая выше, система безопасности сделок.
                    </p>
                </section>
            </Container>
        </main>
    )
}

export default Game
