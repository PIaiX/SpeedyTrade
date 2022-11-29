import React, {useEffect} from 'react'
import AppRouter from './routes/AppRouter'
import fingerprint from '@fingerprintjs/fingerprintjs'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.min.css'

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
