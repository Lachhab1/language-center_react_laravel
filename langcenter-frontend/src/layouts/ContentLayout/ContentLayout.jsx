import { Outlet,useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";


import Card from 'react-bootstrap/Card';

export default function ContentLayout() {
  const location = useLocation();
  var replaced = location.pathname.slice(1).replace("_", " ").replaceAll("/", " ").replace(/\b\w/g, c => c.toUpperCase());
  replaced = replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase() 
  var second = location.pathname.slice(1).replace("_", " ").replaceAll("/", " ").replaceAll(" "," > ").replace(/\b\w/g, c => c.toUpperCase());
  const words = replaced.split(" ");
  let result = "";

  for (let i = 0; i < 1 && i < words.length; i++) {
    result += words[i] + " ";
  }

  return (
    <div className="d-flex flex-row w-100">
      <Sidebar />
      <div className="w-100 m-0">
      <Topbar />

      <div className="contents">
        <Outlet /> 
        

      <div className="contents w-100">
        <div  className="p-4">
        <h1 className="fw-semibold fs-3 mb-1 w-auto text-start">{result}</h1>
        <div style={{width:"4%",height:0,border: "2px solid red"}}></div>
        <div className="d-flex flex-row align-items-center pt-4">
        <div style={{fontFamily: "regular",fontSize: "18px"}} className="text-secondary me-2">Home</div>
          {
          location.pathname === "/dashboard" ? "" : 
          <div className="text-danger me-2 fw-semibold">&gt;<span className="ms-2 fw-bold">{second}</span></div>
          }
        </div>
        <Card className="mt-3" style={{borderRadius: "0",border:"0"}}>
          <Card.Body>
            <Outlet />
          </Card.Body>
        </Card>
      </div>
      
  </div>  
      </div>

  </div>
  </div>
)}
