import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
export default function ContentLayout() {
  return (
    <div className="d-flex flex-row w-100">
      <Sidebar />
      <div className="w-100 m-0">
      <Topbar />
      <div className="contents">
        <Outlet />  
      </div>
      </div>
  </div>

)}
