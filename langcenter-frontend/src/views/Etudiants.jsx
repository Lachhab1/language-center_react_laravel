import React, { useState } from 'react';


export default function Etudiants(){
    
    
    
    return(
        <div className="Container">
            <div className="row">
                <div className="col-md-2">
                   
                    <h2>Students</h2>
                    <p>Home &gt;  Students</p>
                </div>
            </div>
            <div className="Container bg-light">
                <div className="row">
                    <div className="col">
                        <h2>All Students</h2> 
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-3">
                        <form>
                            <input className="form-control" type="text" name="Nom" id="1" placeholder="Search by name" />
                        </form>
                    </div>
                    <div className="col-3">
                        <form>
                            <input className="form-control" type="text" name="Class" id="2" placeholder="Search by class" />
                        </form>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-danger"> Search </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success"> Add Student </button>
                    </div>
                </div>
                <br />
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Class</th>
                                <th>Parents</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                             
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
                
           
        
    )
}