import { useState } from "react";
import logo from '../../images/EnglishCastle_HQ.png'
import './loging.css'
import { UseStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FormLogin() {
    const currentYear = new Date().getFullYear();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login,error} = UseStateContext();
    const navigate = useNavigate()

    const handleLogin =  (e) => {
        e.preventDefault();
        login({email,password});
        setEmail("");
        setPassword("");
        navigate("/");
    }

    return (
        <div className="container-fluid">
            <div className="row login">
                <div className="col-md-6 leftBg d-flex flex-column align-items-center justify-content-center">
                    <img src={logo} className="logoLogin img-fluid" alt="Logo" />
                    <h2 className="text-white text-center mt-3">WELCOME</h2>
                </div>
                <div className="col-md-6 rightBg d-flex flex-column align-items-center justify-content-center">
                    <div className="formulaireLogin p-4 bg-white rounded-3">
                        <form onSubmit={handleLogin}>
                            {error && <div className="alert alert-danger">{Object.keys(err).map((key) => (
                                <p key={key}>
                                    {err[key][0]}
                                </p>
                            ) )}</div>}
                            <div className="mb-3">
                                <input type="email" className="form-control rounded-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control rounded-3" placeholder="Current password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
                            </div>
                            <div className="mb-3">
                                <a href="/ForgotPassword" className="text-decoration-none text-primary">Forgot your password</a>
                            </div>
                            <button type="submit" className="btn btn-danger rounded-3">SIGN IN</button>
                        </form>
                    </div>
                    <p className="text-white mt-5">&copy; {currentYear} School Management</p>
                </div>
            </div>
        </div>
    );
}
