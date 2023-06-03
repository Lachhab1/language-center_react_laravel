
import React, { useState } from 'react';

import DataTable from 'react-data-table-component';


export default function  Inscription()
{
    const col=[
        {
            name:"ID inscription",
            selector:row => row.id
        },
        {
            name:"Name",
            selector:row => row.name
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
        }
    ]

    const Data=[ {id:"1",name:"sopa",status:"unpaid",iamount:"1000",aamount:"800",pamount:"500",ramount:"300"}
                ,{id:"2",name:"sopa2",status:"paid",iamount:"1000",aamount:"900",pamount:"900",ramount:"0"}
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
        </div>
    )
}