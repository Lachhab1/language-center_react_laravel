import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';


export default function TableFeesTeacher()
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
            name:"Hours",
            selector:row => row.hours
        },
        {
            name:"Amount",
            selector:row => row.amount
        },
        {
            name:"Status",
            selector:row => row.status 
        },
        {
            name:"Date",
            selector:row => row.date
        },
        {
            name:"Action",
            selector:row => row.action,
            cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`/fees/teacher/edit${row.id}`}>
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
    const Data=[ {id:"1",name:"sopa",gender:"male",class:"4",amount:"1000",status:"paid",date:"07-05-2022",action: ""}]
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