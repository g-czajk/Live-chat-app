import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./App";

import { projectAuth } from "./firebase/config";

import store from "./store/store";
import { Provider } from "react-redux";

let app;

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>,
            document.getElementById("root")
        );
    }
});
