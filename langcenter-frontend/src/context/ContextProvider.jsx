import axios from "../api/axios";
import { useContext, useState } from "react";
import {createContext,useEffect} from "react";
const stateContext = createContext({
    user: null,
    setUser: () => {},
    setToken: () => {},
    // getUser: () => {},
    login: () => {},
    logout: () => {}
})
export const ContextProvider = ({children}) => {
    const [token,_setToken] = useState(localStorage.getItem("ACCESS_TOKEN") ? localStorage.getItem("ACCESS_TOKEN") : null);
    const [user,setUser] = useState({});
    const [errors,setErrors] = useState([]);
    const setToken = (token) => {
        _setToken(token);
        if(token)
        {
            localStorage.setItem("ACCESS_TOKEN",token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
                const login = ({...dataform}) => {
                       axios.post('/api/login',dataform).then((response) => {
                        setUser(response.data.user);
                        setToken(response.data.token ? response.data.token : null);
                    })
                    .catch( (error) => {
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
                    )};
                        
            
            

    
    const logout = () => {
       axios.post('/api/logout').then(() => {
        setUser(null);
        setToken(null);
        }).catch((error) => {
        console.log(error);
        })
    }
    useEffect(() => {
        if(token)
        {
            axios.get('/api/user').then(({data}) => {
                setUser(data.user);
            }).catch((error) => {
                console.log(error);
            }
            )
            
        }
    
    },[]);
        return(
            <stateContext.Provider value={{
            user,
            setUser,
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