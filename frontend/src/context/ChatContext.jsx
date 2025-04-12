import React, { createContext, useEffect, useState } from 'react'
import api from '../config/axios'

export const ChatContext = createContext()

const ChatContextProvider = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/check");
                setUser(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("User not authenticated");
            }
        }

        fetchUser();
    }, []);

    const contextValue = {
        user,
        setUser,
    };

    return (
        <ChatContext.Provider value={contextValue}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider
