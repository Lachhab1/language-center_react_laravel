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
    const [user,setUser] = useState(null);
    const [errors,setErrors] = useState([]);
    const csrf = () => axios.get("/sanctum/csrf-cookie");

                const getUser = async () => {
                    try {
                            const data = await axios.get('/api/user');
                            setUser(data.data);

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
    const logout = () => {
        axios.post('/api/logout').then(() => {
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