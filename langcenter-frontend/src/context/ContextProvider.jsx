import axios from "../api/axios";
import { useContext, useState } from "react";
import {createContext} from "react";
import { useEffect } from "react";
const stateContext = createContext({
    user: null,
    setUser: () => {},
    setToken: () => {},
    getUser: () => {},
    login: () => {},
    logout: () => {}
})
export const ContextProvider = ({children}) => {
    const [user,setUser] = useState(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")):null);
    const [errors,setErrors] = useState([]);
    const csrf = () => axios.get("/sanctum/csrf-cookie");
    
                const getUser = async () => {
                    try {
                            const data = await axios.get('/api/user');
                            sessionStorage.setItem("user",JSON.stringify(data.data));
                            setUser(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")):null);
                    } catch (error) {
                        console.log(error);
                    }
                }
                const login = async ({...data}) => {
                    await csrf();
                    try {
                        await axios.post('/api/login',data);
                        await getUser();
        } catch (error) {
            if(error.response.status === 422)
            {
                setErrors(error.response.data.errors);
            }
        }
        
    }
    const logout = async () => {
        sessionStorage.removeItem("user");
        console.log("logout");
        console.log(sessionStorage.getItem("user"));
        await axios.post('/api/logout').then(() => {
            setUser(null);
        })
        
    }
        return(
            <stateContext.Provider value={{
            user,
            setUser,
            getUser,
            login,
            logout,
        }}>
            {children}
        </stateContext.Provider>
    )
}
export const UseStateContext = () => useContext(stateContext)