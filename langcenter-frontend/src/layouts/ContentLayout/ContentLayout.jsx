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
      <div className="contents w-100">
        <div  className="p-4">
        <h1 style={{fontFamily: "poppins"}} className="fw-semibold fs-3 mb-1 w-auto text-start">{replaced}</h1>
        <div style={{width:"4%",height:0,border: "2px solid red"}}></div>
        <div className="d-flex flex-row align-items-center pt-4">
        <div style={{fontFamily: "regular",fontSize: "18px"}} className="text-secondary me-2">Home</div>
          {
          location.pathname == "/dashboard" ? "" : <div className="text-danger me-2 fw-semibold">&gt;</div>
          }
        </div>
        <Outlet />  
      </div>
      </div>
  </div>
  </div>

)}
