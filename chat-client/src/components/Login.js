import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfoContext";
import { SocketContext } from "../contexts/SocketContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [changePage, setChangePage] = useState(false);
    const [url, setUrl] = useState("");
    const [selectOptions, setSelectOptions] = useState([]);
    const { updateUserInfo } = useContext(UserInfoContext);
    const { socket } = useContext(SocketContext);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeRoom = (selectedOption) => {
        setRoom(selectedOption.value);
    };

    const onHandleJoinChat = () => {
        if (username !== "" && room !== "") {
            updateUserInfo({
                username,
                room,
            });
            setUrl("/chat");
            socket.current.emit("joinRoom", { username, room });
        }
    };

    useEffect(() => {
        setSelectOptions([
            { value: "JavaScript", label: "JavaScript" },
            { value: "Python", label: "Python" },
            { value: "PHP", label: "PHP" },
            { value: "JC#", label: "C#" },
            { value: "Ruby", label: "Ruby" },
            { value: "Java", label: "Java" },
        ]);
    }, []);

    useEffect(() => {
        if (url !== "") {
            setChangePage(true);
        }
        return () => {};
    }, [url]);

    useEffect(() => {
        updateUserInfo({
            username,
            room,
        });
        return () => {};
    }, [username, room]);

    return (
        <div className="join-container">
            {changePage && <Redirect to={url} />}

            <header className="join-header">
                <h1>
                    <i className="fas fa-smile"></i> ChatCord
                </h1>
            </header>
            <main className="join-main">
                <form>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username..."
                            value={username}
                            required
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="room">Room</label>
                        <Select
                            name="room"
                            id="room"
                            onChange={onChangeRoom}
                            // value={room}
                            options={selectOptions}
                        ></Select>
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        onClick={onHandleJoinChat}
                    >
                        Join Chat
                    </button>
                </form>
            </main>
        </div>
    );
}
