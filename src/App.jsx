import React, {useEffect} from 'react'
import AppRouter from './routes/AppRouter'
import fingerprint from '@fingerprintjs/fingerprintjs'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.min.css'
import {useDispatch} from 'react-redux'
import {initTheme} from './store/reducers/themeSlice'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initTheme())

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
