import React, { useState } from 'react';
import TableEtud from '../Composentforstudentspage/TableEtud';
import Button from '../components/Button';
export default function Etudiants(){
    
    
    
    return(
        <div className="Container">
            <div className="row">
                <div className="col-md-2">
                   
                    <h2 >Students</h2>
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
                   
                        
                    
                        
            <Button className="btn btn-dark" value="Ajouter" onlClick={() => alert('Button clicked!')}/>
                        
                        
                    
                </div >
                <br />
                <TableEtud/>
                </div>
            </div>
                
           
        
    )
}