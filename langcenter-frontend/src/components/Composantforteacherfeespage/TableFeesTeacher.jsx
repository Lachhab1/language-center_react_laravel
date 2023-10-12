import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import EditfeesT from './EditfeesT';
import { UseStateContext } from '../../context/ContextProvider';
import { Button } from "react-bootstrap"
import axios from "../../api/axios";

export default function TableFeesTeacher()
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
    const col=[
        {
            name:"ID",
            selector:row => row.id
        },
        {
            name:"Full Name",
            selector:row => row.name
        },
        {
            name:"worked Hours",
            selector:row => row.hours
        },
        {
            name:"Year",
            selector:row => row.year
        },
        {
            name:"Month",
            selector:row => row.month
        },
        {
            name:"Amount",
            selector:row => row.amount
        },
        {
            name:"Date of payment",
            selector:row => row.date
        },
        {
            name:"Action",
            selector:row => row.action,
            cell: (row) => (
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/fees/teacher/edit/${row.id}`}>
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
    const [feesData,setFeesData]=useState([])
    useEffect(()=>{
        console.log("useEffect")
        const getFeesData = async() => {
            const response = await axios.get('/api/salary');
            setFeesData(
                response.data.data.map((row) => ({
                    id:row.id,
                    name:row.teacher_name,
                    hours:row.hours,
                    amount:row.salary,
                    year:row.year,
                    month:row.month,
                    date:row.date,
                })
                )
            );
          }
          getFeesData()
          console.log(feesData)
    },[])
    const [Namefilter,setNamefilter]=useState(feesData)
    useEffect(()=>{
      setNamefilter(feesData)
    },[feesData])
    function handelfilterbyname(event)
    {
      const newData=feesData.filter(row =>{
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setNamefilter(newData)
    }
    const deleteRow = (id) => {
        axios.delete(`/api/salary/${id}`);
        setNotification('Salary has been deleted successfully');
        setVariant('danger');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        setFeesData(feesData.filter((row) => row.id !== id));
      };
    return(
            <div>
            <h2>Teachers fees</h2>
            <div className="row offset-1">
              <div className='col'>
              <input type="text" className="form-control" onChange={handelfilterbyname} placeholder="Search by Name"  />
              </div>
              <div className='col'>
                 <Link to={`${x}/fees/teacher/add`}>
              <Button variant="primary" className="btn btn-primary" style={{marginLeft:"10px"}}>Add</Button>
              </Link>
              </div>
            </div>
           
              
            <DataTable
                    columns={col}
                    data={Namefilter}
                    fixedHeader
                    pagination
                    className="mt-4"
                    customStyles={tableCustomStyles}
            >
             </DataTable>
             
        </div>
    )
}