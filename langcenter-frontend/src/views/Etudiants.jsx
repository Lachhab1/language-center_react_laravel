import React, { useState } from 'react';
export default function Etudiants(){
    
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    
    return(
        <div className="Container">
            <div className="row">
                <div className="col-md-2">
                   
                    <h2>Etudiants</h2>
                    <p>Home &gt;  Etudiants</p>
                </div>
            </div>
            <div className="Container bg-light">
                <div className="row">
                    <div className="col-4">
                        <h2>Tous les etudiants</h2> 
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-3">
                        <form>
                            <input className="form-control" type="text" name="Nom" id="1" placeholder="Chercher avec le nom" />
                        </form>
                    </div>
                    <div className="col-3">
                        <form>
                            <input className="form-control" type="text" name="Class" id="2" placeholder="Chercher avec la class" />
                        </form>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-danger"> Chercher </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success"> Ajouter </button>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                </div>
            </div>
                
           
        
    )
}