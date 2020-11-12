import React, { createContext, useRef, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export default function SocketContextProvider(props) {
    const socket = useRef(null);
    useEffect(() => {
        if (socket.current === null) {
            socket.current = io.connect("http://localhost:4000/", {
                transports: ["websocket"],
            });
            socket.current.on("connect", function () {
                console.log("connected!");
            });
        }
        return () => {};
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );
}
