import DataTable from "react-data-table-component"
import React, { useState } from 'react';



export default function TableNote()
{

    const col=[
        {
            name:"Name",
            selector:row => row.name
        },
        {
            name:"Groupe",
            selector:row=>row.groupe
        },
        {
            name:"Eng",
            selector:row=>row.eng
        },
        {
            name:"Gram",
            selector:row=>row.gram
        },
    ]
    const Data=[ {id:"1",name:"sopa",groupe:"gr1",eng:15,gram:14}]
    const [records,setRecords]=useState(Data);
    return (
        <div>
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