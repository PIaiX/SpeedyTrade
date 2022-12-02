import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../store/reducers/authSlice'
import alertReducer from '../store/reducers/alertSlice'
import themeReducer from '../store/reducers/themeSlice'
import fingerprintReducer from '../store/reducers/fingerprintSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer,
    fingerprint: fingerprintReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'fingerprint'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const index = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
const persistor = persistStore(index)

export {persistor}
export default index
