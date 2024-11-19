// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext(); // Đảm bảo UserContext được export

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: '',
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
