import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./App";

import { projectAuth } from "./firebase/config";

let app;

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById("root")
        );
    }
});
