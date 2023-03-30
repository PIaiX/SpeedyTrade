import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { FiSearch } from 'react-icons/fi'
import BtnAddFav from '../components/utils/BtnAddFav'
import { Link, useNavigate, useParams, ScrollRestoration, Navigate } from 'react-router-dom'
import { getOneGame } from '../services/games'
import { getImageURL } from '../helpers/image'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'
import { getLotsByCategoryRegionAndParams } from '../services/lots'
import StarRating from '../components/utils/StarRating'

const Parameters = ({ params, selectedOptions, setSelectedOptions, selectedNumericOptions, setSelectedNumericOptions }) => {
    const [childrenParam, setChildrenParam] = useState({})
    const [prevChildrenParams, setPrevChildrenParams] = useState({})

    // On children change, remove those children params from selected
    useEffect(() => {

        if (childrenParam === prevChildrenParams) return

        if (prevChildrenParams) {

            let optCopy = Object.assign({}, selectedOptions)
            Object.values(prevChildrenParams).map(children => children.map(child => {
                delete optCopy[child.id]
            }))
            setSelectedOptions(optCopy)
        }

        setPrevChildrenParams(childrenParam)
    }, [childrenParam])

    if (!params) return

    return params.map((parameter) => (
        <>
            <div key={parameter.id}
                className='flex-grow-1 flex-md-shrink-1 pb-3 pe-3 d-flex align-items-center flex-wrap gap-2'>
                {parameter.isNumeric
                    ? // Numeric Options
                    <>
                        {parameter.name}
                        <label className='d-flex flex-nowrap gap-2'>от
                            <input
                                type="number"
                                placeholder="0"
                                min={parameter.min}
                                max={parameter.max}
                                defaultValue={parameter.min}
                                onChange={(e) => {
                                    setSelectedNumericOptions({
                                        ...selectedNumericOptions,
                                        [parameter.id]: { ...selectedNumericOptions[parameter.id], min: Number(e?.target.value) },
                                    })
                                }}
                            />
                        </label>
                        <label className='d-flex flex-nowrap gap-2'>до
                            <input
                                type="number"
                                placeholder="0"
                                min={parameter.min}
                                max={parameter.max}
                                defaultValue={parameter.max}
                                onChange={(e) => {
                                    setSelectedNumericOptions({
                                        ...selectedNumericOptions,
                                        [parameter.id]: { ...selectedNumericOptions[parameter.id], max: Number(e?.target.value) },
                                    })
                                }}
                            />
                        </label>
                    </>
                    : // Selectable options
                    <select
                        onChange={(e) => {
                            setSelectedOptions({ ...selectedOptions, [parameter.id]: Number(e?.target.value) })
                            e?.target.selectedIndex === 0
                                ?
                                setChildrenParam({ ...childrenParam, [parameter.id]: [] })
                                :
                                parameter.options[e?.target.selectedIndex - 1].childParameter.length > 0 &&
                                setChildrenParam({
                                    ...childrenParam,
                                    [parameter.id]: parameter.options[e?.target.selectedIndex - 1].childParameter
                                })
                        }}
                    >
                        <option value={''}>{parameter.name}</option>
                        {parameter?.options?.map((option) => (
                            <option key={'option-' + option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>}
            </div>
            {childrenParam && childrenParam[parameter.id] && childrenParam[parameter.id].length > 0 && (
                <Parameters
                    params={childrenParam[parameter.id]}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    selectedNumericOptions={selectedNumericOptions}
                    setSelectedNumericOptions={setSelectedNumericOptions}
                />
            )}
        </>
    ))
}

const Game = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const nav = useNavigate()
    const userId = useSelector((state) => state?.auth?.user?.id)
    const { slug, regId, catId } = useParams()
    const [game, setGame] = useState({
        isLoaded: false,
    })
    const [servers, setServers] = useState(null)
    const [currentRegion, setCurrentRegion] = useState()
    const [currentServer, setCurrentServer] = useState('')
    const [currentCategory, setCurrentCategory] = useState({}) // { id: number, key: number }
    const [selectedOptions, setSelectedOptions] = useState({}) // { [propertyId: number]: number }
    const [selectedNumericOptions, setSelectedNumericOptions] = useState({})
    const [parametersToShow, setParametersToShow] = useState([])
    const [onlineOnly, setOnlineOnly] = useState(false)
    const [query, setQuery] = useState('')

    const [lots, setLots] = useState({
        isLoaded: false,
        items: [],
    })


    // Time converter
    const timeOnSite = (timeDate) => {
        let date = new Date(timeDate)
        let month = date.toLocaleString('ru-RU', { month: 'long' })
        let year = date.toLocaleString('ru-RU', { year: 'numeric' })
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
            .then((res) => res && setGame({ isLoaded: true, ...res }))
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
            setCurrentCategory({ id: catId, key: key })
        } else if (game.categories.length > 0) {
            setCurrentCategory({ id: game.categories[0].id, key: 0 })
        }
        // eslint-disable-next-line no-prototype-builtins
    }, [game])

    useEffect(() => {
        if (!game.isLoaded) return

        // Reset selected options
        setSelectedOptions({})
        setSelectedNumericOptions({})

        // Set parameters to show in lot list
        setParametersToShow([])
        game.categories[currentCategory.key].parameters?.map((parameter) => {
            if (parameter.displayInLotList) setParametersToShow((arr) => [...arr, parameter])
        })

        game.regions.map((reg) => reg.id == currentRegion && setServers(reg.servers))
    }, [currentRegion, currentCategory])

    // Get lots filtered by region, server, category & parameters options
    useEffect(() => {
        if (currentCategory.id && currentRegion) {
            getLotsByCategoryRegionAndParams(
                currentRegion,
                currentServer === 0 ? '' : currentServer,
                currentCategory.id,
                Object.values(selectedOptions).filter(Number),
                JSON.stringify(Object.entries(selectedNumericOptions).reduce((obj, item) => Object.assign(obj, { [item[0]]: Object.values(item[1]) }), {})),
                onlineOnly,
                query
            ).then((res) => setLots({ isLoaded: true, items: res.data }))
        }
    }, [currentRegion, currentServer, currentCategory, selectedOptions, onlineOnly, selectedNumericOptions, query])

    return (
        <main>
            <Container>
                <section className="game-page pt-4 pt-sm-5 mb-6 min-vh-100">
                    <div className="d-md-flex align-items-center justify-content-between mb-4 mb-sm-2">
                        <h1 className="mb-md-0">{game?.name}</h1>
                        <BtnAddFav favoriteStatus={game?.isFavorite} gameId={game.id} userId={userId} />
                    </div>

                    {/* Game regions ---------------------------------------------------------------------------------------------------------------------- */}
                    <div style={{ paddingBottom: '10px' }}>
                        {game.regions?.length > 1 &&
                            game.regions?.map((region) => {
                                return (
                                    <Link
                                        to={`/game/${game.slug}/${region.id}/${currentCategory.id}`}
                                        preventScrollReset={true}
                                        type="button"
                                        key={'region-' + region.id}
                                        className={`btn-4 p-2 fs-08 me-1 mb-2 text-uppercase ${currentRegion == region.id ? 'active' : ''
                                            } `}
                                        style={{ display: 'inline-block' }}
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
                            {game?.image && (
                                <img
                                    src={getImageURL(game?.image)}
                                    alt={game?.name}
                                    className="main-img mb-4 mb-lg-0"
                                />
                            )}
                        </Col>
                        <Col xs={12} lg={5} xl={4} className="achromat-1 fs-11">
                            <p>{game?.topDescription}</p>
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
                                className={`${category.id == currentCategory.id ? 'active' : ''
                                    } btn-7 flex-column mb-2 me-2 me-lg-4`}
                                onClick={() => {
                                    setCurrentCategory({ id: category.id, key: index })
                                }}
                            >
                                <span className="fw-5">{category.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Main parameters ------------------------------------------------------------------------------------------------------------------- */}
                    <div className="d-flex flex-row align-items-center flex-wrap mt-3 mt-sm-4 mb-3">
                        <div key={''} className="flex-grow-1 flex-md-shrink-1 pb-3 pe-3">
                            <select onChange={(e) => setCurrentServer(Number(e?.target.value))}>
                                <option value={''}>Сервер</option>
                                {servers?.length > 0 &&
                                    servers.map((server) => (
                                        <option key={'option-' + server.id} value={server.id}>
                                            {server.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

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

                    {/* Category parameters --------------------------------------------------------------------------------------------------------------- */}
                    <div className="d-flex flex-row align-items-center flex-wrap mb-3">
                        {game.categories && game.categories[currentCategory.key] && (
                            <Parameters
                                params={game.categories[currentCategory.key].parameters}
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                selectedNumericOptions={selectedNumericOptions}
                                setSelectedNumericOptions={setSelectedNumericOptions}
                            />
                        )}
                    </div>

                    {/* Lots ------------------------------------------------------------------------------------------------------------------------------ */}
                    {lots.isLoaded &&
                        (lots.items?.length > 0 ? (
                            <Table borderless responsive className="mb-5" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th>Сервер</th>
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
                                                    <td onClick={() => nav(`/lot/${lot.id}`)}>{lot.serverName ? lot.serverName : '-'}</td>
                                                    {parametersToShow.length > 0 &&
                                                        parametersToShow.map((param) => (
                                                            <td key={`param-${param.id}-${lot.id}`} onClick={() => nav(`/lot/${lot.id}`)}>
                                                                {
                                                                    lot.options.find(
                                                                        (option) => option.parameterId === param.id
                                                                    )?.name
                                                                }
                                                                {
                                                                    lot.numericParameters.find(
                                                                        (numericOption) =>
                                                                            numericOption.id === param.id
                                                                    )?.numericValue
                                                                }
                                                            </td>
                                                        ))}
                                                    <td onClick={() => nav(`/lot/${lot.id}`)}>
                                                        {lot.description.length > 300
                                                            ? lot.description.substring(0, 300) + '...'
                                                            : lot.description}
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
                                                                            : '/images/no-photo.jpg'
                                                                    }
                                                                    alt={lot.user.fullName}
                                                                />
                                                                <div
                                                                    className={`indicator ${lot.user.isOnline && 'online'
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
                                                    <td onClick={() => nav(`/lot/${lot.id}`)}>
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
                        ))}

                    <p>{game?.bottomDescription}</p>
                </section>
            </Container>
        </main>
    )
}

export default Game
