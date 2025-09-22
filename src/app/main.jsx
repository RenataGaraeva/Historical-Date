/*const ReactDOM = require("react-dom/client");
import React from 'react'

import App from "./App.jsx";
ReactDOM.createRoot(
    document.getElementById("app")
)
    .render(
        <App />
    );


 */

import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);