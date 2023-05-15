import axios from "../../api/axios"
import Button from "../Button"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { BsFillPencilFill,
    MdDelete,
    BsFillEyeFill}from 'react-icons/all';
import { useEffect,useState } from "react";
import { UseStateContext } from "../../context/ContextProvider";
export default function TabUser()
{
//fetching data from the database
const [data,setData]=useState([]);
const {notification,setNotification,variant,setVariant} = UseStateContext();
const getUsers = async () => {
    const response = await axios.get("/api/users");
    setData(response.data.data);
    };
    useEffect(() => {
        getUsers();
    }, []);
//delete a row
const deleteRow = async (id) => {
    await axios.delete(`/api/users/${id}`);
    setNotification("User deleted successfully");
    setVariant("danger");
    setTimeout(() => {
        setNotification("");
    }, 3000);
    getUsers();
    };




//the structure of the table
const col=[
    {
        name:"first Name",
        selector:row => row.first_name,
        sortable: true 
    },
    {
        name:"last Name",
        selector:row => row.last_name,
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



        const [records,setRecords]=useState(data);
        const [recordsR,setRecordsR]=useState(data);
        function handlefilter(event)
        {
            const NewData = data.filter(row => {
                return row.last_name.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecords(NewData)
        }
        function handlefilterR(event)
        {
            const NewData = data.filter(row => {
                return row.role.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecordsR(NewData)
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
                    data={data}
                    fixedHeader
                    pagination
            >
             </DataTable>
                </div>
    )

}