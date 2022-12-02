import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoginForm from '../components/forms/LoginForm'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state?.auth?.isAuth)

    useEffect(() => {
        if (isAuth) navigate('/account')
    }, [isAuth])

    return (
        <main>
            <Container>
                <section className="pt-4 pt-sm-5 mb-6">
                    <Row className="justify-content-center">
                        <Col xs={12} lg={10} xl={8} xxl={7}>
                            <h1 className="text-center">Вход</h1>
                            <LoginForm />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Login
