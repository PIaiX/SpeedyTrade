import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FiTrash2} from 'react-icons/fi'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import StarRating from './utils/StarRating'
import {getImageURL} from '../helpers/image'
import {useSelector} from 'react-redux'
import {deleteMyReview, editMyReview} from '../services/reviews'
import {dispatchAlert} from '../helpers/alert'
import Modal from "react-bootstrap/Modal";
import {VscChromeClose} from "react-icons/vsc";
import InputRating from "./utils/InputRating";
import ValidateWrapper from "./UI/ValidateWrapper";
import {useForm} from "react-hook-form";

const Review = (props) => {
    const {rating: r, reviewId} = props
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [showReview, setShowReview] = useState(false)
    const [rating, setRating] = useState(r)
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm()

    const EditReview = (data) => {
        editMyReview(reviewId, {...data, rating})
            .then(() => {
                dispatchAlert('success', 'Отзыв успешно изменён')
                props.seterRefetch()
                setShowReview(false)
            })
            .catch(() => dispatchAlert('danger', 'Произошла ошибка'))
    }

    const deleteReview = (reviewId) => {
        deleteMyReview(reviewId)
            .then(() => {
                dispatchAlert('success', 'Отзыв успешно удален')
                props.seterRefetch()
            })
            .catch(() => dispatchAlert('danger', 'Произошла ошибка'))
    }

    return (
        <div className="user-review">
            <div className="img">
                <Link to={+props?.userId === userId ? '/account/profile' : `/user/${props?.userId}`}>
                    <img src={getImageURL(props?.avatar)} alt="Владимирская Елена"/>
                </Link>
            </div>
            <div className="grid-1">
                <h4 className="color-1">
                    <Link to={+props?.userId === userId ? '/account/profile' : `/user/${props?.userId}`}>
                        {props?.fullName}
                    </Link>
                </h4>
            </div>
            <div className="grid-2">
                <h5>@{props?.nickname}</h5>
            </div>
            <div className="grid-3">
                <StarRating rate={props?.rating} className="justify-content-start"/>
            </div>
            <div className="grid-4">
                <time>{props?.created}</time>
            </div>
            <div className="grid-5">
                <p>{props.text}</p>
            </div>
            {props.myReview && (
                <div className="grid-6 mt-4 mt-sm-0">
                    <button className="pb-2 mx-2 mx-md-0" type="button" onClick={() => setShowReview(true)}>
                        <MdOutlineModeEditOutline className="fs-13"/>
                        <span className="ms-2">Редактировать</span>
                    </button>
                    <button type="button" className="pb-2" onClick={() => deleteReview(props.reviewId)}>
                        <FiTrash2 className="fs-13"/>
                        <span className="ms-2">Удалить</span>
                    </button>
                </div>
            )}
            <Modal show={showReview} onHide={() => setShowReview(false)}>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="color-1">Оставьте отзыв</h3>
                        <button type="button" onClick={() => setShowReview(false)} className="btn-4 px-3 py-2">
                            <VscChromeClose/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(EditReview)}>
                        {errors.lotId && <p style={{fontSize: '0.8em', color: 'red'}}>{errors.lotId.message}</p>}

                        <div className="mt-4 mb-2">Ваша оценка:</div>
                        <InputRating rating={rating} className="fs-15" seterRating={setRating}/>
                        <div className="mt-4 mb-2">Текст отзыва:</div>
                        <ValidateWrapper error={errors?.text}>
                            <textarea
                                rows={5}
                                placeholder="Отзыв"
                                {...register('text', {required: 'Заполните поле'})}
                            >
                                {props?.text}
                            </textarea>
                        </ValidateWrapper>
                        <button type="submit" className="btn-5 w-100 mt-4">
                            Отправить
                        </button>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Review
