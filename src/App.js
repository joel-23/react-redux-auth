import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// import store from "./store";
import { persistor, store } from "./store";
import "semantic-ui-css/semantic.min.css";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
