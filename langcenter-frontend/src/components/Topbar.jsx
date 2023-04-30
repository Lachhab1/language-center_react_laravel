import React from "react"
import { Link } from "react-router-dom" 
import mail from "../images/icons/mail.svg"
import bill from "../images/icons/bill.svg"
import photo_profile from "../images/photo-profile.png"

import { FaBars } from "react-icons/fa"



export default function Topbar(props) {

    const { onShowSidebar } = props;
    return (
            <div className="Topbar" >
                <div className="d-flex justify-content-between m-2">

                    <button onClick={onShowSidebar} className="OpenCloseBtn"><FaBars /></button>

                    <div className="profile-section ">
                        <a href=""><img src={mail} /></a>
                        <a href="" ><img src={bill} style={{ marginRight: "10px" }} /></a>

                        <a class="a nav-link dropdown-toggle" href="#" id="profile" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={photo_profile} className="pPhoto" /> username
                            <div className="dropdown-menu dropdown-menu-right profileDropdown" aria-labelledby="profile">
                                <Link to="/settings" className="dropdown-item" >Settings </Link>
                                <a className="dropdown-item" href="#">Se deconnecter </a>
                            </div>
                        </a>

                    </div>
                </div>

            </div>  
    )
}