import React from "react";
import logo from '../../images/EnglishCastle_HQ.png'
import './loging.css'

export default function FormLogin() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="container-fluid ">
            <div className="row login">
                <div className="col-md-6 leftBg d-flex flex-column align-items-center justify-content-center">
                    <img src={logo} className="logoLogin img-fluid" alt="Logo" />
                    <h2 className="text-white text-center mt-3">WELCOME</h2>
                </div>
                <div className="col-md-6 rightBg d-flex flex-column align-items-center justify-content-center">
                    <div className="formulaireLogin p-4 bg-white rounded-3">
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control rounded-3" placeholder="Enter your Username" required />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control rounded-3" placeholder="Enter your Password" required />
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
