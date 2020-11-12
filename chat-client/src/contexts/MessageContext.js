import React, { createContext, useState, useEffect } from "react";

export const MessageContext = createContext();

export default function MessageContextProvider(props) {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        // console.log('im here',messages)
        setMessages((prevState) => [...prevState, message]);
    };
    return (
        <MessageContext.Provider value={{ messages, addMessage }}>
            {props.children}
        </MessageContext.Provider>
    );
}
