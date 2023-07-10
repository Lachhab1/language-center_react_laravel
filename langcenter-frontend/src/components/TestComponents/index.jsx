import Button from "../Button"
import { useState,useEffect } from "react"
import DataTable from "react-data-table-component"
import { BsFillEyeFill, BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Ellipsis } from 'react-awesome-spinners'
import { UseStateContext } from "../../context/ContextProvider";

export default function index() {
    const weww = "weww"
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
    const col = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'duration',
            selector: row => row.duration,
            sortable: true,
        }
        ,
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        }
        ,
        {
            name: 'Level',
            selector: row => row.level,
            sortable: true,

        }
        ,
        {
            name: 'Action',
            selector: row => row.action,
            cell: row => (
            <div style={{ display: 'flex', gap: '0px' }}>
                <Link to={`${x}/tests/${row.id}`}>
                    <button style={{ border: 'none', background: 'none'}}>
                        <BsFillEyeFill style={{ color: 'green', fontSize: '20px' }} />
                    </button>
                </Link>
                <Link to={`${x}/tests/edit/${row.id}`}>
                    <button style={{ border: 'none', background: 'none' }}>
                        <BsFillPencilFill style={{ color: 'orange' }} />
                    </button>
                </Link>
          <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)}>
            <MdDelete style={{ color: 'red', fontSize: '20px' }} />
          </button>
        </div>
            )
        }
    ]
    useEffect(() => {
        const timeout = setTimeout(async () => {
            const fetchData = async () => {
                try {
                    const response = await axios.get("/api/tests");
                    setData(
                        response.data.data.map((item) => {
                            return {
                                id: item.id,
                                name: item.name,
                                duration: item.duration,
                                price: item.price,
                                level: item?.level,
                            };
                        })
                        );
                    console.log(response.data.data);
                    setPending(false);
                } catch (err) {
                    console.log(err);
                }
            };
            await fetchData();
        }, 1000);
        return () => clearTimeout(timeout);
    }, [data]);
    //methodes
    const deleteRow = async (id) => {
        try {
            const response = await axios.delete(`/api/tests/${id}`);
            console.log(response);
            setNotification("Test deleted successfully")
            setVariant("danger")
            navigate(`${x}/tests`)
        } catch (err) {
            console.log(err);
            setNotification("Test deleted failed")
            setVariant("danger")
        }
    };

    return (
            <div>
        <div className="row offset-1 my-2">
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Name"/>
            </div>
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by level"/>
            </div>
            <Link to={`${x}/tests/add`} className="col">
                    <Button className="" variant="danger" isDisabled={false} size="md" value="add Test" handleSmthg={() => console.log("chibakiya")}/>
            </Link>
        </div>
            <DataTable
                    columns={col}
                    data={data}
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
