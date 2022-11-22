import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {authSlice} from './reducers/authSlice'

const store = configureStore({
    reducer: {
        user: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
