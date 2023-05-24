import { Nav } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";

import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import centreLogo from "../images/EnglishCastle_HQ.png";
import cours from "../images/icons/cours.svg";
import dashboard from "../images/icons/dashboard.svg";
import empTemps from "../images/icons/empTemps.svg";
import enseignant from "../images/icons/enseignant.svg";
import etudiant from "../images/icons/etudiant.svg";
import groupes from "../images/icons/groupes.svg";
import disco from "../images/icons/logout.svg";
import paiements from "../images/icons/paiements.svg";
import parents from "../images/icons/parents.svg";
import presence from "../images/icons/presence.svg";
import salles from "../images/icons/salles.svg";
import { UseStateContext } from '../context/ContextProvider';


export default function SidebarDirecteur() {
    const { logout } = UseStateContext();
    const [openSidebar, setOpenSidebar] = useState(false);
    const handleOpen = () => {
        setOpenSidebar((prev) => !prev);
    }
    const handleLocalStorage = () => {
        localStorage.removeItem('ACCES_TOKEN');
        window.location.href = '/';
    }
    return (
        <div style={{ width: openSidebar ? "20%" : "auto" }} className="">

            <div className={` sidebar-container`} style={{ backgroundColor: "#242B5E" }} >
                <div className={`logo-container m-0 d-flex flex-row-reverse justify-content-between align-items-center`} >
                    <div className={openSidebar ? "w-25" : "w-100"}>
                        <button onClick={handleOpen} className="OpenCloseBtn2">{openSidebar ? <XMarkIcon width={25} className="text-white" style={{ color: "white" }} /> : <Bars3BottomLeftIcon width={40} className="text-white" />}</button>
                    </div>
                    <div className="ms-4">
                        {openSidebar && <Link className="" to="/director/dashboard"><img src={centreLogo} className="logo"></img></Link>}
                    </div>
                </div>

                <div className="Sidebar h-100 fs-6">
                    <Nav className="flex-column" defaultActiveKey="/director/dashboard" >
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/dashboard"><img src={dashboard} />{openSidebar && "Dashboard"}</NavLink></Nav.Item>
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/course"><img src={cours} />{openSidebar && "Course"}</NavLink></Nav.Item>
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/teacher"><img src={enseignant} />{openSidebar && "Teacher"}</NavLink></Nav.Item>
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/classroom"><img src={salles} />{openSidebar && "Classroom"}</NavLink></Nav.Item>
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/schedule"><img src={empTemps} />{openSidebar && "Schedule"}</NavLink></Nav.Item>
                       
                        {/* Paiements: le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}
                        {openSidebar ?
                            <Nav.Item className="nav-item link-light"><a className="a nav-link link-light  dropdown-toggle" href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} />{openSidebar && "Paiement"}</a>
                                <ul className="collapse
                        " id="dropFees" data-bs-parent="#menu" >
                                    <Nav.Item ><NavLink className="a nav-link link-light" to="/director/fees/teacher">Teacher fees </NavLink></Nav.Item>
                                    <Nav.Item ><NavLink className="a nav-link link-light" to="/director/fees/student">Student fees</NavLink></Nav.Item>
                                </ul>
                            </Nav.Item>
                            :
                            <Nav.Item className="nav-item"><a onClick={handleOpen} className="a nav-link link-light dropdown-toggle " href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} /></a>
                            </Nav.Item>
                        }

    

                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/student"><img src={etudiant} />{openSidebar && "Student"}</NavLink></Nav.Item>
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/parent"><img src={parents} />{openSidebar && "Parent"}</NavLink></Nav.Item>
                        <Nav.Item><NavLink className="a nav-link link-light" to="/director/class"><img src={groupes} />{openSidebar && "Class"}</NavLink></Nav.Item>

                        {/* Presences le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}

                        {openSidebar ?
                            <Nav.Item className="nav-item link-light"><a className="a nav-link link-light  dropdown-toggle" href="#dropPresence" id="menu" data-bs-toggle="collapse"><img src={presence} />{openSidebar && "Attendance"}</a>
                                <ul className="collapse " id="dropPresence" data-bs-parent="#menu" >
                                    <Nav.Item ><NavLink className="a nav-link link-light" to="/director/attendance/student">Student</NavLink></Nav.Item>
                                    <Nav.Item ><NavLink className="a nav-link link-light" to="/director/attendance/teacher">Teacher </NavLink></Nav.Item>
                                </ul>
                            </Nav.Item>
                            :
                            <Nav.Item className="nav-item"><a onClick={handleOpen} className="a nav-link link-light dropdown-toggle " href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={presence} /></a>
                            </Nav.Item>
                        }






                        <Nav.Link className='a nav-link link-light' onClick={logout}><img src={disco} />{openSidebar && "Logout"}</Nav.Link>

                    </Nav>
                </div>

            </div>



        </div>
    )

}


