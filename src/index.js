import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from './providers/ThemeProvider'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.min.css'
import {Provider} from 'react-redux'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
