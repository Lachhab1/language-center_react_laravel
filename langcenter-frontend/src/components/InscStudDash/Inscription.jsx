
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../api/axios';

import DataTable from 'react-data-table-component';
import { Ellipsis } from 'react-awesome-spinners';

export default function  Inscription()
{

    //fetch data from api
    const [data,setData]=useState([]);
    const [pending, setPending] = useState(true);
    useEffect(()=>{
       const fetchData = async() =>axios.get('/api/inscrire-classes').then((response)=>{
        console.log(response.data.data);
        setData(
            response.data.data.map((row)=>({
                id:row.id,
                name:row.etudiant.nom + " " + row.etudiant.prenom,
                status:row.status,
                iamount:row?.cours?.price,
                aamount:row?.negotiated_price,
                pamount:row?.payment?.amount,
                ramount: row?.negotiated_price - row?.payment?.amount > 0 ? row?.negotiated_price - row?.payment.amount : 0
            }))

        );
         }).catch((error)=>{
            console.log(error);
        });
        setTimeout(async() => {
            await fetchData();
            setPending(false);
            }
                , 200);
        
        
        
    },[])
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

    return(
        <div>
              <DataTable
                    columns={col}
                    data={data}
                    fixedHeader
                    pagination
                    selectableRows
                    highlightOnHover
                    responsive
                    noDataComponent="No data found"
                    paginationComponentOptions={{
                        rowsPerPageText: 'Rows per page:',
                        rangeSeparatorText: 'of',
                        noRowsPerPage: false,
                        selectAllRowsItem: false,
                        selectAllRowsItemText: 'All'
                    }}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                    dense
                    progressPending={pending}
                    progressComponent={<Ellipsis />}
            >
             </DataTable>
        </div>
    )
}