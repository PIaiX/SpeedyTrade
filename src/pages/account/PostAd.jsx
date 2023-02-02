import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {getAllGames, getGameRegions, getCategories, getCategoryParameters} from '../../services/games'
import {getLot, postLot, editLot} from '../../services/lots'
import swal from 'sweetalert'

const PostAd = () => {
    const {lotId} = useParams()
    const [lot, setLot] = useState()

    // Games
    const [selectedOptionGame, setSelectedOptionGame] = useState(null)
    const [optionsGames, setOptionsGames] = useState([])
    // Regions
    const [selectedOptionRegion, setSelectedOptionRegion] = useState(null)
    const [optionsRegion, setOptionsRegion] = useState([])
    // Lot category
    const [selectedOptionCategory, setSelectedOptionCategory] = useState(null)
    const [optionsCategory, setOptionsCategory] = useState([])
    // Gold
    const [gold, setGold] = useState(false)
    // Parameters
    const [categoryParameters, setCategoryParameters] = useState([])
    // Options
    const [options, setOptions] = useState({})
    // description
    const [description, setDescription] = useState('')
    // Price
    const [price, setPrice] = useState(0)
    // Min Price
    const [minPrice, setMinPrice] = useState(0)
    // Amount
    const [amount, setAmount] = useState(0)
    // Active
    const [active, setActive] = useState(false)
    // User
    const userId = useSelector((state) => state.auth.user.id)
    const navigate = useNavigate()

    // Опциии для использование с react-select
    const getOptions = (res) => {
        let arr = []
        res?.map((el) => {
            return arr.push({value: el.id, label: el.name, currency: el.isCurrency})
        })
        return arr
    }

    const postBody = {
        isVisible: active,
        description: description,
        price: price,
        amount: amount,
        userId: userId,
        categoryId: selectedOptionCategory ? selectedOptionCategory.value : null,
        regionId: selectedOptionRegion ? selectedOptionRegion.value : null,
        minPrice: minPrice,
        options: Object.values(options),
    }

    const addLot = () => {
        if (
            selectedOptionGame &&
            selectedOptionCategory &&
            selectedOptionRegion &&
            description &&
            price &&
            price <= 10000000 &&
            amount &&
            categoryParameters.length === Object.values(options).length
        ) {
            if (lot) {
                // Редактирование лота
                editLot(lot.id, postBody)
                    .then((res) =>
                        res.status === 500
                            ? swal('Ошибка', 'Ошибка при отправке запроса', 'error')
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
                            ? swal('Ошибка', 'Ошибка при отправке запроса', 'error')
                            : swal('Успешно', 'Лот размещен', 'success').then(() => navigate('/account/ads'))
                    )
                    .catch(() => swal('Ошибка', 'Ошибка при отправке запроса', 'error'))
            }
        } else {
            price > 10000000
                ? swal({text: 'Цена не более 10 000 000', icon: 'error'})
                : swal({text: 'Необходимо заполнить все поля', icon: 'error'})
        }
    }

    // fetch games
    useEffect(() => {
        getAllGames()
            .then((res) => getOptions(res))
            .then((arr) => arr && setOptionsGames(arr))
    }, [])

    //fetch regions & categories
    useEffect(() => {
        if (selectedOptionGame) {
            setSelectedOptionRegion(null)
            setOptionsRegion([])
            getGameRegions(selectedOptionGame.value)
                .then((res) => getOptions(res))
                .then((arr) => arr && setOptionsRegion(arr))
            setSelectedOptionCategory(null)
            setOptionsCategory([])
            getCategories(selectedOptionGame.value)
                .then((res) => getOptions(res))
                .then((arr) => arr && setOptionsCategory(arr))
        } else {
            setSelectedOptionRegion(null)
            setOptionsRegion([])
            setSelectedOptionCategory(null)
            setOptionsCategory([])
        }
    }, [selectedOptionGame])

    //fetch parameters
    useEffect(() => {
        setCategoryParameters([])
        if (selectedOptionCategory) {
            if (lot) {
                let optionsObjects = lot.options.map((option) => ({[option.parameterId]: option.id}))
                let lotOptions = Object.assign({}, ...optionsObjects)
                selectedOptionCategory?.value === lot.categoryId ? setOptions(lotOptions) : setOptions({})
            }
            getCategoryParameters(selectedOptionCategory.value).then((arr) => arr && setCategoryParameters(arr))
            if (selectedOptionCategory.currency) {
                setGold(true)
                setDescription('Золото')
            } else {
                setGold(false)
            }
        }
    }, [selectedOptionCategory])

    // Edit lot -----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (!lotId) return

        getLot(lotId).then((res) => setLot(res))
    }, [lotId])

    useEffect(() => {
        if (!lot) return

        !selectedOptionGame && setSelectedOptionGame(optionsGames.find((o) => o.value === lot.gameInfo.id))
        !selectedOptionRegion && setSelectedOptionRegion(optionsRegion.find((o) => o.value === lot.regionId))
        !selectedOptionCategory && setSelectedOptionCategory(optionsCategory.find((o) => o.value === lot.categoryId))
        !description && setDescription(lot.description)
        !amount && setAmount(lot.amount)
        !active && setActive(lot.isVisible)
        !price && setPrice(lot.price)
        lot.minPrice && setMinPrice(lot.minPrice)
    }, [lot, optionsRegion, optionsCategory])

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
                            onChange={setSelectedOptionGame}
                        />
                    </Col>
                    {/* ---------------------- Region ------------------------------------------------------------- */}
                    <Col xs={12} sm={3} md={2}>
                        Регион:
                    </Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select
                            name="region"
                            placeholder="Выбрать"
                            classNamePrefix="react-select"
                            options={optionsRegion}
                            isClearable={true}
                            isSearchable={true}
                            value={selectedOptionRegion}
                            onChange={setSelectedOptionRegion}
                            isDisabled={optionsRegion.length === 0 ? true : false}
                        />
                    </Col>
                    {/* ---------------------- Lot Category ------------------------------------------------------- */}
                    <Col xs={12} sm={3} md={2}>
                        Категория лота:
                    </Col>
                    <Col xs={12} sm={9} md={10}>
                        <Select
                            name="lot-category"
                            placeholder="Выбрать"
                            classNamePrefix="react-select"
                            options={optionsCategory}
                            isClearable={true}
                            isSearchable={true}
                            value={selectedOptionCategory}
                            onChange={setSelectedOptionCategory}
                            isDisabled={optionsCategory.length === 0 ? true : false}
                        />
                    </Col>
                    {categoryParameters?.map((parameter) => {
                        let options = getOptions(parameter.options)
                        let lotOption = lot ? lot.options.find((o) => o.parameterId == parameter.id)?.id : null
                        return (
                            <React.Fragment key={parameter.id}>
                                <Col xs={12} sm={3} md={2}>
                                    {parameter.name}:
                                </Col>
                                <Col xs={12} sm={9} md={10}>
                                    <Select
                                        name="item"
                                        placeholder="Выбрать"
                                        classNamePrefix="react-select"
                                        options={options}
                                        isClearable={true}
                                        isSearchable={true}
                                        defaultValue={options.find((o) => o.value === lotOption)}
                                        onChange={(e) =>
                                            setOptions((options) => ({
                                                ...options,
                                                [parameter.id]: e?.value,
                                            }))
                                        }
                                    />
                                </Col>
                            </React.Fragment>
                        )
                    })}
                    {/* ---------------------- Not Gold ----------------------------------------------------------- */}
                    {!gold ? (
                        <>
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
