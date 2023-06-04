import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import EditFees from './EditFees';
import { useEffect } from 'react';
import { UseStateContext } from '../../context/ContextProvider';
import Inscription from '../InscStudDash/Inscription';
import AddfeesE from './AddFeesE';
import AddFeesT from '../Composantforteacherfeespage/AddFeesT';


export default function TableFeesEtud()
{
     const {user} = UseStateContext()
    let x = ""
if (user && user.role==='admin')
{
    x = ""
} else if (user && user.role==='director')
{
    x="/director"
}
else{
    x="/secretary"
}
  
      const deleteRow = (id) => {
    // Perform delete operation here
    // Example API call: deleteSchedule(id)
    // After successful deletion, update the state or fetch the updated data from the server

    // Call the handleDelete function passed from the parent component
    handleDelete(id);
  };


    

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
            name:"Status",
            selector:row => row.status 
        },
        {
          name:"Amount",
          selector:row => row.iamount
      },
      {
          name:"Agreed ",
          selector:row => row.aamount
      },
      {
          name:"Paid ",
          selector:row => row.pamount
      },
      {
          name:"Remaining ",
          selector:row => row.ramount
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
          <Link to={`${x}/fees/student/edit/${row.id}`}>
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
    const Data=[ {id:"1",name:"sopa",gender:"male",class:"4",status:"unpaid",iamount:"1000",aamount:"800",pamount:"500",ramount:"300",date:"07-05-2022",action: ""},
    {id:"2",name:"sopa1",gender:"male",class:"5",status:"paid",iamount:"1000",aamount:"900",pamount:"900",ramount:"0",date:"07-05-2022",action: ""},
    ,
  ]

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
              <input type="text" className="form-control" onChange={handelfilterbyClass} placeholder="Search by Class"  />
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

