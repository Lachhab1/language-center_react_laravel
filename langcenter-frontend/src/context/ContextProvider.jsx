import { useContext, useState } from "react";
import {createContext} from "react";

const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})
export const ContextProvider = ({children}) => {
    const [user,setUser] = useState({});
    const [token,_setToken] = useState(1);

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCES_TOKEN',token)
        } else{
            localStorage.removeItem('ACCES_TOKEN')
        }
    }
        return(
        <stateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </stateContext.Provider>
    )
}
export const UseStateContext = () => useContext(stateContext)