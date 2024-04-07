// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React Imports
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE } from '../api_constants';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    useEffect(() => {
        async function runAsync() {
            try {
                const response = await axios.get(`${API_BASE}/auth/authenticate`, { withCredentials: true })

                login()
                if (response.data.isAdmin) {
                    setIsAdmin(true)
                }
            } catch (e) {
                logout()
            }
        }

        runAsync()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
