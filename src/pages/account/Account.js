import React from 'react'
import Container from 'react-bootstrap/Container'
import useIsMobile from '../../hooks/isMobile'
import AccountRouter from '../../routes/AccountRouter'

export default function Account() {
    const {mobile} = useIsMobile()

    return (
        <main>
            <Container className="account mb-8">
                <AccountRouter isMobile={mobile} />
            </Container>
        </main>
    )
}
