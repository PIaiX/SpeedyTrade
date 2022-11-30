import React from 'react'
import {Outlet} from 'react-router-dom'
import AccountMenu from './AccountMenu'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const AccountLayout = ({isMobile}) => {
    return (
        <>
            {isMobile ? (
                <Outlet />
            ) : (
                <section className="account pt-4 mb-6">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="mb-0">Личный кабинет</h1>
                        <div>
                            Баланс: <span className="fw-5">15 638 руб.</span>
                        </div>
                    </div>
                    <Row>
                        <Col md={4} lg={3}>
                            <AccountMenu />
                        </Col>
                        <Col md={8} lg={9}>
                            <Outlet />
                        </Col>
                    </Row>
                </section>
            )}
        </>
    )
}

export default AccountLayout
