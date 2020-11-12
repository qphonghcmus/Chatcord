import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserInfoContextProvider from "./contexts/UserInfoContext";
import SocketContextProvider from "./contexts/SocketContext";
import MessageContextProvider from "./contexts/MessageContext";

ReactDOM.render(
    <React.StrictMode>
        <SocketContextProvider>
            <MessageContextProvider>
                <UserInfoContextProvider>
                    <App />
                </UserInfoContextProvider>
            </MessageContextProvider>
        </SocketContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
