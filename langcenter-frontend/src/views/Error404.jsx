import { Link } from "react-router-dom" 
import {MdOutlineKeyboardBackspace} from "react-icons/md"
import { UseStateContext } from "../context/ContextProvider"

export default function Error404(){
    const {user} = UseStateContext();
    if(user && user.role === "admin")
    {
        return(
            <div style={{backgroundColor :"#242b5e",height : "calc(100vh - 60px)",opacity : "0.9"}}>
                <h1 style={{ fontSize:"14em" , color : "white" , opacity : "0.5"}}>404 </h1>
                <h3 style={{color : "white" , opacity : "0.5"}}>Oops! It seems like the page you were looking for doesn't exist or has been moved.
                     We apologize for any inconvenience this may have caused. </h3>
                <Link to={`/dashboard`}><MdOutlineKeyboardBackspace/> Go back to Dashboard</Link>
            </div>
        )
    }
    if (user && user.role === "director")
    {
        return(
            <div style={{backgroundColor :"#242b5e",height : "calc(100vh - 60px)",opacity : "0.9"}}>
                <h1 style={{ fontSize:"14em" , color : "white" , opacity : "0.5"}}>404 </h1>
                <h3 style={{color : "white" , opacity : "0.5"}}>Oops! It seems like the page you were looking for doesn't exist or has been moved.
                        We apologize for any inconvenience this may have caused. </h3>
                <Link to={`/directeur`}><MdOutlineKeyboardBackspace/> Go back to Dashboard</Link>
            </div>
        )
    }
    if (user && user.role === "secretary")
    {
        return(
            <div style={{backgroundColor :"#242b5e",height : "calc(100vh - 60px)",opacity : "0.9"}}>
                <h1 style={{ fontSize:"14em" , color : "white" , opacity : "0.5"}}>404 </h1>
                <h3 style={{color : "white" , opacity : "0.5"}}>Oops! It seems like the page you were looking for doesn't exist or has been moved.
                        We apologize for any inconvenience this may have caused. </h3>
                <Link to={`/secretary`}><MdOutlineKeyboardBackspace/> Go back to Dashboard</Link>
            </div>
        )
    }
}