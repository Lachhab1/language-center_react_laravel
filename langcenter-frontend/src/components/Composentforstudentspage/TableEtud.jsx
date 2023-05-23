import Button from "../Button"
import { useState,useEffect } from "react"
import DataTable from "react-data-table-component"
import { BsFillPencilFill,
    MdDelete,
    BsFillEyeFill}from 'react-icons/all';
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Ellipsis } from 'react-awesome-spinners'
import { UseStateContext } from "../../context/ContextProvider";

export default function TableEtud()
{
const {user} = UseStateContext()
const [pending, setPending] = useState(true);
const [data,setData]=useState([]);

useEffect(() => {
    const timeout = setTimeout(async() => {
        const response = await axios.get("/api/inscrire-classes");
        console.log(response.data.data);
        response.data.data.map((datar) => {
            setData((prev)=>
            (
                [...prev,
                    {
                    id:datar.etudiant.id,
                    name:datar.etudiant.prenom+" "+datar.etudiant.nom,
                    gender: datar.etudiant.sexe,
                    class:datar.class.class_nom,
                    parents:datar.parent.prenom+" "+datar.parent.nom,
                    status:datar.etudiant.isActive,
                    }
                ])
            )
        
        })
        // setData(response.data.data);
        setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
}, []);

//     console.log(data);
// // delete a row
// const deleteRow = async (id) => {
//     await axios.delete(`/api/inscrire-classes/${id}`);
//     setNotification("User deleted successfully");
//     setVariant("danger");
//     setTimeout(() => {
//         setNotification("");
//     }, 3000);
//     navigate("/student");
// };
let x = ""
if (user && user.role==='admin')
{
    x = ""
} else if (user && user.role==='director')
{
    x="/directeur"
}
else{
    x="/secretary"
}













//define the columns of the table
const col=[
    {
        name:"ID",
        selector:row => row.id,
    },
    {
        name:"Name",
        selector:row => row.name,
        sortable: true 
    },
    {
        name:"Gender",
        selector:row => row.gender,
    },
    {
        name:"Class",
        selector:row => row.class,
        sortable: true 
    },
    {
        name:"Parents",
        selector:row => row.parents,
        sortable: true 
    },
    {
        name:"Status",
        selector:row => row.status,
        sortable: true,
        cell: (row) => (
            <div style={{ display: 'flex', gap: '0px' }}>
                <div className="badge badge-pill badge-success px-3 py-2 font-weight-bold"
                    style={{
                    color: row.status ? 'green' : 'red',
                    }}>
                    {row.status ? 'Active' : 'Inactive'}
                </div>
            </div>
        ),
    },
    {
        name:"Action",
        selector:row => row.action,
        cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
            <Link to={`${x}/student/${row.id}`}>
            <button style={{ border: 'none', background: 'none'}}>
              <BsFillEyeFill style={{ color: 'green', fontSize: '20px' }} />
            </button>
            </Link>
                <Link to={`${x}/student/editStudent/${row.id}`}>
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

const Data=[

    {
        id:1,
        name:"youssef",
        class:"5"
        
    },
    {
        id:2,
        name:"mohammed",
        class:"7"
    },
    {
        id:3,
        name:"othmane",
        class:"8"
    },
    {
        id:4,
        name:"aziz",
        class:"5"
        
    },
    {
        id:5,
        name:"kamal",
        class:"7"
    },
    {
        id:6,
        name:"aymen",
        class:"8"
    },
    {
        id:7,
        name:"messi",
        class:"5"
        
    },
    {
        id:8,
        name:"walid",
        class:"7"
    },
    {
        id:9,
        name:"ronaldo",
        class:"8"
    },
    {
        id:10,
        name:"ayoube",
        class:"5"
        
    },
    {
        id:11,
        name:"zakaria",
        class:"7"
    },
    {
        id:12,
        name:"mountasir",
        class:"8"
    }

]
        const [records,setRecords]=useState(Data);
        const [recordsC,setRecordsC]=useState(Data);
        function handlefilter(event)
        {
            const NewData = Data.filter(row => {
                return row.name.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecords(NewData)
        }
        function handlefilterC(event)
        {
            const NewData = Data.filter(row => {
                return row.class.toLowerCase().includes(event.target.value.toLowerCase())
            }) 
            setRecords(NewData)
        }
        
    return(

    <div>
        <div className="row offset-1">
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Name" onChange={handlefilter}/>
            </div>
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Class" onChange={handlefilterC}/>
            </div>
            <Link to={`${x}/student/addStudent`} className="col">
                    <Button className="" variant="danger" isDisabled={false} size="md" value="add Student" handleSmthg={() => console.log("chibakiya")}/>
            </Link>
        </div>
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