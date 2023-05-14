// import { useState } from "react";
import Button from "../Button"
import { useState } from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { BsFillPencilFill,
    MdDelete,
    BsFillEyeFill}from 'react-icons/all';
export default function TabUser()
{
const col=[
    {
        name:"first Name",
        selector:row => row.firstName,
        sortable: true 
    },
    {
        name:"last Name",
        selector:row => row.lastName,
        sortable: true 
    },
    {
        name: "Email",
        selector: row => row.email,
    },
    {
        name:"Role",
        selector:row => row.role,
        sortable: true
    },
    {
        name:"Action",
        selector:row => row.action,
        cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
            <Link to={`/users/${row.id}`}>
            <button style={{ border: 'none', background: 'none'}}>
              <BsFillEyeFill style={{ color: 'green', fontSize: '20px' }} />
            </button>
            </Link>
                <Link to={`/users/editUser/${row.id}`}>
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
        firstName:"youssef",
        lastName:"chibakiya",
        role:"admin",
        email:"youssef@youssef.com",
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
        function handlefilterR(event)
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
                 <input type="text" className="form-control" placeholder="Search by Last Name" onChange={handlefilter}/>
            </div>
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by role" onChange={handlefilterR}/>
            </div>
            <Link to="/users/addUser" className="col">
                    <Button className="" variant="danger" isDisabled={false} size="md" value="New User" handleSmthg={() => console.log("chibakiya")}/>
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