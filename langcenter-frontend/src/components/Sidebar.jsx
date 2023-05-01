import { NavLink , Link} from "react-router-dom";
import {Nav,NavDropdown} from 'react-bootstrap';

import centreLogo from "../images/EnglishCastle_HQ.png"
import cours from "../images/icons/cours.svg"
import empTemps from "../images/icons/empTemps.svg"
import enseignant from "../images/icons/enseignant.svg"
import etudiant from "../images/icons/etudiant.svg"
import groupes from "../images/icons/groupes.svg"
import paiements from "../images/icons/paiements.svg"
import parents from "../images/icons/parents.svg"
import presence from "../images/icons/presence.svg"
import salles from "../images/icons/salles.svg"
import users from "../images/icons/utilisateurs.svg"
import dashboard from "../images/icons/dashboard.svg"
import results from "../images/icons/results.svg"
import logout from "../images/icons/logout.svg"
import { Bars3BottomLeftIcon,XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react";


export default function Sidebar() {
    const [openSidebar,setOpenSidebar] = useState(true);
    const handleOpen = () => {
        setOpenSidebar((prev) => !prev);
    }
    return (
        <div style={{width: openSidebar ? "18%":"auto"}} className="">

        <div className={` sidebar-container bg-dark`}>
            <div className={`logo-container m-0 d-flex flex-row-reverse justify-content-between align-items-center`} >
            <div className={openSidebar ?"w-25":"w-100"}>
                <button  onClick={handleOpen}  className="OpenCloseBtn2">{openSidebar ?<Bars3BottomLeftIcon width={25} className="text-white" />:<XMarkIcon width={45} className="text-white" style={{ color: "white"}} /> }</button>
            </div>
               <div className="ms-4">
                 {openSidebar && <Link className="" to="/dashboard"><img src={centreLogo} className="logo"></img></Link>}
                </div>
            </div>

            <Nav className="Sidebar h-100">
                <Nav className="flex-column" defaultActiveKey="/dashboard" >
                    <Nav.Item><NavLink className="a nav-link link-light" to="/dashboard"><img src={dashboard} />{openSidebar && "Dashboard"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/enseignants"><img src={enseignant} />{openSidebar &&"Enseignants"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/students"><img src={etudiant} />{openSidebar && "Etudiants"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/parents"><img src={parents} />{openSidebar && "Parents" }</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/groupes"><img src={groupes} />{openSidebar && "Groupes"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/cours"><img src={cours} />{openSidebar && "Cours"}</NavLink></Nav.Item>

                    {/* Presences le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}

                    <Nav.Item className="nav-item "><a className="a nav-link link-light dropdown-toggle " href="#dropPresence" id="menu" data-bs-toggle="collapse"><img src={presence} />{openSidebar && "Presences"}</a>
                        <ul className="collapse " id="dropPresence" data-bs-parent="#menu" >
                            <Nav.Item className="test"><NavLink className="a nav-link link-light" to="/presencesEtu">etudiants</NavLink></Nav.Item>
                            <Nav.Item><NavLink className="a nav-link link-light" to="/presencesEns">enseignants</NavLink></Nav.Item>
                        </ul>
                    </Nav.Item>




                    {/* Paiements: le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}
                    {openSidebar ? 
                    <Nav.Item className="nav-item link-light"><a className="a nav-link link-light  dropdown-toggle" href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} />{openSidebar && "Paiements"}</a>
                        <ul className="collapse
                        " id="dropFees" data-bs-parent="#menu" >
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/paiementsEtu">student fees</NavLink></Nav.Item>
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/paiementsEns">teacher fees </NavLink></Nav.Item>
                        </ul>
                    </Nav.Item>
                        :
                        <Nav.Item className="a nav-item link-light">
                        <NavDropdown menuVariant="dark"  drop="end" align={"down"} id="nav-dropdown">
                                <NavDropdown.Item className="a nav-link link-dark" as={Link} to="/paiementsEtu">Student fees</NavDropdown.Item>
                                <NavDropdown.Item className="a nav-link link-dark" as={Link} to="/paiementsEns">Teacher fees</NavDropdown.Item>
                        </NavDropdown>
                        </Nav.Item>
                    }





                    <Nav.Item><NavLink className="a nav-link link-light" to="/resultats"><img src={results} />{openSidebar &&"Resultats"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/salles"><img src={salles} />{openSidebar && "Salles"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/emploiTemps"><img src={empTemps} />{openSidebar && "Emploi du temps"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/utilisateurs"><img src={users} />{openSidebar && "Utilisateurs"}</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/logout"><img src={logout} />{openSidebar && "Se deconnecter"}</NavLink></Nav.Item>






                </Nav>
            </Nav>

        </div>



    </div>
    )

}


