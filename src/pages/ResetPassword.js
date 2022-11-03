import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../components/utils/InputPassword'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    return (
        <main>
            <Container>
                <section className='pt-4 pt-sm-5 mb-6'>
                    <Row className='justify-content-center'>
                        <Col xs={12} lg={10} xl={8} xxl={7}>
                            <h1 className='text-center'>Восстановление пароля</h1>
                            <form>
                                <Row className='g-3 g-sm-4 align-items-center'>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Email:</h6>
                                    </Col>
                                    <Col md={8}>
                                        <input type='email' placeholder='Email' />
                                    </Col>
                                </Row>
                                <button type='submit' className='btn-5 fs-13 px-5 mt-4 mx-auto'>Восстановить пароль</button>
                            </form>
                            {/* Form 2 */}
                            <form>
                                <Row className='g-3 g-sm-4 align-items-center'>
                                    <Col md={4}>
                                        <h6 className='mb-0'>Новый пароль:</h6>
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
                                <button type='submit' className='btn-5 fs-13 px-5 mt-4 mx-auto'>Восстановить пароль</button>
                            </form>

                            <h6 className='mt-4 mt-sm-5 text-center'><Link to='/login' className='color-1'>Я вспомнил пароль</Link></h6>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default ResetPassword;