import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from './providers/ThemeProvider'
import App from './App'
import {Provider} from 'react-redux'
import index from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={index}>
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
