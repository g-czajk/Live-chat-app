import { createStore, compose, applyMiddleware } from "redux";
import { appReducer } from "../reducers/appReducer";
import thunk from "redux-thunk";

const composeEnhancer =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
