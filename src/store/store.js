import { createStore, compose } from "redux";
import { appReducer } from "../reducers/appReducer";

const composeEnhancer =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(appReducer, composeEnhancer());

export default store;
