// import { useState } from "react";
import Button from "../Button"

import { useState } from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { BsFillPencilFill,
    MdDelete,
    BsFillEyeFill}from 'react-icons/all';

export default function TableEtud()
{
const col=[
    {
        name:"Name",
        selector:row => row.name,
        sortable: true 
    },
    {
        name:"Gender",
        selector:row => row.gender,
    },
    {
        name:"Class",
        selector:row => row.class,
        sortable: true 
    },
    {
        name:"Parents",
        selector:row => row.parents,
        sortable: true 
    },
    {
        name:"Status",
        selector:row => row.status,
        sortable: true 
    },
    {
        name:"Action",
        selector:row => row.action,
        cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
            <Link to={`/student/${row.id}`}>
            <button style={{ border: 'none', background: 'none'}}>
              <BsFillEyeFill style={{ color: 'green', fontSize: '20px' }} />
            </button>
            </Link>
                <Link to={`/student/editStudent/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <BsFillPencilFill style={{ color: 'orange' }} />
            </button>
          </Link>
          <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)}>
            <MdDelete style={{ color: 'red', fontSize: '20px' }} />
          </button>
        </div>
      ),
    },
   
]
const Data=[

    {
        id:1,
        name:"youssef",
        class:"5"
        
    },
    {
        id:2,
        name:"mohammed",
        class:"7"
    },
    {
        id:3,
        name:"othmane",
        class:"8"
    },
    {
        id:4,
        name:"aziz",
        class:"5"
        
    },
    {
        id:5,
        name:"kamal",
        class:"7"
    },
    {
        id:6,
        name:"aymen",
        class:"8"
    },
    {
        id:7,
        name:"messi",
        class:"5"
        
    },
    {
        id:8,
        name:"walid",
        class:"7"
    },
    {
        id:9,
        name:"ronaldo",
        class:"8"
    },
    {
        id:10,
        name:"ayoube",
        class:"5"
        
    },
    {
        id:11,
        name:"zakaria",
        class:"7"
    },
    {
        id:12,
        name:"mountasir",
        class:"8"
    }

]
        const [records,setRecords]=useState(Data);
        const [recordsC,setRecordsC]=useState(Data);
        function handlefilter(event)
        {
            const NewData = Data.filter(row => {
                return row.name.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecords(NewData)
        }
        function handlefilterC(event)
        {
            const NewData = Data.filter(row => {
                return row.class.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecords(NewData)
        }
    return(

    <div>
        <div className="row offset-1">
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Name" onChange={handlefilter}/>
            </div>
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Class" onChange={handlefilterC}/>
            </div>
            <Link to="/student/addStudent" className="col">
                    <Button className="" variant="danger" isDisabled={false} size="md" value="add Student" handleSmthg={() => console.log("chibakiya")}/>
            </Link>
        </div>
            <DataTable
                    columns={col}
                    data={records}
                    fixedHeader
                    pagination
            >
             </DataTable>
                </div>
    )

}