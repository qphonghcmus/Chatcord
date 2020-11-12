import React, { useContext, useState, useEffect, useRef } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import { Redirect } from "react-router-dom";
import { SocketContext } from "../contexts/SocketContext";
import { MessageContext } from "../contexts/MessageContext";

export default function Chat() {
    const { userInfo, updateUserInfo } = useContext(UserInfoContext);
    const { socket } = useContext(SocketContext);
    const { messages, addMessage } = useContext(MessageContext);

    const [userList, setUserList] = useState([]);
    const [room, setRoom] = useState("");

    const [chatMsg, setChatMsg] = useState("");

    const divChatMsg = useRef();
    const inputFile = useRef();

    useEffect(() => {
        if (userInfo) setRoom(userInfo.room);
        return () => {};
    }, []);

    useEffect(() => {
        if (socket.current !== null) {
            // get room and users
            socket.current.on("roomUsers", ({ room, users }) => {
                setRoom(room);
                setUserList(users);
            });

            socket.current.on("message", ({ message, img }) => {
                addMessage(message);
                // scrolldown
                divChatMsg.current.scrollTop = divChatMsg.current.scrollHeight;
            });
        }

        return () => {};
    }, [socket]);

    const onChangeChatMsg = (e) => {
        setChatMsg(e.target.value);
    };

    const handleOnClickSend = (e) => {
        e.preventDefault();
        console.log(inputFile.current.files[0]);
        socket.current.emit("chatMessage", chatMsg);
    };

    const handleOnClickLeaveRoom = (e) => {
        e.preventDefault();
        socket.current.disconnect();
        updateUserInfo(null);
    };

    return (
        <div>
            {userInfo === null ? (
                <Redirect to={"/"} />
            ) : (
                <div className="chat-container">
                    <header className="chat-header">
                        <h1>
                            <i className="fas fa-smile"></i> ChatCord
                        </h1>
                        <a className="btn" onClick={handleOnClickLeaveRoom}>
                            Leave Room
                        </a>
                    </header>
                    <main className="chat-main">
                        <div className="chat-sidebar">
                            <h3>
                                <i className="fas fa-comments"></i> Room Name:
                            </h3>
                            <h2 id="room-name">{room}</h2>
                            <h3>
                                <i className="fas fa-users"></i> Users
                            </h3>
                            <ul id="users">
                                {userList.map((user) => (
                                    <li key={user.id}>{user.username}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="chat-messages" ref={divChatMsg}>
                            {messages.map((message) => (
                                <div className="message">
                                    <p class="meta">
                                        {message.username}{" "}
                                        <span>{message.time}</span>
                                    </p>
                                    <p class="text">{message.text}</p>{" "}
                                </div>
                            ))}
                        </div>
                    </main>
                    <div className="chat-form-container">
                        <form id="chat-form">
                            <input
                                id="msg"
                                type="text"
                                placeholder="Enter Message"
                                required
                                autocomplete="off"
                                value={chatMsg}
                                onChange={onChangeChatMsg}
                            />
                            <input id="img" type="file" ref={inputFile} />
                            <button className="btn" onClick={handleOnClickSend}>
                                <i className="fas fa-paper-plane"></i> Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
