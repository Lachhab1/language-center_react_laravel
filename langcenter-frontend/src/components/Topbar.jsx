import React from "react"
import { Link } from "react-router-dom" 
import mail from "../images/icons/mail.svg"
import bill from "../images/icons/bill.svg"
import photo_profile from "../images/photo-profile.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaBars } from "react-icons/fa"



export default function Topbar(props) {

    const { onShowSidebar } = props;
    return (
            <div className="Topbar" >
                <div className="d-flex justify-content-between m-2">
                    <button onClick={onShowSidebar} className="OpenCloseBtn"><FaBars /></button>
                    <div className="profile-section ">
                        <a href="#"><img src={mail} /></a>
                        <a href="#" ><img src={bill} style={{ marginRight: "10px" }} /></a>
{/* 
//not workin link
                        <div className="a nav-link dropdown-toggle" id="profile" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                            <div className="dropdown-menu dropdown-menu-right profileDropdown" aria-labelledby="profile">
                                <Link className="dropdown-item" to="/settings" >Settings </Link>
                                <a className="dropdown-item" href="#">Se deconnecter </a>
                            </div>
                        </div> */}
                        {/*thats wroks fine */}
                        <div className="profile-photoContainer">

                        <img src={photo_profile} className="pPhoto" />
                        </div>
                            <NavDropdown className="m-2" id="nav-dropdown">
                                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>

                    </div>
                </div>

            </div>  
    )
}