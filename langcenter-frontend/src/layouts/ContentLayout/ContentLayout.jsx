import { Outlet,useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
export default function ContentLayout() {
  const location = useLocation();
  var replaced = location.pathname.slice(1).replace("%20", " ")
  replaced = replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase()
  return (
    <div className="d-flex flex-row w-100">
      <Sidebar />
      <div className="w-100 m-0">
      <Topbar />
      <div className="contents">
        <div style={{width: "6rem"}} className="p-4 navig-title d-flex flex-column align-items-start">
        <h1 style={{fontFamily: "poppins"}} className="fw-semibold fs-3">{replaced}</h1>
        <div style={{width:"90%",height:0,border: "2px solid red", marginTop: "-.25rem"}}></div>
        <div className="d-flex flex-row align-items-center">

        <div style={{fontFamily: "regular",fontSize: "18px"}} className="pt-4 text-secondary">Home</div>
        <div>
          {
          location.pathname == "/dashboard" ? "" : <>&gt;</>
          }
        </div>
        </div>
        <Outlet />  
      </div>
      </div>
  </div>
  </div>

)}
