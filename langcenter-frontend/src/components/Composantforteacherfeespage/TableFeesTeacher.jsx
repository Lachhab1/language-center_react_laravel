import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import EditfeesT from './EditfeesT';


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
          <Link to={`/fees/teacher/edit/${row.id}`}>
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
    const Data=[ {id:"1",name:"sopa",gender:"male",hours:"1",amount:"1000",status:"paid",date:"07-05-2022",action: ""}]
    const [Namefilter,setNamefilter]=useState(Data)
    function handelfilterbyname(event)
    {
      const newData=Data.filter(row =>{
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setNamefilter(newData)
    }
    const [Classfilter,setClassfilter]=useState(Data)
    function handelfilterbyClass(event)
    {
      const newData=Data.filter(row =>{
        return row.class.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setNamefilter(newData)
    }


    const [StatusFilter, setStatusFilter] = useState(Data);

    function handleFilterByStatus(event)
    {
      const selectedStatus = event.target.value.toLowerCase();

      if (selectedStatus === 'all') {
        // Afficher toutes les lignes
        setNamefilter(Data);
      } else {
        // Filtrer les lignes en fonction du statut
        const newData = Data.filter((row) => row.status.toLowerCase() === selectedStatus);
        setNamefilter(newData);
      }
    }
    return(
        
            
            <div>
            
            <div className="row offset-1">
              <div className='col'>
              <input type="text" className="form-control" onChange={handelfilterbyname} placeholder="Search by Name"  />
              </div>
              <div className='col'>
              <select className="form-control" onChange={handleFilterByStatus}>
                            <option value="all">All</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
              </select>
              </div>
            </div>
            <DataTable
                    columns={col}
                    data={Namefilter}
                    fixedHeader
                    pagination
            >
             </DataTable>
             
        </div>
    )
}