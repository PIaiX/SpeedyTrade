import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { getAllGames, getOneGame, getGameRegions, getCategories, getCategoryParameters } from '../../services/games'
import { getLot, postLot, editLot } from '../../services/lots'
import swal from 'sweetalert'

// Опциии для использование с react-select
const getOptions = (res) => {
    let arr = []
    res?.map((el) => {
        return arr.push({
            value: el.id,
            label: el.name,
            currency: el.isCurrency,
            slug: el.slug,
            servers: el.servers,
            childParameter: el.childParameter,
            isAmountAlwaysOne: el.isAmountAlwaysOne,
            isDescriptionEnabled: el.isDescriptionEnabled
        })
    })
    return arr
}

const Parameters = ({ params, lot, setNumericParameters, setOptions, numericParameters, options }) => {
    const [chParam, setChParam] = useState({})

    useEffect(() => {
        return () => {
            let optCopy = Object.assign({}, options)
            params && params.length > 0 && params.map((par) => delete optCopy[par.id])
            setOptions(optCopy)
            setNumericParameters({})
        }
    }, [params])

    if (!params) return

    return params.map((parameter) => {
        if (parameter.isNumeric) {
            return (
                <React.Fragment key={parameter.id}>
                    <Col xs={12} sm={3} md={2}>
                        {parameter.name}:
                    </Col>
                    <Col xs={12} sm={9} md={10} className="d-flex align-items-center">
                        <input
                            type="number"
                            placeholder="0"
                            className="flex-1"
                            defaultValue={
                                lot &&
                                lot.numericParameters?.find((param) => param.id === parameter.id)?.numericValue
                            }
                            onChange={(e) => {
                                setNumericParameters((options) => ({
                                    ...options,
                                    [parameter.id]: Number(e?.target.value),
                                }))
                            }}
                        />
                    </Col>
                </React.Fragment>
            )
        } else {
            let parOptions = getOptions(parameter.options)
            let lotOption = lot ? lot.options.find((o) => o.parameterId == parameter.id)?.id : null

            return (
                <>
                    <React.Fragment key={parameter.id}>
                        <Col xs={12} sm={3} md={2}>
                            {parameter.name}:
                        </Col>
                        <Col xs={12} sm={9} md={10}>
                            <Select
                                name="item"
                                placeholder="Выбрать"
                                classNamePrefix="react-select"
                                options={parOptions}
                                // isClearable={true}
                                isSearchable={true}
                                defaultValue={parOptions.find((o) => o.value === lotOption)}
                                onChange={(e) => {
                                    setOptions((options) => ({
                                        ...options,
                                        [parameter.id]: e?.value,
                                    }))
                                    setChParam((params) => ({ ...params, [parameter.id]: e.childParameter }))
                                }}
                            />
                        </Col>
                    </React.Fragment>
                    {chParam && chParam[parameter.id] && chParam[parameter.id].length > 0 && (
                        <Parameters
                            params={chParam[parameter.id]}
                            lot={lot}
                            setNumericParameters={setNumericParameters}
                            setOptions={setOptions}
                            options={options}
                            numericParameters={numericParameters}
                        />
                    )}
                </>
            )
        }
    })
}

