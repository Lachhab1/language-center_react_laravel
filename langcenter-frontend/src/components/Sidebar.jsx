import { NavLink , Link} from "react-router-dom";

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
            <div className={`logo-container  `} >
                <button onClick={onHideSidebar} className="OpenCloseBtn"><AiOutlineClose style={{ color: "white" }} /></button>
                <Link to="/"><img src={centreLogo} className="logo"></img></Link>
            </div>

            <div className={`Sidebar`}>
                <ul className="nav nav-pills flex-column" >
                    <li className="nav-item"><NavLink className="a nav-link  " to="/"><img src={dashboard} />Dashboard</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/enseignants"><img src={enseignant} />Enseignants</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/students"><img src={etudiant} />Etudiants</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/parents"><img src={parents} />Parents</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/groupes"><img src={groupes} />Groupes</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/cours"><img src={cours} className="cou" />Cours</NavLink></li>

                    {/* Presences le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}

                    <li className="nav-item "><a className="a nav-link dropdown-toggle " href="#dropPresence" id="menu" data-bs-toggle="collapse"><img src={presence} />Presences</a>
                        <ul className="collapse   " id="dropPresence" data-bs-parent="#menu" >
                            <li><NavLink className="a nav-link " to="/presencesEtu">etudiants</NavLink></li>
                            <li><NavLink className="a nav-link " to="/presencesEns">enseignants</NavLink></li>
                        </ul>
                    </li>




                    {/* Paiements: le span pour cacher ces elements a fin de remplacer le collapse avec dropdown dans les petits ecrans */}

                    <li className="nav-item "><a className="a nav-link  dropdown-toggle" href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} />Paiements</a>
                        <ul className="collapse
                        " id="dropFees" data-bs-parent="#menu" >
                            <li className="nav-item" ><NavLink className="a nav-link " to="/paiementsEtu">student fees</NavLink></li>
                            <li className="nav-item" ><NavLink className="a nav-link " to="/paiementsEns">teacher fees </NavLink></li>
                        </ul>
                    </li>







                    <li className="nav-item"><NavLink className="a nav-link " to="/resultats"><img src={results} />Resultats</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/salles"><img src={salles} />Salles</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/emploiTemps"><img src={empTemps} />Emploi du temps</NavLink></li>
                    <li className="nav-item"><NavLink className="a nav-link " to="/utilisateurs"><img src={users} />Utilisateurs</NavLink></li>
                    <li className="nav-item"><a className="a nav-link " heref="#"><img src={logout} />Se deconnecter</a></li>






                </ul>
            </div>

        </div>



    )

}


