import Button from "../Button"
import { useState,useEffect } from "react"
import DataTable from "react-data-table-component"
import { BsFillEyeFill, BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Ellipsis } from 'react-awesome-spinners'
import { UseStateContext } from "../../context/ContextProvider";
import AddClass from "./addClass";
import male from "../../images/icons/icons8-male (1).svg"
import female from "../../images/icons/icons8-female (1).svg"
import Form from 'react-bootstrap/Form';
export default function TableEtud()
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
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    //functions to hadnle modal show and close
    const handleListClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);
    const [levels,setLevels]=useState([]);
const {user,setNotification,setVariant} = UseStateContext()
const [pending, setPending] = useState(true);
const [data,setData]=useState([]);
const [records,setRecords]=useState([]);
const navigate = useNavigate();
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
useEffect(() => {
    const timeout = setTimeout(async() => {
        const response = await axios.get("/api/etudiants");
        const levels = await axios.get("/api/levels");
        setLevels(levels.data);
        response.data.data.map((datar) => {
            const classes = datar?.classes.map((item) => `${item?.name}`) || [];
            const classesString = classes.length > 0 && classes != "undefined" ? classes.join(', ') : 'No class';
            setData((prev)=>
            (
                [...prev,
                    {
                    id:datar.id,
                    name:datar.prenom+" "+datar.nom,
                    gender: datar.sexe,
                    class:  classesString,
                    parents:datar.parent?  (datar.parent?.nom+" "+datar.parent?.prenom) : "_________",
                    status:true,
                    level: datar?.level?.id,
                    }
                ])
            )
        
        })
        // setData(response.data.data);
        setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
}, []);

    console.log(data);
// delete a row
const deleteRow = async (id) => {
    await axios.delete(`/api/etudiants/${id}`);
    setNotification("Etudiant deleted successfully");
    setVariant("danger");
    setTimeout(() => {
        setNotification("");
        setVariant("");
        window.location.reload();
    }, 7000);
};
const handleChange = async (e,id) => {
    const level = e.target.value;
    const response = {
        student_id: id,
        level_id: level,
    }
    await axios.post(`/api/assignLevel`, JSON.stringify(response));
};











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
        sortable: true ,
        cell: (row) => (
            <div style={{ display: 'flex', gap: '0px' }}>
                {row.gender === "male" 
                    ?
                        (
                            <img src={male} width={"30px"}/>
                        )
                        :
                        (
                        <div>
                            <img src={female} width={"30px"}/>
                        </div>
                        )
                }
            </div>
        ),
    },
    {
        name:"Class",
        selector:row => row.class,
        sortable: true ,
        cell: (row) => (
            <div style={{ display: 'flex',justifyContent: 'space-between'}}>
                <div className="py-2 fs-6"
                    style={{
                    color: row.class == "No class" ? 'red' : 'black',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    }}>
                    {row.class}
                </div>
                <span className="fw-bold fs-4 text-center opacity-25 addClass" onClick={() => handleListClick(row)}>+</span>
                <AddClass showModal={showModal} handleClose={handleClose} selectedItem={selectedItem} id={row.id}/>           
            </div>
        ),
    },
    {
        name:"Parents",
        selector:row => row.parents,
        sortable: true 
    },
    {
        name:"Level",
        selector:row => row.level,
        sortable: true,
        cell: (row) => (
            <>
                <Form.Select defaultValue={row.level} size="md" onChange={(e) => handleChange(e, row.id)}>
                <option value="">Select level</option>
                {levels?.map((level) => (
                <option key={level.id} value={level.id}>{level.name}</option>
                ))}
                </Form.Select>
                <br />
                </>
        ),
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
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
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
        useEffect
        (
            () => {
                setRecords(data)
            },[data]
        )
        function  handlefilter(event)
        {
                 const newData = data.filter(row => {
                return row.name.toLowerCase().includes(event.target.value.toLowerCase())
                  }
            )
            setRecords(newData)
        }
        const [filterC,setFilterC]=useState("")
        function handlefilterC(event)
        {
                const newData = data.filter(row => {
                    return row.class.toLowerCase().includes(event.target.value.toLowerCase())
                })
                setRecords(newData);
        }
    return(
    <div>
        <div className="row offset-1 my-2">
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
                    data={records}
                    fixedHeader
                    pagination
                    progressPending={pending}
                    customStyles={tableCustomStyles}
                    progressComponent={<Ellipsis  size={64}
                        color='#D60A0B'
                        sizeUnit='px' />}
            >
             </DataTable>
                </div>
    )

}