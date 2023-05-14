import axios from "../api/axios";
import { useContext, useState } from "react";
import {createContext,useEffect} from "react";
import { createRoutesFromChildren } from "react-router-dom";
const stateContext = createContext({
    user: null,
    setUser: () => {},
    setToken: () => {},
    // getUser: () => {},
    login: () => {},
    logout: () => {}
})
export const ContextProvider = ({children}) => {
    const [token,_setToken] = useState(localStorage.getItem("ACCES_TOKEN"));
    const [user,setUser] = useState({});
    const [errors,setErrors] = useState([]);
    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const setToken = (token) => {
        _setToken(token);
        if(token)
        {
            localStorage.setItem("ACCES_TOKEN",token);
        } else {
            localStorage.removeItem("ACCES_TOKEN");
        }
    }
    
                // const getUser = () => {
                //            axios.get('/api/user').then((response) => {
                //             setUser(response.data);
                //             }).catch((error) => {
                //         console.log(error);
                //     }
                //             )};
                const login =({...dataform}) => {
                        axios.post('/api/login',dataform).then(({data}) => {
                            setUser(data.user);
                            setToken(data.token);
                        }).catch((error) => {  
                            if(error && error.response.status === 422)
                            {
                                if (error && error.response.data.errors) 
                                {
                                    setErrors(error.response.data.errors);
                                }else{
                                    setErrors(
                                        {
                                            "email": [response.data.message]
                                        }
                                    );

                                }
                            }
                }
                        )
            }
            

    
    const logout = () => {
        axios.post('/api/logout').then(() => {
            setUser(null);
            setToken(null);
        }).catch((error) => {
            console.log(error);
        }
                )
    }


    useEffect(() => {

        axios.get('/api/user').then(({data}) => {
            setUser(data.user);
        }).catch((error) => {
            console.log(error);
        }
                )},[]);

        return(
            <stateContext.Provider value={{
            user,
            setUser,
            // getUser,
            token,
            setToken,
            login,
            logout,
        }}>
            {children}
        </stateContext.Provider>
    )
}
export const UseStateContext = () => useContext(stateContext)