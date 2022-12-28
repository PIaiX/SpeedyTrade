import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {FiSearch} from 'react-icons/fi'
import LotPreview from '../components/LotPreview'
import BtnAddFav from '../components/utils/BtnAddFav'
import {useParams} from 'react-router-dom'
import {getOneGame} from '../services/games'
import {getImageURL} from '../helpers/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useSelector} from 'react-redux'
import useGetLotsByCategory from '../hooks/axios/getLotsByCategory'

const Game = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const {slug} = useParams()
    const [game, setGame] = useState({
        isLoaded: false,
    })
    const [currentCategoryId, setCurrentCategoryId] = useState(null)

    const {lots} = useGetLotsByCategory(currentCategoryId)

    useEffect(() => {
        getOneGame(slug)
            .then((res) => res && setGame({isLoaded: true, ...res}))
            .catch(() => console.log())
    }, [slug])

    useEffect(() => {
        // eslint-disable-next-line no-prototype-builtins
        if (game?.hasOwnProperty('regions')) {
            setCurrentCategoryId(
                game?.regions
                    ?.map((i) =>
                        i.categories?.map((k) => {
                            return {name: k.name, id: k.id}
                        })
                    )
                    .flat()[0]?.id
            )
        }
    }, [game])

    return (
        <main>
            <Container>
                <section className="game-page pt-4 pt-sm-5 mb-6">
                    <div className="d-md-flex align-items-center justify-content-between mb-4 mb-sm-5">
                        <h1 className="mb-md-0">
                            {game?.name || (
                                <Skeleton
                                    count={1}
                                    baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                    highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                    width={'200px'}
                                />
                            )}
                        </h1>
                        <BtnAddFav favoriteStatus={game?.isFavorite} gameId={game.id} userId={userId} />
                    </div>
                    <Row>
                        <Col xs={12} lg={7} xl={8}>
                            {game?.image ? (
                                <img
                                    src={getImageURL(game?.image)}
                                    alt={game?.name}
                                    className="main-img mb-4 mb-lg-0"
                                />
                            ) : (
                                <Skeleton
                                    baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                    highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                    height={'100%'}
                                    width={'100%'}
                                />
                            )}
                        </Col>
                        <Col xs={12} lg={5} xl={4} className="achromat-1 fs-11">
                            <p>
                                {game?.topDescription || (
                                    <Skeleton
                                        count={6}
                                        baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                        highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                    />
                                )}
                            </p>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap mt-4 mt-sm-5">
                        {game?.regions
                            ?.map((i) =>
                                i.categories?.map((k) => {
                                    return {name: k.name, id: k.id}
                                })
                            )
                            .flat()
                            .map((i) => (
                                <button
                                    key={i.id}
                                    type="button"
                                    className={`${
                                        i.id === currentCategoryId ? 'active' : ''
                                    } btn-7 flex-column mb-2 me-2 me-lg-4`}
                                    onClick={() => setCurrentCategoryId(i.id)}
                                >
                                    <span className="fw-5">{i.name}</span>
                                    {/*<span>473</span>*/}
                                </button>
                            ))}
                    </div>

                    <div className="d-xl-flex flex-row-reverse align-items-center mt-4 mt-sm-5 mb-4">
                        <div className="d-sm-flex flex-row-reverse align-items-center mb-3 mb-xl-0">
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
                                <option value={1}>Сортировка 1</option>
                                <option value={2}>Сортировка 2</option>
                            </select>
                            <select defaultValue={1} className="flex-1 ms-sm-3 ms-md-4 mt-3 mt-sm-0">
                                <option disabled>Платформа</option>
                                <option value={1}>Платформа 1</option>
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

                    {lots.isLoaded ? (
                        lots.items?.length > 0 ? (
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
                                    {lots.items?.map((i) => (
                                        <LotPreview
                                            key={i.id}
                                            lotId={i.id}
                                            platform={i.platform?.name}
                                            description={i.description}
                                            userId={i.userId}
                                            avatar={getImageURL(i.user?.avatar)}
                                            fullName={i.user?.fullName}
                                            nickname={i.user?.nickname}
                                            rating={i.user?.rating}
                                            createdAt={i.user?.createdAt}
                                            price={i.price}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <h6>Лоты отсутствуют</h6>
                        )
                    ) : (
                        <Skeleton
                            baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                            highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                            height={'10em'}
                            width={'100%'}
                        />
                    )}

                    <p>{game?.bottomDescription}</p>
                </section>
            </Container>
        </main>
    )
}

export default Game
