
const ReactDOM = require("react-dom/client");

import React from 'react'

import MainApp from "./MainApp.jsx";
ReactDOM.createRoot(
    document.getElementById("app")
)
    .render(
        <MainApp />
    );