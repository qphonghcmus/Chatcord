import React, { createContext, useState } from "react";

export const UserInfoContext = createContext();

export default function UserInfoContextProvider(props) {
    const [userInfo, setUserInfo] = useState(null);

    const updateUserInfo = (info) => {
        setUserInfo(info);
    };

    return (
        <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
            {props.children}
        </UserInfoContext.Provider>
    );
}
