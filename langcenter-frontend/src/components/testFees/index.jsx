import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useEffect } from 'react';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners'


export default function TableFeesEtud()
{ 

    const tableCustomStyles = {
    headCells: {
        style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        },
    },
    cells: {
        style: {
        fontSize: '18px',
        paddingLeft: '0 8px',
        justifyContent: 'center',
        },
    },
        }
    const {user,setNotification,setVariant} = UseStateContext()
    const [data,setData]=useState([]);
    const [pending, setPending] = useState(true);
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
    useEffect(()=>{
      
       const fetchData = async() => axios.get('/api/testPayment').then((response)=>{
          console.log(response.data.data);
          setData(
              response.data.data.map((row)=>({
                  id:row.id,
                  name:row.name,
                  status:row.status,
                  iamount:row.price,
                  pamount:row.amount,
                  ramount:Number(row.remaining),
                  methode:row.payment_method,
                  date:row.date,
              }))
          );
            })
        .catch((error)=>console.log(error));
        setTimeout(async() => {
        await fetchData();
        setPending(false);
      }, 200);
    },[])


  
      const deleteRow = (id) => {
        axios.delete(`/api/delete-payment/${id}`)
        .then((response)=>{
          console.log(response.data.data);
          setNotification("Student deleted successfully");
          setVariant("danger");
          setTimeout(() => {
              setNotification("");
              setVariant("");
              window.location.reload();
          }, 2000);
        })
        .catch((error)=>console.log(error));
      }


    

    const col=[
        {
            name:"ID",
            selector:row => row.id
        },
        {
            name:"Student Name",
            selector:row => row.name
        },
        {
            name:"Status",
            selector:row => row.status,
            cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: row.status === 'Paid' ? 'green' : 'red' }} />
          <p style={{ marginLeft: '5px' }}>{row.status}</p>
        </div>
      ),
        },
        {
          name:"Test Price",
          selector:row => row.iamount
      },
      {
          name:"Paid",
          selector:row => row.pamount
      },
      {
          name:"Remaining ",
          selector:row => row.ramount
      },
        {
            name:"Date of Payment",
            selector:row => row.date
        },
        {
            name:"Payment Method",
            selector:row => row.methode
        },
        {
            name:"Action",
            selector:row => row.action,
            cell: (row) => (
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/income/test/edit/${row.id}`}>
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


    return(
        <div>
            <DataTable
                    columns={col}
                    data={data}
                    fixedHeader
                    pagination
                    customStyles={tableCustomStyles}
                    className="mt-4"
                    progressPending={pending}
                    progressComponent={<Ellipsis  size={64}
                    color='#D60A0B'
                    sizeUnit='px' />} 
            >
              </DataTable>
          </div>
    )
}

