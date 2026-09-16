import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const API_URL = "https://bookstore-app-fss9.onrender.com/";

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    // Global search query string state shared across components
    const [searchQuery, setSearchQuery] = useState('');

    // Check if user is already logged in (Local Storage)
    useEffect(() => {
        const storedUser = localStorage.getItem("bookstoreUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // SIGNUP FUNCTION
    const signup = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/auth/signup`, userData);
            
            if (res.data.success) {
                setUser(res.data.user);
                localStorage.setItem("bookstoreUser", JSON.stringify(res.data.user));
                return true; 
            }
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed!");
            return false;
        }
    };

    // LOGIN FUNCTION
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            
            if (res.data.success) {
                setUser(res.data.user);
                localStorage.setItem("bookstoreUser", JSON.stringify(res.data.user));
                return true;
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed!");
            return false;
        }
    };

    // LOGOUT FUNCTION
    const logout = () => {
        setUser(null);
        localStorage.removeItem("bookstoreUser");
    };

    return (
        <AppContext.Provider value={{ user, cart, setCart, login, signup, logout, searchQuery, setSearchQuery }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);