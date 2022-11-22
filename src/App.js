import React, {useEffect} from 'react'
import AppRouter from './routes/AppRouter'
import fingerprint from '@fingerprintjs/fingerprintjs'
import {useDispatch, useSelector} from 'react-redux'

function App() {
    useEffect(() => {
        fingerprint
            .load()
            .then((fp) => fp.get())
            .then((result) => {
                localStorage.setItem('fingerprint', result.visitorId)
            })
    }, [])

    return <AppRouter />
}
export default App
