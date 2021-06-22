import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React from "react";
import ReactDOM from "react-dom";
//Setup redux
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/configStore";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,

    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
