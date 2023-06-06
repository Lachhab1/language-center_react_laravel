import { Nav } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import centreLogo from "../../images/EnglishCastle_HQ.png";
import dashboard from "../../images/icons/dashboard.svg";
import enseignant from "../../images/icons/enseignant.svg";
import etudiant from "../../images/icons/etudiant.svg";
import groupes from "../../images/icons/groupes.svg";
import presence from "../../images/icons/presence.svg";
import parents from "../../images/icons/parents.svg";
import paiements from "../../images/icons/paiements.svg";
import results from "../../images/icons/results.svg";
import disco from "../../images/icons/logout.svg";
import { UseStateContext } from '../../context/ContextProvider';

export default function SidebarSec() {
  const { logout } = UseStateContext();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpen = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <div style={{ width: openSidebar ? "20%" : "auto" }} className="">
      <div className={` sidebar-container`} style={{ backgroundColor: "#242B5E" }}>
        <div className={`logo-container m-0 d-flex flex-row-reverse justify-content-between align-items-center`}>
          <div className={openSidebar ? "w-25" : "w-100"}>
            <button onClick={handleOpen} className="OpenCloseBtn2">
              {openSidebar ? (
                <XMarkIcon width={25} className="text-white" style={{ color: "white" }} />
              ) : (
                <Bars3BottomLeftIcon width={40} className="text-white" />
              )}
            </button>
          </div>
          <div className="ms-4">{openSidebar && <Link className="" to="/dashboard"><img src={centreLogo} className="logo" alt="Centre Logo" /></Link>}</div>
        </div>

        <div className="Sidebar h-100 fs-6">
          <Nav className="flex-column" defaultActiveKey="/secretary/dashboard">
            <Nav.Item>
              <NavLink className="a nav-link link-light" to="/secretary/dashboard">
                <img src={dashboard} alt="Dashboard Icon" />
                {openSidebar && "Dashboard"}
              </NavLink>
            </Nav.Item>
           
            <Nav.Item>
              <NavLink className="a nav-link link-light" to="/secretary/student">
                <img src={etudiant} alt="Student Icon" />
                {openSidebar && "Student"}
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="a nav-link link-light" to="/secretary/parent">
                <img src={parents} alt="Group Icon" />
                {openSidebar && "Parent"}
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="a nav-link link-light" to="/secretary/class">
                <img src={groupes} alt="Group Icon" />
                {openSidebar && "Class"}
              </NavLink>
            </Nav.Item>
            {openSidebar ? 
                    <Nav.Item className="nav-item link-light"><a className="a nav-link link-light  dropdown-toggle" href="#dropPresence" id="menu" data-bs-toggle="collapse"><img src={presence} />{openSidebar && "Attendance"}</a>
                        <ul className="collapse " id="dropPresence" data-bs-parent="#menu" >
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/secretary/attendance/student">Student</NavLink></Nav.Item>
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/secretary/attendance/teacher">Teacher </NavLink></Nav.Item>
                        </ul>
                    </Nav.Item>
                        :
                    <Nav.Item className="nav-item"><a onClick={handleOpen} className="a nav-link link-light dropdown-toggle " href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={presence} /></a>
                    </Nav.Item>
                    }
                     {openSidebar ? 
                    <Nav.Item className="nav-item link-light"><a className="a nav-link link-light  dropdown-toggle" href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} />{openSidebar && "Paiement"}</a>
                        <ul className="collapse
                        " id="dropFees" data-bs-parent="#menu" >
                            <Nav.Item ><NavLink className="a nav-link link-light" to="/secretary/fees/student">Student fees</NavLink></Nav.Item>

                        </ul>
                    </Nav.Item>
                        :
                    <Nav.Item className="nav-item"><a onClick={handleOpen} className="a nav-link link-light dropdown-toggle " href="#dropFees" id="menu" data-bs-toggle="collapse"><img src={paiements} /></a>
                    </Nav.Item>
                    }
            <Nav.Link className="a nav-link link-light" onClick={logout}>
              <img src={disco} alt="Logout Icon" />
              {openSidebar && "Logout"}
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
}