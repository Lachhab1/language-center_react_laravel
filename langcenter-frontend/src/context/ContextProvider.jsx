import axios from "../api/axios";
import { useContext, useState } from "react";
import {createContext,useEffect} from "react";
const stateContext = createContext({
    variant: null,
    setVariant: () => {},
    user: null,
    notification: null,
    setNotification: () => {},
    token: null,
    errors: null,
    setUser: () => {},
    setToken: () => {},
    login: () => {},
    logout: () => {},
    setErrors: () => {},
})
export const ContextProvider = ({children}) => {
    const [variant,setVariant] = useState(null);
    const [token,_setToken] = useState(localStorage.getItem("ACCESS_TOKEN") ? localStorage.getItem("ACCESS_TOKEN") : null);
    const [user,setUser] = useState({});
    const [errors,setErrors] = useState([]);    
    const [notification, setNotification] = useState("");
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
                    .catch((error) => {
                        const {response} = error;
                        if(response && response.status === 422)
                        {
                                setErrors([{'email':response.data.errors.email}]);
                        }else if (response && response.status === 401) {
                            setErrors([{'email':response.data.message}]);
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
    const getUser = async() => {
        if(token)
        {
            axios.get('/api/user').then(({data}) => {
                setUser(data);
            }).catch((error) => {
                console.log(error);
            }
            )
            
        }
    }
    useEffect(() => {
        getUser();

    },[token]);
        return(
            <stateContext.Provider value={{
            user,
            notification,
            setNotification,
            variant,
            setVariant,
            setUser,
            token,
            setToken,
            login,
            logout,
            errors,
            setErrors,
        }}>
            {children}
        </stateContext.Provider>
    )
}
export const UseStateContext = () => useContext(stateContext)