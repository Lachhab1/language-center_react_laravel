import DataTable from "react-data-table-component"
import React, { useState } from 'react';

export default function TableET()
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
            name:"Groupe",
            selector:row=>row.groupe
        },
        {
            name: "Action",
            selector: row => row.action
        }
    ]
    const Data=[ {id:"1",name:"sopa",groupe:"gr1"},{id:"2",name:"sopa3",groupe:"gr2"}]
    const [formData,setFormData] = useState(
        ...Data,
        // ...localStorage.getItem("PARENT_DATA")?.
    )
    const [records,setRecords]=useState(Data);
    function handlefilter(event)
    {
        const NewData = Data.filter(row => {
            return row.groupe.toLowerCase().includes(event.target.value.toLowerCase())
        }) 
        setRecords(NewData)
    }
    return (
        <div>
            <div className="row offset-1">
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Groupe" onChange={handlefilter}/>
            </div>
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