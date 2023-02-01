import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {FiSearch} from 'react-icons/fi'
import BtnAddFav from '../components/utils/BtnAddFav'
import {Link, useNavigate, useParams, ScrollRestoration} from 'react-router-dom'
import {getOneGame} from '../services/games'
import {getImageURL} from '../helpers/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useSelector} from 'react-redux'
import {getLotsByCategoryRegionAndParams} from '../services/lots'
import StarRating from '../components/utils/StarRating'

const Game = () => {
    const navigate = useNavigate()
    const theme = useSelector((state) => state?.theme?.mode)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const {slug, regId, catId} = useParams()
    const [game, setGame] = useState({
        isLoaded: false,
    })
    const [currentRegion, setCurrentRegion] = useState()
    const [currentCategory, setCurrentCategory] = useState({}) // { id: number, key: number }
    const [selectedOptions, setSelectedOptions] = useState([]) // { propertyId: number, option: number }[]
    const [parametersToShow, setParametersToShow] = useState([])
    const [onlineOnly, setOnlineOnly] = useState(false)
    const [query, setQuery] = useState('')

    const [lots, setLots] = useState({
        isLoaded: false,
        items: [],
    })

    // Set game parameters options
    const setOptions = (id, value) => {
        let arr = selectedOptions.slice()
        let result = arr.find((o, i) => {
            if (o?.propertyId === id) {
                arr[i] = {propertyId: id, option: value}
                setSelectedOptions(arr)
                return true
            }
        })
        if (!result) setSelectedOptions((arr) => [...arr, {propertyId: id, option: value}])
    }

    // Time converter
    const timeOnSite = (timeDate) => {
        let date = new Date(timeDate)
        let month = date.toLocaleString('ru-RU', {month: 'long'})
        let year = date.toLocaleString('ru-RU', {year: 'numeric'})
        let string
        if (month.endsWith('ь')) {
            string = month.replace(/ь/i, 'я') + ' ' + year
        } else {
            string = month.concat('а') + ' ' + year
        }
        return string
    }

    // Get game JSON
    useEffect(() => {
        getOneGame(slug)
            .then((res) => res && setGame({isLoaded: true, ...res}) && console.log(res))
            .catch(() => console.log())
    }, [slug])

    useEffect(() => {
        if (!game.isLoaded) return

        // Set active region
        if (regId) {
            setCurrentRegion(regId)
        } else if (game.regions.length > 0) {
            setCurrentRegion(game.regions[0].id)
        }

        // Set active category
        if (catId) {
            let key = game.categories.findIndex((cat) => cat.id == catId)
            setCurrentCategory({id: catId, key: key})
        } else if (game.categories.length > 0) {
            setCurrentCategory({id: game.categories[0].id, key: 0})
        }

        // eslint-disable-next-line no-prototype-builtins
    }, [game])

    useEffect(() => {
        if (!game.isLoaded) return

        // Reset selected options
        setSelectedOptions([])

        // Set parameters to show in lot list
        setParametersToShow([])
        game.categories[currentCategory.key]?.parameters?.map((parameter) => {
            if (parameter.displayInLotList) setParametersToShow((arr) => [...arr, parameter])
        })

        // set location
        // navigate(`/game/${game.slug}/${currentRegion}/${currentCategory.id}`, {replace: true})
    }, [currentRegion, currentCategory])

    // Get lots by category & parameters options
    useEffect(() => {
        let options = selectedOptions.map((o) => o.option).filter(Number)
        if (currentCategory.id && currentRegion) {
            getLotsByCategoryRegionAndParams(currentRegion, currentCategory.id, options, onlineOnly, query).then(
                (res) => setLots({isLoaded: true, items: res.data})
            )
        }
    }, [currentRegion, currentCategory, selectedOptions, onlineOnly, query])

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

                    {/* Game regions ---------------------------------------------------------------------------------------------------------------------- */}
                    <div style={{paddingBottom: '10px'}}>
                        {game.regions &&
                            game.regions.map((region) => {
                                return (
                                    <Link
                                        to={`/game/${game.slug}/${region.id}/${currentCategory.id}`}
                                        preventScrollReset={true}
                                        type="button"
                                        key={'region-' + region.id}
                                        className={`btn-4 p-2 fs-08 me-1 mb-2 text-uppercase ${
                                            currentRegion == region.id ? 'active' : ''
                                        } `}
                                        style={{display: 'inline-block'}}
                                        onClick={() => setCurrentRegion(region.id)}
                                    >
                                        {region.name}
                                    </Link>
                                )
                            })}
                    </div>

                    {/* Game image & description ---------------------------------------------------------------------------------------------------------- */}
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

                    {/* Categories ------------------------------------------------------------------------------------------------------------------------ */}
                    <div className="d-flex flex-wrap mt-4 mt-sm-5">
                        {game?.categories?.map((category, index) => (
                            <Link
                                to={`/game/${game.slug}/${currentRegion}/${category.id}`}
                                preventScrollReset={true}
                                key={category.id}
                                type="button"
                                className={`${
                                    category.id == currentCategory.id ? 'active' : ''
                                } btn-7 flex-column mb-2 me-2 me-lg-4`}
                                onClick={() => {
                                    setCurrentCategory({id: category.id, key: index})
                                }}
                            >
                                <span className="fw-5">{category.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Category parameters --------------------------------------------------------------------------------------------------------------- */}
                    <div className="d-flex flex-row align-items-center flex-wrap mt-4 mt-sm-5 mb-4">
                        {game.categories &&
                            game.categories[currentCategory.key] &&
                            game.categories[currentCategory.key].parameters &&
                            game.categories[currentCategory.key].parameters.map((parameter) => {
                                return (
                                    <div
                                        key={parameter.id}
                                        id={parameter.id}
                                        className="flex-grow-1 flex-md-shrink-1 pb-3 pe-3"
                                    >
                                        <select onChange={(e) => setOptions(parameter.id, e.target.value)}>
                                            <option value={0}>{parameter.name}</option>
                                            {parameter.options.map((option) => (
                                                <option key={'option-' + option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            })}

                        <div className="d-sm-flex align-items-center flex-shrink-1 flex-md-grow-1 pb-3 pe-3">
                            <div className="d-flex align-items-center">
                                <span>
                                    Только продавцы
                                    <br className="d-none d-sm-inline d-md-none" /> онлайн:
                                </span>
                                <label className="switch ms-2">
                                    <input type="checkbox" onChange={(e) => setOnlineOnly(e.target.checked)} />
                                </label>
                            </div>
                        </div>

                        <div className="flex-grow-1 pb-3 pe-3 pe-md-0">
                            <form className="form-search-2 ms-xl-4">
                                <input
                                    type="search"
                                    placeholder="Поиск по описанию"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit">
                                    <FiSearch />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lots ------------------------------------------------------------------------------------------------------------------------------ */}
                    {lots.isLoaded ? (
                        lots.items?.length > 0 ? (
                            <Table borderless responsive className="mb-5">
                                <thead>
                                    <tr>
                                        {parametersToShow.length > 0 &&
                                            parametersToShow.map((param) => (
                                                <th key={`param-${param.id}`}>{param.name}</th>
                                            ))}
                                        <th>Описание</th>
                                        <th>Продавец</th>
                                        <th>Цена</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lots.items?.map(
                                        (lot) =>
                                            lot.isVisible && (
                                                <tr className="lot-preview" key={'lot-' + lot.id}>
                                                    {parametersToShow.length > 0 &&
                                                        parametersToShow.map((param) => (
                                                            <td key={`param-${param.id}-${lot.id}`}>
                                                                {
                                                                    lot.options.find(
                                                                        (option) => option.parameterId === param.id
                                                                    )?.name
                                                                }
                                                            </td>
                                                        ))}
                                                    <td>
                                                        <Link to={`/lot/${lot.id}`}>
                                                            {lot.description.length > 300
                                                                ? lot.description.substring(0, 300) + '...'
                                                                : lot.description}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={
                                                                lot.userId === userId
                                                                    ? '/account/profile'
                                                                    : `/user/${lot.userId}`
                                                            }
                                                            className="lot-preview-user"
                                                        >
                                                            <div className="img">
                                                                <img
                                                                    src={
                                                                        lot.user.avatar
                                                                            ? getImageURL(lot.user.avatar)
                                                                            : '/images/user2.png'
                                                                    }
                                                                    alt={lot.user.fullName}
                                                                />
                                                                <div
                                                                    className={`indicator ${
                                                                        lot.user.isOnline && 'online'
                                                                    }`}
                                                                ></div>
                                                            </div>
                                                            <div>
                                                                <h5 className="achromat-2 mb-1">
                                                                    {lot.user.fullName}
                                                                </h5>
                                                                <div className="achromat-3 mb-1">
                                                                    @{lot.user.nickname}
                                                                </div>
                                                                <StarRating
                                                                    rate={lot.user.rating}
                                                                    className="justify-content-start fs-08"
                                                                />
                                                                <div>
                                                                    На&nbsp;сайте с&nbsp;
                                                                    {timeOnSite(lot.user.createdAt)}&nbsp;г
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div className="color-1 fw-7">
                                                            {lot.priceCommission}&nbsp;руб.
                                                        </div>
                                                    </td>
                                                </tr>
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
