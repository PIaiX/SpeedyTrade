import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import StarRating from '../components/utils/StarRating';

const UserPage = () => {
    return (
        <main>
            <Container>
                <section className='user-page pt-5 mb-6'>
                    <Row className='gy-4 gy-sm-5 gy-lg-0 gx-4 gx-xxl-5'>
                        <Col sm={5} md={4} lg={3}>
                            <img src='imgs/user.png' alt='' className='img'/>
                        </Col>
                        <Col sm={7} md={8} lg={4} xl={3}>
                            <h4>Колесникова Ирина</h4>
                            <StarRating rate={4.1} className='justify-content-start'/>
                            <p className='mt-4'>На сайте с сентября 2019 г.</p>
                        </Col>
                        <Col xs={12} lg={5} xl={6}>
                            <Row className='info g-2 g-sm-4'>
                                <Col xs={5}>Имя:</Col>
                                <Col xs={7}>Ирина</Col>
                                <Col xs={5}>Фамилия:</Col>
                                <Col xs={7}>Колесникова</Col>
                                <Col xs={5}>Ник:</Col>
                                <Col xs={7}>Irishka1911</Col>
                                <Col xs={5}>Пол:</Col>
                                <Col xs={7}>Женский</Col>
                                <Col xs={5}>Дата рождения::</Col>
                                <Col xs={7}>11.11.2001</Col>
                            </Row>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default UserPage;