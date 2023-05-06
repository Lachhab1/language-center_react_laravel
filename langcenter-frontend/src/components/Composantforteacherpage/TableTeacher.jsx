import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';



export default function TableTeacher()
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
            name:"Class",
            selector:row => row.class
        },
        {
            name:"Subject",
            selector:row => row.subject
        },
        {
            name:"Phone",
            selector:row => row.phone
        },
        {
            name:"Status",
            selector:row => row.status 
        },
        
        {
            name:"Action",
            selector:row => row.action,
            cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`/teacher/edit/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <BsFillPencilFill style={{ color: 'orange' }} />
            </button>
          </Link>
          <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)}>
            <MdDelete style={{ color: 'red', fontSize: '20px' }} />
          </button>
        </div>
      ),
        }
    ]
   const Data=[ {id:"1",name:"sopa",gender:"male",class:"c-4",subject:"sopa 3owa",status:"active",phone:"060000000"}]
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