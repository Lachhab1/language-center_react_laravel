import React, { useState } from 'react';
import TableEtud from '../components/Composentforstudentspage/TableEtud';
import Button from '../components/Button';
import Input from '../components/Input';
export default function Etudiants(){
    
    return(
       <div>        
        <h2 >Students</h2>         
            <div className="Container">
                <div className="row">
                    <div className="">
                    <TableEtud/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}