const PostAd = () => {
    const { lotId } = useParams()
    const [lot, setLot] = useState()

    const { state: stateFromLocation } = useLocation()
    const [state, setState] = useState(stateFromLocation)
    // Games
    const [selectedOptionGame, setSelectedOptionGame] = useState(null)
    const [optionsGames, setOptionsGames] = useState([])
    // Selected game
    const [selectedGame, setSelectedGame] = useState(null)
    // Regions
    const [selectedRegion, setSelectedRegion] = useState(null)
    // Servers
    const [selectedServer, setSelectedServer] = useState(null)
    // Lot category
    const [selectedCategory, setSelectedCategory] = useState(null)
    // Gold
    const [gold, setGold] = useState(false)
    // Parameters
    const [categoryParameters, setCategoryParameters] = useState([])
    // Options
    const [options, setOptions] = useState({})
    // Numeric Options
    const [numericParameters, setNumericParameters] = useState({})
    // description
    const [description, setDescription] = useState('')
    // Price
    const [price, setPrice] = useState(0)
    // Min Price
    const [minPrice, setMinPrice] = useState(0)
    // Amount
    const [amount, setAmount] = useState(1)
    // Active
    const [active, setActive] = useState(false)
    // User
    const userId = useSelector((state) => state.auth.user.id)
    const navigate = useNavigate()

    const postBody = {
        isVisible: active,
        description: description,
        price: price,
        amount: amount,
        userId: userId,
        categoryId: selectedCategory ? selectedCategory.value : null,
        regionId: selectedRegion ? selectedRegion.value : null,
        serverId: selectedServer ? selectedServer.value : null,
        numericParameters: numericParameters ?? null,
        minPrice: minPrice ?? null,
        options: Object.values(options),
    }

    const addLot = () => {
        console.log(postBody)

        if (
            selectedOptionGame &&
            selectedCategory &&
            // description &&
            price &&
            price <= 10000000
            // amount &&
            //categoryParameters.length === Object.values(options).length + Object.values(numericParameters).length
        ) {
            if (lot) {
                // Редактирование лота
                editLot(lot.id, postBody)
                    .then((res) =>
                        res.status === 500
                            ? swal('Ошибка', res.body.response.data.message ?? '', 'error')
                            : swal('Успешно', 'Лот успешно отредактирован', 'success').then(() =>
                                navigate('/account/ads')
                            )
                    )
                    .catch(() => swal('Ошибка', 'Ошибка при отправке запроса', 'error'))
            } else {
                // Создание лота
                postLot(postBody)
                    .then((res) =>
                        res.status === 500
                            ? swal('Ошибка', res.body.response.data.message ?? '', 'error')
                            : swal('Успешно', 'Лот размещен', 'success').then(() => navigate('/account/ads'))
                    )
                    .catch((e) => swal('Ошибка', 'Ошибка при отправке запроса', 'error'))
            }
        } else {
            price > 10000000
                ? swal({ text: 'Цена не более 10 000 000', icon: 'error' })
                : swal({ text: 'Необходимо заполнить все поля', icon: 'error' })
        }
    }


    useEffect(() => {
        if (state) {
            const def = { childParameter: undefined, currency: undefined, servers: undefined, slug: undefined }
            setSelectedOptionGame({ ...def, ...state.selectedOptionGame })
            setSelectedRegion({ ...def, ...state?.selectedRegion })
            setSelectedServer({ ...def, ...state.selectedServer })
            setSelectedCategory({ ...def, currency: false, ...state.selectedCategory })
        }
    }, [state])

    // fetch games
    useEffect(() => {
        getAllGames()
            .then((res) => getOptions(res))
            .then((arr) => arr && setOptionsGames(arr))
    }, [])

    //fetch regions & categories
    useEffect(() => {
        if (selectedOptionGame) {
            getOneGame(selectedOptionGame.slug).then((game) => setSelectedGame(game))
            if (!state) {
                setSelectedRegion(null)
                setSelectedServer(null)
                setSelectedCategory(null)
            }
        } else if (!state) {
            setSelectedRegion(null)
            setSelectedServer(null)
            setSelectedCategory(null)
        }
    }, [selectedOptionGame])

    //fetch parameters
    useEffect(() => {
        setCategoryParameters([])
        setOptions({})
        if (selectedCategory) {
            if (lot) {
                let optionsObjects = lot.options.map((option) => ({ [option.parameterId]: option.id }))
                let lotOptions = Object.assign({}, ...optionsObjects)
                selectedCategory?.value === lot.categoryId ? setOptions(lotOptions) : setOptions({})
            }
            getCategoryParameters(selectedCategory.value).then((arr) => arr && setCategoryParameters(arr))
            if (selectedCategory.currency) {
                setGold(true)
                setDescription('Золото')
            } else {
                setGold(false)
            }
        }
    }, [selectedCategory])

    useEffect(() => {
        selectedRegion?.servers.length === 0 && !state && setSelectedServer(null)
    }, [selectedRegion])

    // Edit lot -----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (!lotId) return

        getLot(lotId).then((res) => setLot(res))
    }, [lotId])

    useEffect(() => {
        if (!lot) return

        !selectedOptionGame && setSelectedOptionGame(optionsGames.find((o) => o.value === lot.gameInfo.id))
        !selectedRegion && setSelectedRegion(getOptions(selectedGame?.regions).find((o) => o.value === lot.regionId))
        !selectedServer &&
            setSelectedServer(getOptions(selectedRegion?.servers).find((o) => o.value === lot.serverId))
        !selectedCategory &&
            setSelectedCategory(getOptions(selectedGame?.categories).find((o) => o.value === lot.categoryId))
        !description && setDescription(lot.description)
        !amount && setAmount(lot.amount)
        !active && setActive(lot.isVisible)
        !price && setPrice(lot.price)
        lot.minPrice && setMinPrice(lot.minPrice)
        lot.numericParameters.length > 0 &&
            lot.numericParameters.map((param) =>
                setNumericParameters((options) => ({
                    ...options,
                    [param.id]: param.numericValue,
                }))
            )
    }, [lot, selectedGame, selectedRegion])

    console.log(selectedCategory)

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account/ads" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Мои объявления</h4>
            </div>
            <p className="mb-4">{lot ? 'Редактирование объявления' : 'Добавление нового объявления'}</p>
            <form>
                <Row className="g-3 g-lg-4 align-items-center">
                    {/* ---------------------- Game --------------------------------------------------------------- */}
                    <Col xs={12} sm={3} md={2}>
                        Игра:
                    </Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select
                            name="game"
                            placeholder="Выбрать"
                            classNamePrefix="react-select"
                            options={optionsGames}
                            isSearchable={true}
                            value={selectedOptionGame}
                            onChange={(e) => {
                                setState(null)
                                setSelectedOptionGame(e)
                            }}

                        />
                    </Col>

                    {/* ---------------------- Region ------------------------------------------------------------- */}
                    {selectedGame?.regions && selectedGame?.regions.length > 1 &&
                        <>
                            <Col xs={12} sm={3} md={2}>
                                Регион:
                            </Col>
                            <Col xs={12} sm={9} md={10}>
                                <Select
                                    name="region"
                                    placeholder="Выбрать"
                                    classNamePrefix="react-select"
                                    options={getOptions(selectedGame?.regions)}
                                    isClearable={true}
                                    isSearchable={true}
                                    value={selectedRegion}
                                    onChange={setSelectedRegion}
                                    isDisabled={selectedGame?.regions?.length > 0 ? false : true}
                                />
                            </Col>
                        </>}

                    {/* ---------------------- Server ------------------------------------------------------------- */}
                    {selectedRegion?.servers &&
                        <>
                            <Col xs={12} sm={3} md={2}>
                                Сервер:
                            </Col>
                            <Col xs={12} sm={9} md={10}>
                                <Select
                                    name="region"
                                    placeholder="Выбрать"
                                    classNamePrefix="react-select"
                                    options={selectedRegion && getOptions(selectedRegion.servers)}
                                    isClearable={true}
                                    isSearchable={true}
                                    value={selectedServer}
                                    onChange={setSelectedServer}
                                    isDisabled={selectedRegion?.servers.length > 0 ? false : true}
                                />
                            </Col>
                        </>}

                    {/* ---------------------- Lot Category ------------------------------------------------------- */}
                    <Col xs={12} sm={3} md={2}>
                        Категория лота:
                    </Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select
                            name="lot-category"
                            placeholder="Выбрать"
                            classNamePrefix="react-select"
                            options={getOptions(selectedGame?.categories)}
                            isClearable={true}
                            isSearchable={true}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            isDisabled={selectedGame?.categories?.length > 0 ? false : true}
                        />
                    </Col>

                    {/* ---------------------- Category parameters ------------------------------------------------ */}
                    <Parameters
                        params={categoryParameters}
                        lot={lot}
                        setNumericParameters={setNumericParameters}
                        setOptions={setOptions}
                        options={options}
                        numericParameters={numericParameters}
                    />
                    {/* ---------------------- Not Gold ----------------------------------------------------------- */}
                    {!gold ? (
                        <>
                            {selectedCategory && selectedCategory.isDescriptionEnabled && <>
                                <Col xs={12}>
                                    <hr className="horizontal" />
                                </Col>
                                <Col xs={12} sm={3} md={2}>
                                    Описание:
                                </Col>
                                <Col xs={12} sm={9} md={10}>
                                    <input
                                        type="text"
                                        placeholder="Описание"
                                        defaultValue={lot && description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Col>
                            </>}

                            <Col xs={12}>
                                <hr className="horizontal" />
                            </Col>
                            <Col xs={12} sm={3} md={2}>
                                Цена:
                            </Col>
                            <Col xs={12} sm={6} md={4} className="d-flex align-items-center">
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="flex-1"
                                    defaultValue={lot && price}
                                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                                />
                                <span className="ms-3">руб.</span>
                            </Col>
                            {selectedCategory && !selectedCategory.isAmountAlwaysOne && <>
                                <Col xs={12} sm={3} md={2}>
                                    Количество:
                                </Col>
                                <Col xs={12} sm={6} md={4} className="d-flex align-items-center">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="flex-1"
                                        defaultValue={lot && amount}
                                        onChange={(e) => setAmount(e.target.valueAsNumber)}
                                    />
                                    <span className="ms-3"></span>
                                </Col>
                            </>}
                            <Col xs={12}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={active}
                                        onChange={(e) => setActive(e.target.checked)}
                                    />
                                    <span>Активное</span>
                                </label>
                            </Col>
                            <Col xs={12}>
                                <hr className="horizontal" />
                            </Col>
                            {/* ---------------------- Gold --------------------------------------------------------------- */}
                        </>
                    ) : (
                        <Col xs={12}>
                            <Table borderless responsive className="my-4">
                                <thead>
                                    <tr>
                                        <th>Показать</th>
                                        <th>Наличие</th>
                                        <th>
                                            Цена, руб. <div>за 1 000 ед.</div>
                                        </th>
                                        <th>
                                            Мин. сумма заказа <div>чем меньше, тем лучше</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="centered">
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={active}
                                                    onChange={(e) => setActive(e.target.checked)}
                                                />
                                            </label>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                defaultValue={lot && amount}
                                                onChange={(e) => setAmount(e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                defaultValue={lot && price}
                                                onChange={(e) => setPrice(e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td className="d-flex align-items-center">
                                            <input
                                                type="number"
                                                defaultValue={lot && minPrice}
                                                onChange={(e) => setMinPrice(e.target.valueAsNumber)}
                                            />
                                            <span className="ms-3">руб.</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    )}
                </Row>
                <div className="d-flex">
                    <button type="button" className="btn-5" onClick={() => addLot()}>
                        Опубликовать объявление
                    </button>
                    <button type="reset" className="btn-1 ms-2 ms-sm-3">
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostAd
