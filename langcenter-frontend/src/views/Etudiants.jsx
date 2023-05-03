import React, { useState } from 'react';
import TableEtud from '../Composentforstudentspage/TableEtud';
import Button from '../components/Button';
import Input from '../components/Input';
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
                  
                         <div className='col-4'>
                            <form>
                                <Input  type="text" name="SearchN" placeholder="Search by name" className="form-control"/>
                            </form>
                         </div>
                         <div className='col-4'>
                            <form>
                                <Input  type="text" name="SearchC" placeholder="Search by class" className="form-control"/>
                            </form>
                         </div>
                         <div className='col-2'>
                            <form>
                                <Button value="Search" className="btn btn-danger mt-4"/>
                            </form>
                         </div>
                         <div className='col-2'>
                            <form>
                                <Button value="Add Student" className="btn btn-success mt-4"/>
                            </form>
                         </div>    
                                                 
                </div >
                <br />
                <TableEtud/>
                </div>
            </div>
                
           
        
    )
}