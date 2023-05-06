import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

export default function TableParent()
{

    const col=[
        {
            name:"ID",
            selector:row => row.id
        },
        {
            name:"Name",
            selector:row => row.name
        },
        {
            name:"Gender",
            selector:row => row.gender
        },
        {
            name:"Occupation",
            selector:row => row.occupation
        },
        {
            name:"Address",
            selector:row => row.address
        },
        {
            name:"E-mail",
            selector:row => row.email 
        },
        {
            name:"Phone",
            selector:row => row.phone
        }
    ]
    const Data=[ {id:"1",name:"sopa",gender:"male",occupation:"eng teacher",address:"sopa 3owa",email:"6@ma.com",phone:"060000000"}]
    return(
        <div>
             
            <DataTable
                    columns={col}
                    data={Data}
                    fixedHeader
                    pagination
            >
             </DataTable>
        </div>
    )
}