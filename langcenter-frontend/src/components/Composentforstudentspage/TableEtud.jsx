// import { useState } from "react";
import { Placeholder } from "react-bootstrap"
import  Button from "../components/Button"
import  Input from "../components/Input"

import { Link, Navigate } from "react-router-dom"
import { useEffect } from "react"
import DataTable from "react-data-table-component"

export default function TableEtud()
{
//     const inputInfo = 
//         {
//             label:"Full Name",
//             Placeholder:"Enter the name",
//             type: "text"
//         }
//     const option = {
//         label: "select age"
//         ,options:[
//             {
//                 value: "1",
//                 text:"alpha",
//             }
//         ]
//         ,defText:"select age"
//     }
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
        name:"Parents",
        selector:row => row.parents
    },
    {
        name:"Status",
        selector:row => row.status
    },
    {
        name:"Action",
        selector:row => row.action
    },
   
]
const Data=[
    {id:"1"}
]
    return(
    <div>
                      
            <DataTable
                    columns={col}
                    data={Data}
                    fixedHeader
                    pagination
            >
             </DataTable>
                    <Link to="/student/addStudent">
                    <Button className="" variant="danger" isDisabled={false} size="md" value="add Student" handleSmthg={() => console.log("chibakiya")}/>
                    </Link>
                </div>
    )

}