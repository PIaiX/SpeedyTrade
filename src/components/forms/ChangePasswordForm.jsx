import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputPassword from '../utils/InputPassword'

const ChangePasswordForm = () => {
    return (
        <form className="mt-5">
            <h6>Изменить пароль</h6>
            <Row className="g-3 g-xl-4 align-items-center">
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
                <Col xs={12}>
                    <button type="submit" className="btn-5">
                        Сохранить
                    </button>
                </Col>
            </Row>
        </form>
    )
}

export default ChangePasswordForm
