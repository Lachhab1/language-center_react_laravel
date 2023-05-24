import React from "react"
import { Link } from "react-router-dom" 
import photo_profile from "../images/photo-profile.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Nav, Navbar } from "react-bootstrap";
import { EnvelopeIcon,BellIcon } from '@heroicons/react/24/outline'
import { UseStateContext } from "../context/ContextProvider";

export default function Topbar() {
    const {logout,user} = UseStateContext();
    if(user && user.role === "admin")
    {
    
    return (
            <Navbar style={{height: "60px"}}  className="Topbar order-3" >
                <Container  className="w-100 d-flex justify-content-end align-items-center">
                    <Nav className="">
                        <Nav.Link as={Link} to="/dashboard"> <EnvelopeIcon width={25} className="text-danger" /></Nav.Link>
                        <Nav.Link as={Link} to="/dashboard"><BellIcon width={25} className="text-danger"/></Nav.Link>
                        <Nav.Link className="profile-photoContainer">
                            <img src={photo_profile} className="pPhoto" />
                        </Nav.Link>
                        <NavDropdown drop={"down-centered"} align={ "end" }  title={user && user.username} id="nav-dropdown">
                                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    </Container>
            </Navbar>  
    )
    }else if (user && user.role === "secretary")
    {
        return (
            <Navbar style={{height: "60px"}}  className="Topbar order-3" >
                <Container  className="w-100 d-flex justify-content-end align-items-center">
                    <Nav className="">
                        <Nav.Link as={Link} to="/secretary/dashboard"> <EnvelopeIcon width={25} className="text-danger" /></Nav.Link>
                        <Nav.Link as={Link} to="/secretary/dashboard"><BellIcon width={25} className="text-danger"/></Nav.Link>
                        <Nav.Link className="profile-photoContainer">
                            <img src={photo_profile} className="pPhoto" />
                        </Nav.Link>
                        <NavDropdown drop={"down-centered"} align={ "end" }  title={user && user.username} id="nav-dropdown">
                                <NavDropdown.Item as={Link} to="/secretary/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    </Container>
            </Navbar>  
        )
    } else if (user && user.role === 'director')
    {
        return (
            <Navbar style={{height: "60px"}}  className="Topbar order-3" >
                <Container  className="w-100 d-flex justify-content-end align-items-center">
                    <Nav className="">
                        <Nav.Link as={Link} to="/director/dashboard"> <EnvelopeIcon width={25} className="text-danger" /></Nav.Link>
                        <Nav.Link as={Link} to="/director/dashboard"><BellIcon width={25} className="text-danger"/></Nav.Link>
                        <Nav.Link className="profile-photoContainer">
                            <img src={photo_profile} className="pPhoto" />
                        </Nav.Link>
                        <NavDropdown drop={"down-centered"} align={ "end" }  title={user && user.username} id="nav-dropdown">
                                <NavDropdown.Item as={Link} to="/director/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    </Container>
            </Navbar>
        )
    }
}