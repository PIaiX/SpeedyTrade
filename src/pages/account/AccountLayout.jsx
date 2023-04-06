import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountMenu from './AccountMenu'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'

const AccountLayout = ({ isMobile }) => {
    const user = useSelector(state => state.auth.user)

    return (
        <main className="account">
            <Container>
                {isMobile ? (
                    <Outlet />
                ) : (
                    <section className="pt-4 mb-6">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="mb-0">Личный кабинет</h1>
                            <div>
                                Баланс: <span className="fw-5">{user.balance}</span>
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
            </Container>
        </main>
    )
}

export default AccountLayout
