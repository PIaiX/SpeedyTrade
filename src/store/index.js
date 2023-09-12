import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authSlice";
import alertReducer from "./reducers/alertSlice";
import themeReducer from "./reducers/themeSlice";
import fingerprintReducer from "./reducers/fingerprintSlice";
import notificationReducer from "./reducers/notificationSlice";
import notificationMenuReducer from "./reducers/notificationMenuSlice";
import categoryReducer from "./reducers/categorySlice";
import { favoritesApi } from "../services/RTK/favoritesApi";
import { newsApi } from "../services/RTK/newsApi";
import { gamesApi } from "../services/RTK/gamesApi";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  theme: themeReducer,
  fingerprint: fingerprintReducer,
  notification: notificationReducer,
  notificationMenu: notificationMenuReducer,
  category: categoryReducer,

  [favoritesApi.reducerPath]: favoritesApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [gamesApi.reducerPath]: gamesApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "fingerprint", "notificationMenu"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(favoritesApi.middleware)
      .concat(newsApi.middleware)
      .concat(gamesApi.middleware),
});
const persistor = persistStore(store);

export { persistor };
export default store;
