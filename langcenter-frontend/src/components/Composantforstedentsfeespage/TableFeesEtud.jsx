import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import EditFees from './EditFees';
import { useEffect } from 'react';
import { UseStateContext } from '../../context/ContextProvider';
import Inscription from '../InscStudDash/Inscription';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners'


export default function TableFeesEtud()
{ 
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
      
       const fetchData = async() => axios.get('/api/inscrire-classes').then((response)=>{
          console.log(response.data.data);
          setData(
              response.data.data.map((row)=>({
                  id:row.id,
                  name:row.etudiant.nom + " " + row.etudiant.prenom,
                  status:row.status,
                  iamount:row.cours?.price,
                  aamount:row.negotiated_price,
                  pamount:row.payment.amount,
                  ramount: row.negotiated_price - row.payment.amount > 0 ? row.negotiated_price - row.payment.amount : 0,
                  class:row.class?.name,
                  date:row.updated_at,
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
            name:"Name",
            selector:row => row.name
        },
        {
            name:"Class",
            selector:row => row.class
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
          name:"Cours Price",
          selector:row => row.iamount
      },
      {
          name:"Total Agreed ",
          selector:row => row.aamount
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

    // const [Namefilter,setNamefilter]=useState(Data)
    // function handelfilterbyname(event)
    // {
    //   const newData=Data.filter(row =>{
    //     return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    //   })
    //   setNamefilter(newData)
    // }
    // const [Classfilter,setClassfilter]=useState(Data)
    // function handelfilterbyClass(event)
    // {
    //   const newData=Data.filter(row =>{
    //     return row.class.toLowerCase().includes(event.target.value.toLowerCase())
    //   })
    //   setNamefilter(newData)
    // }


    // const [StatusFilter, setStatusFilter] = useState(Data);

    // function handleFilterByStatus(event)
    // {
    //   const selectedStatus = event.target.value.toLowerCase();

    //   if (selectedStatus === 'all') {
    //     // Afficher toutes les lignes
    //     setNamefilter(Data);
    //   } else {
    //     // Filtrer les lignes en fonction du statut
    //     const newData = Data.filter((row) => row.status.toLowerCase() === selectedStatus);
    //     setNamefilter(newData);
    //   }
    // }
    
  


    return(
        <div>
            
            {/* <div className="row offset-1">
              <div className='col'>
              <input type="text" className="form-control"  placeholder="Search by Name"  />
              </div>
              <div className='col'>
              <input type="text" className="form-control"  placeholder="Search by Class"  />
              </div>
              <div className='col'>
              <select className="form-control" >
                            <option value="all">All</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
              </select>
              </div>
            </div> */}
            <DataTable
                    columns={col}
                    data={data}
                    fixedHeader
                    pagination
                    progressPending={pending}
                    progressComponent={<Ellipsis  size={64}
                    color='#D60A0B'
                    sizeUnit='px' />} 
            >
              </DataTable>
          </div>
    )
}

