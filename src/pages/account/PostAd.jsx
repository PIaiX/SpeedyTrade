import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
// import AdsTr2 from '../../components/AdsTr2'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {
    getAllGames,
    getGamePlatform,
    getGameRegions,
    getGameServers,
    getCategories,
    getCategoryParameters,
} from '../../services/games'
import {postLot} from '../../services/lots'
import swal from 'sweetalert'

const PostAd = () => {
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
    const [options, setOptions] = useState([])
    // description
    const [description, setDescription] = useState('')
    // Price
    const [price, setPrice] = useState(0)
    // Min Price
    const [minPrice, setMinPrice] = useState(0)
    // Amount
    const [amount, setAmount] = useState(0)
    // Active
    const [active, setActive] = useState(true)
    // User
    const userId = useSelector((state) => state.auth.user.id)
    const navigate = useNavigate()

    const getOptions = (res) => {
        let arr = []
        res?.map((el) => {
            return arr.push({value: el.id, label: el.name, currency: el.isCurrency})
        })
        return arr
    }

    const getOptionsById = (id, value) => {
        let arr = options.slice()
        let result = arr.find((o, i) => {
            if (o?.propertyId === id) {
                arr[i] = {propertyId: id, option: value}
                setOptions(arr)
                return true
            }
        })
        if (!result) setOptions((arr) => [...arr, {propertyId: id, option: value}])
    }

    const postBody = {
        isVisible: active,
        description: description,
        price: price,
        amount: amount,
        userId: userId,
        categoryId: selectedOptionCategory ? selectedOptionCategory.value : null,
        minPrice: minPrice,
        options: options.map((o) => o.option).filter(Number),
    }

    const addLot = () => {
        if (
            selectedOptionGame &&
            selectedOptionCategory &&
            description &&
            price &&
            price <= 10000000 &&
            amount &&
            categoryParameters.length === options.map((o) => o.option).filter(Number).length
        ) {
            postLot(postBody)
                .then((res) =>
                    res.status === 500
                        ? swal('Ошибка', 'Ошибка при отправке запроса', 'error')
                        : swal('Успешно', 'Лот размещен', 'success').then(() => navigate('/account/ads'))
                )
                .catch(() => swal('Ошибка', 'Ошибка при отправке запроса', 'error'))
        } else {
            console.log(postBody)
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

    //fetch platform & regions
    useEffect(() => {
        if (selectedOptionGame) {
            setSelectedOptionRegion(null)
            setOptionsRegion([])
            getGameRegions(selectedOptionGame.value)
                .then((res) => getOptions(res))
                .then((arr) => arr && setOptionsRegion(arr))
        } else {
            setSelectedOptionRegion(null)
            setOptionsRegion([])
        }
    }, [selectedOptionGame])

    //fetch servers & categories
    useEffect(() => {
        if (selectedOptionRegion) {
            setSelectedOptionCategory(null)
            setOptionsCategory([])
            getCategories(selectedOptionRegion.value)
                .then((res) => getOptions(res))
                .then((arr) => arr && setOptionsCategory(arr))
        } else {
            setSelectedOptionCategory(null)
            setOptionsCategory([])
        }
    }, [selectedOptionRegion])

    //fetch parameters
    useEffect(() => {
        setCategoryParameters([])
        setOptions([])
        if (selectedOptionCategory) {
            getCategoryParameters(selectedOptionCategory.value).then((arr) => arr && setCategoryParameters(arr))
            if (selectedOptionCategory.currency) {
                setGold(true)
                setDescription('Золото')
            } else {
                setGold(false)
            }
        }
    }, [selectedOptionCategory])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account/ads" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Мои объявления</h4>
            </div>
            <p className="mb-4">Добавление нового объявления</p>
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
                            isClearable={true}
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
                                        onChange={(e) => getOptionsById(parameter.id, e?.value)}
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
                                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                                />
                                <span className="ms-3"></span>
                            </Col>
                            <Col xs={12}>
                                <label>
                                    <input
                                        type="checkbox"
                                        defaultChecked={true}
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
                                                    defaultChecked={true}
                                                    onChange={(e) => setActive(e.target.checked)}
                                                />
                                            </label>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                onChange={(e) => setAmount(e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                onChange={(e) => setPrice(e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td className="d-flex align-items-center">
                                            <input
                                                type="number"
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
