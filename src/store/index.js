import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './reducers/authSlice'
import alertReducer from './reducers/alertSlice'
import themeReducer from './reducers/themeSlice'
import fingerprintReducer from './reducers/fingerprintSlice'
import notificationReducer from './reducers/notificationSlice'
import {favoritesApi} from '../services/RTK/favoritesApi'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer,
    fingerprint: fingerprintReducer,
    notification: notificationReducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'fingerprint'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(favoritesApi.middleware),
})
const persistor = persistStore(store)

export {persistor}
export default store
