import { Navigate, Outlet,useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {Card,Alert, Col} from 'react-bootstrap';
import { UseStateContext } from "../../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContentLayout() {
  const {token,notification,variant,user} = UseStateContext();
  const location = useLocation();
  var replaced = location.pathname.slice(1).replace("_", " ").replaceAll("/", " ").replace(/\b\w/g, c => c.toUpperCase());
  replaced = replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase() 
  var second = location.pathname.slice(1).replace("_", " ").replaceAll("/", " ").replaceAll(" "," > ").replace(/\b\w/g, c => c.toUpperCase());
  const words = replaced.split(" ");
  let result = "";
  if (variant === "success") toast.success(notification);
  if (variant === "danger") toast.error(notification);
  if  (variant === "warning") toast.warn(notification);
  for (let i = 0; i < 1 && i < words.length; i++) {
    result += words[i] + " ";
  }
  let x = ''
  if ( user.role == "admin")
  {
    x = ""
  }
  else if ( user.role == "director")
  {
    x = "director"
  }
  else {
    x = "secretary"
  }
  const dashboardstyle = {
    backgroundColor: "#F1F1F3"
  }
  const style = location.pathname === "/dashboard" ? dashboardstyle: ""
  if(!token) return <Navigate to="/auth" />
  if (token && user && user.role !== "admin") return <Navigate to={`${x}/dashboard`} />
  if (user && user.role === "admin")
  {
    return (
      <div className="d-flex flex-row w-100">
      <Sidebar />
      <div className="w-100 m-0">
      <Topbar />
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
        {
            notification != '' &&
          <Col xs={12} className="d-flex justify-content-end">
            <ToastContainer />
          {/* <Alert variant={variant} className="w-25">{notification}</Alert> */}
          </Col>
          }
        <Card className="mt-3" style={{borderRadius: "0",border:"0", ...style}}>
          <Card.Body >
            <Outlet />
          </Card.Body>
        </Card>
      </div>
      </div>
  </div>
  </div>

)}
}
