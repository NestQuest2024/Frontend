'use client';

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getCookie, deleteCookie, setCookie } from 'cookies-next';

interface ContextProps {
    children: ReactNode;
}

interface UserInfo {
    id: number;
    email: string;
    firsName: string;
    lastName: string;
    userType: string;
}

export const Context = createContext<any>(null);

export const Provider: React.FC<ContextProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //const [isloading, setIsloading] = useState(true)
    //const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuthentication = async () => {
            if (getCookie('token')) {
                setIsAuthenticated(true);
                await getUserInfo();
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuthentication();
    }, []);
    
    function signOut() {
        deleteCookie('token');
        deleteCookie('userType');
        setIsAuthenticated(false);
    }

    const getUserInfo = async (): Promise<UserInfo | null> => {
        try {
            const token = await getCookie('token');

            const response = await fetch('https://localhost:7215/api/Users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userInfo = await response.json();
                
                setIsAuthenticated(true);
                setCookie('userType', userInfo.userInfo.userType);

                return userInfo;
            } else {
                console.error('Failed to get user information:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error while fetching user information:', error);
            return null;
        }
    };

    return (
        <Context.Provider value={{ isAuthenticated, setIsAuthenticated, signOut, getUserInfo }}>
            {children}
        </Context.Provider>
    );
};