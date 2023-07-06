import React, {useState} from 'react'
import {submitPurchase} from '../services/lots'
import Dropdown from 'react-bootstrap/Dropdown'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiHelpCircle, BiLike} from 'react-icons/bi'
import {BsChatText} from 'react-icons/bs'
import Modal from "react-bootstrap/Modal";
import {VscChromeClose} from "react-icons/vsc";
import InputRating from "./utils/InputRating";
import ValidateWrapper from "./UI/ValidateWrapper";
import {useForm} from "react-hook-form";
import {createReview} from "../services/reviews";
import {dispatchAlert} from "../helpers/alert";
import {emitCallForHelp} from '../services/sockets/messages'
import {Link} from "react-router-dom";

const AdsTr3 = (props) => {

    const [status, setStatus] = useState(props?.status)
    const [showReview, setShowReview] = useState(false)
    const [rating, setRating] = useState(1)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const handler = () => {
        submitPurchase(props?.purchaseId)
            .then(res => setStatus(res.body.statusForUser))
    }

    const onSubmitCreateReview = (data) => {
        const req = { ...data, rating, lotId: props?.lotId }
        createReview(req)
            .then(() => {
                setShowReview(false)
                dispatchAlert('success', 'Отзыв успешно отправлен')
            })
            .catch(() => dispatchAlert('danger', 'Произошла ошибка'))
    }

    const handleHelp = () => {
        emitCallForHelp(+props.lotId)
            .then(res => console.log(res))
            .catch(e => console.log('error' + e))
    }

    return (
        <tr>
            <td>{props?.createdAt}</td>
            <td>{props?.purchaseId}</td>
            <td>{props?.description}</td>
            <td><Link to={`/user/${props?.userId}`}>{props?.userNickname}</Link></td>
            <td>{status}</td>
            <td>{props?.price} руб.</td>
            <td>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <IoEllipsisHorizontal />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {props.isMyLot==false && props.statusForClick==0 &&
                            <Dropdown.Item as="button">
                                <BiLike />
                                <div onClick={handler}>Подтвердить</div>
                            </Dropdown.Item>
                        }
                        <Dropdown.Item as="button" onClick={() => setShowReview(true)}>
                            <BsChatText />
                            <div>Оставить отзыв</div>
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleHelp}>
                            <BiHelpCircle />
                            <div>Запросить помощь</div>
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <Modal show={showReview} onHide={() => setShowReview(false)}>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="color-1">Оставьте отзыв</h3>
                        <button type="button" onClick={() => setShowReview(false)} className="btn-4 px-3 py-2">
                            <VscChromeClose />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitCreateReview)}>
                        <div className="mb-2">Приобретенный лот:</div>

                        <input
                            disabled
                            style={errors.lotId ? { borderColor: 'red' } : undefined}
                            {...register('lotId', { value: props?.description })}
                        />
                        <div className="mt-4 mb-2">Ваша оценка:</div>
                        <InputRating className="fs-15" seterRating={setRating} />
                        <div className="mt-4 mb-2">Текст отзыва:</div>
                        <ValidateWrapper error={errors?.text}>
                            <textarea
                                rows={5}
                                placeholder="Отзыв"
                                {...register('text', { required: 'Заполните поле' })}
                            />
                        </ValidateWrapper>
                        <button type="submit" className="btn-5 w-100 mt-4">
                            Отправить
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </tr>
    )
}

export default AdsTr3
