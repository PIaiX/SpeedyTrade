import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import StarRating from '../../components/utils/StarRating'
import UserPhoto from '../../components/utils/UserPhoto'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi"
import InputPassword from '../../components/utils/InputPassword'

export default function UserProfile() {
    return (
        <div className='main'>
            <div className='d-flex align-items-center mb-4'>
                <Link to='/account' className='btn-1 p-2 me-4 d-lg-none'><FiArrowLeft className='fs-15'/></Link>
                <h4 className='color-1 mb-0'>Профиль</h4>
            </div>
            <Row className='flex-lg-row-reverse'>
                <Col xs={12} xl={4}>
                    <div className='d-flex flex-column flex-sm-row flex-xl-column align-items-center mb-4 mb-xl-0'>
                        <UserPhoto imgUrl={'imgs/user.png'} name={'Колесникова Ирина'} />
                        <div className='d-flex flex-column align-items-center align-items-sm-start align-items-xl-center justify-content-center'>
                            <h4 className='color-1 mt-3 mt-sm-0 mb-2 mb-sm-4'>Колесникова Ирина</h4>
                            <StarRating className='justify-content-start justify-content-xl-center' rate={4.35} />
                            <div className='mt-2 mt-sm-4'>На сайте с сентября 2019 г.</div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} xl={8}>
                    <form>
                        <Row className='g-3 g-xl-4 align-items-center'>
                            <Col md={3}>
                                <div>Имя:</div>
                            </Col>
                            <Col md={9}>
                                <input type='text' placeholder='Имя' defaultValue={'Ирина'} />
                            </Col>
                            <Col md={3}>
                                <div>Фамилия:</div>
                            </Col>
                            <Col md={9}>
                                <input type='text' placeholder='Фамилия' defaultValue={'Колесникова'} />
                            </Col>
                            <Col md={3}>
                                <div>Ник:</div>
                            </Col>
                            <Col md={9}>
                                <input type='text' placeholder='Ник' defaultValue={'Irishka1911'} />
                            </Col>
                            <Col md={3}>
                                <div>Пол:</div>
                            </Col>
                            <Col md={9} className='d-flex'>
                                <label>
                                    <input type='radio' name='sex' defaultChecked={true}/>
                                    <span>Женский</span>
                                </label>
                                <label className='ms-4'>
                                    <input type='radio' name='sex' />
                                    <span>Мужской</span>
                                </label>
                            </Col>
                            <Col md={3}>
                                <div>Дата рождения:</div>
                            </Col>
                            <Col md={9} className='d-sm-flex'>
                                <select defaultValue={3}>
                                    <option disabled>день</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <select className='ms-sm-3 mt-2 ms-sm-0' defaultValue={3}>
                                    <option disabled>месяц</option>
                                    <option value={1}>января</option>
                                    <option value={2}>февраля</option>
                                    <option value={3}>марта</option>
                                    <option value={4}>апреля</option>
                                    <option value={5}>мая</option>
                                    <option value={6}>июня</option>
                                    <option value={7}>июля</option>
                                    <option value={8}>августа</option>
                                    <option value={9}>сентября</option>
                                    <option value={10}>октября</option>
                                    <option value={11}>ноября</option>
                                    <option value={12}>декабря</option>
                                </select>
                                <select className='ms-sm-3 mt-2 ms-sm-0' defaultValue={3}>
                                    <option disabled>год</option>
                                    <option value={1}>1990</option>
                                    <option value={2}>1991</option>
                                    <option value={3}>1992</option>
                                    <option value={4}>1993</option>
                                    <option value={5}>1994</option>
                                    <option value={6}>1995</option>
                                </select>
                            </Col>
                            <Col md={3}>
                                <div>Телефон:</div>
                            </Col>
                            <Col md={9}>
                                <input type='tel' placeholder='+7 (000) 000 00 00' defaultValue={'+7 (962) 123 56 89'} />
                            </Col>
                            <Col md={3}>
                                <div>Email:</div>
                            </Col>
                            <Col md={9}>
                                <input type='email' placeholder='email@email.com' defaultValue={'kolesnikovairina@mail.com'} />
                            </Col>
                            <Col md={9} offset={3}>
                                <label>
                                    <input type='checkbox' defaultChecked={true}/>
                                    <span>Получать уведомления на почту</span>
                                </label>
                            </Col>
                        </Row>
                        <div className='d-flex mt-4'>
                            <button type='submit' className='btn-5'>Сохранить изменения</button>
                            <button type='button' className='btn-1 ms-2 ms-sm-4'>Отмена</button>
                        </div>
                    </form>

                    <form className='mt-5'>
                        <h6>Изменить пароль</h6>
                        <Row className='g-3 g-xl-4 align-items-center'>
                            <Col md={3}>
                                <div>Старый пароль:</div>
                            </Col>
                            <Col md={9}>
                                <InputPassword />
                            </Col>
                            <Col md={3}>
                                <div>Новый пароль:</div>
                            </Col>
                            <Col md={9}>
                                <InputPassword />
                            </Col>
                            <Col md={3}>
                                <div>Повторить пароль:</div>
                            </Col>
                            <Col md={9}>
                                <InputPassword />
                            </Col>
                            <Col xs={12}><button type='submit' className='btn-5'>Сохранить</button></Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    )
}