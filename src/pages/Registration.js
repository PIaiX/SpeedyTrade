import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../components/utils/InputPassword'
import { Link } from 'react-router-dom'

const Registration = () => {
    return (
        <main>
            <Container>
                <section className='pt-4 pt-sm-5 mb-6'>
                    <Row className='justify-content-center'>
                        <Col xs={12} lg={10} xl={8} xxl={7}>
                            <h1 className='text-center'>Регистрация</h1>
                            <form>
                                <Row className='g-3 g-sm-4 align-items-center'>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Имя:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <input type='text' placeholder='Имя' />
                                    </Col>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Фамилия:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <input type='text' placeholder='Фамилия' />
                                    </Col>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Ник:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <input type='text' placeholder='Ник' />
                                    </Col>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Email:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <input type='email' placeholder='Email' />
                                    </Col>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Пароль:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <InputPassword />
                                    </Col>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Подтверждение пароля:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <InputPassword />
                                    </Col>
                                </Row>
                                <label className='mt-4'>
                                    <input type='checkbox' />
                                    <span>Запомнить меня</span>
                                </label>
                                <button type='submit' className='btn-5 fs-13 mt-4 mx-auto'>Зарегистрироваться</button>
                                <p className='text-center achromat-3 fs-08 mt-3'>Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия<br/> <Link to='/'>пользовательского соглашения</Link></p>
                                <h6 className='mt-4 mt-sm-5 text-center'>У Вас уже аккаунт? <Link to='/login' className='color-1'>Войти</Link></h6>
                            </form>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default Registration;