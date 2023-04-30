import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
export default function ContentLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleHideSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div className="layout">
      <Topbar onShowSidebar={handleShowSidebar} />
      <Sidebar onHideSidebar={handleHideSidebar} showSidebar={showSidebar} />
      <div className="contents">
        <Outlet />
      </div>
  </div>

)}
