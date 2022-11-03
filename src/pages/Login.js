import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../components/utils/InputPassword'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <main>
            <Container>
                <section className='pt-4 pt-sm-5 mb-6'>
                    <Row className='justify-content-center'>
                        <Col xs={12} lg={10} xl={8} xxl={7}>
                            <h1 className='text-center'>Вход</h1>
                            <form>
                                <Row className='g-3 g-sm-4 align-items-center'>
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
                                </Row>
                                <div className='mt-4 d-flex align-items-center justify-content-between'>
                                    <label>
                                        <input type='checkbox' />
                                        <span>Запомнить меня</span>
                                    </label>
                                    <Link to='/reset-password' className='achromat-1 fw-5'>Забыли пароль?</Link>
                                </div>
                                <button type='submit' className='btn-5 fs-13 px-5 mt-4 mx-auto'>Войти</button>
                                <h6 className='mt-4 mt-sm-5 text-center'>У Вас еще нет аккаунта? <Link to='/registration' className='color-1'>Зарегистрироваться</Link></h6>
                            </form>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default Login;