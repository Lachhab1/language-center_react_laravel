import axios from "../../api/axios"
import Button from "../Button"
import DataTable from "react-data-table-component"
import { Ellipsis } from 'react-awesome-spinners'
import { Link, Navigate,useNavigate } from "react-router-dom"
import { BsFillEyeFill, BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useEffect,useState } from "react";
import { UseStateContext } from "../../context/ContextProvider";
import {Form,Col,Row} from "react-bootstrap";
export default function TabUser()
{
//fetching data from the database
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
const [pending, setPending] = useState(true);
const [data,setData]=useState([]);
const {setNotification,setVariant} = UseStateContext();
const navigate = useNavigate();

const getUsers = async () => {
    
    };
    useEffect(() => {
        const timeout = setTimeout(async() => {
			const response = await axios.get("/api/users");
            setData(response.data.data);
			setPending(false);
		}, 200);
		return () => clearTimeout(timeout);
    }, [data]);
    
//delete a row
const deleteRow = async (id) => {
    await axios.delete(`/api/users/${id}`);
    setNotification("User deleted successfully");
    setVariant("danger");
    setTimeout(() => {
        setNotification("");
        setVariant("");
    }, 3000);
    navigate("/users");
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
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
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
        function handlefilter(event)
        {
            const NewData = data.filter(row => {
                return row.last_name.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecords(NewData)
        }
        function handleFilterByRole(event)
        {
          const selectedRole = event.target.value.toLowerCase();

            // Filtrer les lignes en fonction du statut
            const newData = data.filter((row) => row.status.toLowerCase() === selectedRole);
            setRecords(newData);
        }
    return(

    <div>
        <div className="row offset-1">
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Last Name" onChange={handlefilter}/>
            </div>
            <div className="col">
                 <Form.Select type="text" className="form-control" onChange={handleFilterByRole}>
                        <option value="">Filter by Role</option>
                        <option value="admin">Admin</option>
                        <option value="director">director</option>
                        <option value="secretary">Secretary</option>
                 </Form.Select>
            </div>
            <Link to="/users/addUser" className="col">
                    <Button className="" variant="danger" isDisabled={false} size="md" value="New User" handleSmthg={() => console.log("chibakiya")}/>
            </Link>
        </div>
            <DataTable
                    columns={col}
                    data={data}
                    className="mt-4"
                    fixedHeader
                    pagination
                    customStyles={tableCustomStyles}
                    progressPending={pending}
                    progressComponent={<Ellipsis  size={64}
                        color='#D60A0B'
                        sizeUnit='px' />}
            >
             </DataTable>
                </div>
    )

}