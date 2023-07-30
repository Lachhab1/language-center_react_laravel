import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners'

export default function Depenses() {
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
  const [Data,setData] = useState([])
  const {user,setNotification,setVariant} = UseStateContext()
  const [nameFilter, setNameFilter] = useState('');
  const [pending, setPending] = useState(true);
//data from api
useEffect(() => {
    const timeout = setTimeout(async() => {
        const response = await axios.get("/api/expenses");
     
        response.data.data.map((datar) => {
            setData((prev)=>
            (
                [...prev,
                    {
                    id:datar.id,
                    name:datar.expense_name,
                    amount: datar.expense_amount,
                    description:datar.expense_description,
                    Date:datar.created_at,
                    UDate:datar.updated_at,
                    }
                  ])
            )
                })
                
        setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
}, []);

//delete row




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



  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      wrap: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
    },
    {
      name: 'Date',
      selector: (row) => row.Date,
    },
    {
      name: 'Update Date',
      selector: (row) => row.UDate,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/fees/expenses/edit/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <BsFillPencilFill style={{ color: 'orange', fontSize: '15px' }} />
            </button>
          </Link>
          <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)}>
            <MdDelete style={{ color: 'red', fontSize: '18px' }} />
          </button>
        </div>
      ),
    },
  ];

  // Function to delete a row
  const deleteRow = async(id) => {
    // Implement the delete functionality here
    await axios.delete(`/api/expenses/${id}`);
     setNotification("Depense deleted successfully");
    setVariant("danger");
     setTimeout(() => {
        setNotification("");
        setVariant("");
    }, 3000);
    navigate(`${x}/expenses`);
  };


  return (
    <div>
      <div className="d-flex justify-content-around">
        <input
          style={{ backgroundColor: 'rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
          type="text"
          placeholder="Search by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
          <Link to={`${x}/fees/expenses/add`}>
          <button className="btn btn-danger">Add Expense</button>
          </Link>
          </div>
          <DataTable columns={columns} data={Data}
          fixedHeader
          className="mt-4"
                    pagination
                    progressPending={pending}
                    highlightOnHover
                    customStyles={tableCustomStyles}
                    progressComponent={<Ellipsis  size={64}
                        color='#D60A0B'
                        sizeUnit='px' />}
          />
          </div>
          );
          } 
