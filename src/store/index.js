import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const persistConfig = {
  key: "root",
  storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

// export default createStore(
//   rootReducer,
//   initialState,
//   applyMiddleware(thunk, logger)
// );

export const store = createStore(
  pReducer,
  initialState,
  applyMiddleware(thunk, logger)
);
export const persistor = persistStore(store);
