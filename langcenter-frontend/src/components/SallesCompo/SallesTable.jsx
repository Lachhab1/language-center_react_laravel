import React ,{useState}from "react";
import  {Link} from 'react-router-dom'
import DataTable from "react-data-table-component";
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { UseStateContext } from "../../context/ContextProvider";

export default function SallesTable() {
        const {user} = UseStateContext()
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
const [nameFilter , setNameFilter] = useState('');
const data = [
    { id: "1", name: "18", capacity: "32" },
    { id: "2", name: '1', capacity: "24" },
    { id: "3", name: "r101", capacity: "60" }
];
const filteredData = data.filter((item)=>{
    const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase())
    return nameMatch;
});

function deleteRow(prop){
    console.log("delete row with id : "+prop);
}
const columns = [
    { name: "id", selector: row => row.id, sortable: true },
    { name: "name", selector: row => row.name, sortable: true },
    { name: "capacity", selector: row => row.capacity, sortable: true },
    { name: "actions", 
    cell: row => (
        <div>
           <Link to={`${x}/classroom/details/${row.id}`}>
           <button style={{ border: 'none', background: 'none' }} title="details">
              <FaEye style={{ color: 'lightBlue', fontSize: '16px' }} />
            </button>
           </Link>

           <Link to={`${x}/classroom/edit/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }} title="edit">
              <BsFillPencilFill style={{ color: 'orange', fontSize: '15px' }} />
            </button>
           </Link>
           <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)} title="delete">
            <MdDelete style={{ color: 'red', fontSize: '18px' }} />
          </button>
     
        </div>
    ) },
];



    return (
        <div>
            <div className="d-flex justify-content-around">
            <input  type="text" placeholder="search by name" value={nameFilter} onChange={(e)=> setNameFilter(e.target.value)} style={{backgroundColor:"rgba(221, 222, 238, 0.5)", border: "none" ,borderRadius: "8px"}} />
            <Link to={`${x}/classroom/add/`}>
            <button className="btn btn-danger">Add Classroom</button>
            </Link>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                fixedHeader 
                pagination
                noDataComponent="No data founds"
            />
        </div>
    );
}