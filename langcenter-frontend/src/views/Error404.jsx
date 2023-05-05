import { Link } from "react-router-dom" 
import {MdOutlineKeyboardBackspace} from "react-icons/md"

export default function Error404(){
    const style = {
        backgroundColor :"#242b5e",
        height : "calc(100vh - 60px)",
        opacity : "0.9"
    }
    const styleText = {
        color : "white" ,
        opacity : "0.5"
    }
    
    return(
        <div style={style}>
            <h1 style={{ fontSize:"14em" , ...styleText}}>404 </h1>
            <h3 style={styleText}>Oops! It seems like the page you were looking for doesn't exist or has been moved.
                 We apologize for any inconvenience this may have caused. </h3>
            <Link to="/"><MdOutlineKeyboardBackspace/> Go back to Home</Link>
        </div>
    )
}