import { NavLink , Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

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

import { AiOutlineClose } from "react-icons/ai"


export default function Sidebar(props) {
    const { onHideSidebar, showSidebar } = props;
    const style = {
        position: 'fixed',
        top: '0',
        width: '280',
        backgroundColor: "#242b5e",
        left: showSidebar ? 0 : -300, // Set left to 0 when showSidebar is true, -300 when false
        transition: 'left 0.3s ease-out',
        zIndex: 999,
    };
    return (

        <div className={` sidebar-container  `} style={style}>
            <div className={`logo-container w-100 m-0`} >
                <button onClick={onHideSidebar} className="OpenCloseBtn2"><AiOutlineClose style={{ color: "white" }} /></button>
                <Link to="/dashboard"><img src={centreLogo} className="logo"></img></Link>
            </div>

            <Nav className={`Sidebar`}>
                <Nav className="flex-column" defaultActiveKey="/dashboard" >
                    <Nav.Item><NavLink className="a nav-link link-light" to="/dashboard"><img src={dashboard} />Dashboard</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/enseignants"><img src={enseignant} />Enseignants</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/students"><img src={etudiant} />Etudiants</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/parents"><img src={parents} />Parents</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/groupes"><img src={groupes} />Groupes</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/cours"><img src={cours} />Cours</NavLink></Nav.Item>

                    {/* Presences le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}

                    <Nav.Item className="nav-item "><a className="a nav-link link-light dropdown-toggle " href="#dropPresence" id="menu" data-bs-toggle="collapse"><img src={presence} />Presences</a>
                        <ul className="collapse   " id="dropPresence" data-bs-parent="#menu" >
                            <Nav.Item className="test"><NavLink className="a nav-link link-light" to="/presencesEtu">etudiants</NavLink></Nav.Item>
                            <Nav.Item><NavLink className="a nav-link link-light" to="/presencesEns">enseignants</NavLink></Nav.Item>
                        </ul>
                    </Nav.Item>




                    {/* Paiements: le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}

                    <Nav.Item className="nav-item link-light"><a className="a nav-link link-light  dropdown-toggle" href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} />Paiements</a>
                        <ul className="collapse
                        " id="dropFees" data-bs-parent="#menu" >
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/paiementsEtu">student fees</NavLink></Nav.Item>
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/paiementsEns">teacher fees </NavLink></Nav.Item>
                        </ul>
                    </Nav.Item>







                    <Nav.Item><NavLink className="a nav-link link-light" to="/resultats"><img src={results} />Resultats</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/salles"><img src={salles} />Salles</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/emploiTemps"><img src={empTemps} />Emploi du temps</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/utilisateurs"><img src={users} />Utilisateurs</NavLink></Nav.Item>
                    <Nav.Item><NavLink className="a nav-link link-light" to="/logout"><img src={logout} />Se deconnecter</NavLink></Nav.Item>






                </Nav>
            </Nav>

        </div>



    )

}


