import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import App from "./App";
import moment from "moment";
import momentRu from "moment/locale/ru";
import { NotificationContainer } from "react-notifications";
moment.updateLocale("ru", momentRu);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <NotificationContainer />
    </PersistGate>
  </Provider>
);