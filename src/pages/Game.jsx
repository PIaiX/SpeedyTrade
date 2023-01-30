import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {FiSearch} from 'react-icons/fi'
import LotPreview from '../components/LotPreview'
import BtnAddFav from '../components/utils/BtnAddFav'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import {getCategories, getOneGame} from '../services/games'
import {getImageURL} from '../helpers/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useSelector} from 'react-redux'
import useGetLotsByCategory from '../hooks/axios/getLotsByCategory'
import {getLotsByCategoryAndParams} from '../services/lots'

const Game = () => {
    const navigate = useNavigate()
    const theme = useSelector((state) => state?.theme?.mode)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const {slug} = useParams()
    const {region} = useParams()
    const [game, setGame] = useState({
        isLoaded: false,
    })
    const [currentCategoryId, setCurrentCategoryId] = useState(null)
    const [category, setCategory] = useState()
    const [categoriesId, setCategoriesId] = useState(0)
    const [values, setValues] = useState()
    const [lots, setLots] = useState({
        isLoaded: false,
        items: [],
    })
    const [categories, setCategories] = useState()

    useEffect(() => {
        getOneGame(slug)
            .then((res) => res && setGame({isLoaded: true, ...res}) && console.log(res))
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
            setCategories(game.categories)
        }
        if (game.regions) {
            let regionId = -1
            for (let i = 0; i < game.regions.length; i++) {
                let reg = region ? region.replace('_', '/') : ''
                if (game.regions[i].name === reg) {
                    regionId = i
                    break
                }
            }
            if (regionId == -1) {
                navigate('/game/' + game.slug + '/' + game.regions[0].name.replace('/', '_'))
            }
        }
    }, [game])

    useEffect(() => {
        categories && setCurrentCategoryId(categories[0].id)
    }, [categories])

    useEffect(() => {
        let r = []
        if (categories && categories[categoriesId].parameters) {
            for (let i of categories[categoriesId].parameters) r.push(0)
        }
        setValues(r)
    }, [currentCategoryId])

    useEffect(() => {
        let r = []
        values?.forEach((i) => {
            if (i != 0) r.push(parseInt(i))
        })
        if (currentCategoryId) {
            getLotsByCategoryAndParams(currentCategoryId, r).then((res) =>
                setLots({isLoaded: true, items: res.data})
            )
        }
    }, [values])

    // console.log(game)

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
                    <div style={{paddingBottom: '10px'}}>
                        {game.regions &&
                            game.regions.map((val, index) => {
                                let valName = val.name.replace('/', '_')
                                return (
                                    <NavLink key={index} to={'/game/' + slug + '/' + valName}>
                                        <div
                                            className={`btn-4 p-2 fs-08 me-1 mb-2 text-uppercase 
                    ${region === valName ? 'active' : ''} `}
                                            style={{display: 'inline-block'}}
                                        >
                                            {val.name}
                                        </div>
                                    </NavLink>
                                )
                            })}
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
                        {game?.categories
                            ?.map((k) => {
                                return {name: k.name, id: k.id}
                            })
                            .flat()
                            .map((i, index) => (
                                <button
                                    key={i.id}
                                    type="button"
                                    className={`${
                                        i.id === currentCategoryId ? 'active' : ''
                                    } btn-7 flex-column mb-2 me-2 me-lg-4`}
                                    onClick={() => {
                                        setCurrentCategoryId(i.id)
                                        setCategoriesId(index)
                                    }}
                                >
                                    <span className="fw-5">{i.name}</span>
                                </button>
                            ))}
                    </div>

                    <div className="d-flex flex-row align-items-center flex-wrap mt-4 mt-sm-5 mb-4">
                        {categories &&
                            categories[categoriesId] &&
                            categories[categoriesId].parameters &&
                            categories[categoriesId].parameters.map((val, index) => (
                                <div key={index} id={index} className="flex-grow-1 flex-md-shrink-1 pb-3 pe-3">
                                    <select
                                        onChange={(event, index) => {
                                            let r = []
                                            values.forEach((i, index) => (r[index] = i))
                                            r[event.target.id] = event.target.value
                                            setValues(r)
                                        }}
                                    >
                                        <option value={0}>{val.name}</option>
                                        {val.options.map((j, jndex) => (
                                            <option key={jndex} value={j.id}>
                                                {j.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                        <div className="d-sm-flex align-items-center flex-shrink-1 flex-md-grow-1 pb-3 pe-3">
                            <div className="d-flex align-items-center">
                                <span>
                                    Только продавцы
                                    <br className="d-none d-sm-inline d-md-none" /> онлайн:
                                </span>
                                <label className="switch ms-2">
                                    <input type="checkbox" />
                                </label>
                            </div>
                        </div>

                        <div className="flex-grow-1 pb-3 pe-3 pe-md-0">
                            <form className="form-search-2 ms-xl-4">
                                <input type="search" placeholder="Поиск по описанию" />
                                <button type="submit">
                                    <FiSearch />
                                </button>
                            </form>
                        </div>
                    </div>

                    {lots.isLoaded ? (
                        lots.items?.length > 0 ? (
                            <Table borderless responsive className="mb-5">
                                <thead>
                                    <tr>
                                        <th>Описание</th>
                                        <th>Продавец</th>
                                        <th>Цена</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lots.items?.map(
                                        (i) =>
                                            i.isVisible && (
                                                <LotPreview
                                                    key={i.id}
                                                    lotId={i.id}
                                                    description={i.description}
                                                    userId={i.userId}
                                                    avatar={getImageURL(i.user?.avatar)}
                                                    fullName={i.user?.fullName}
                                                    nickname={i.user?.nickname}
                                                    rating={i.user?.rating}
                                                    createdAt={i.user?.createdAt}
                                                    price={i.priceCommission}
                                                />
                                            )
                                    )}
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
