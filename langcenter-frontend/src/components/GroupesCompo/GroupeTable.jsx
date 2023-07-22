import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { UseStateContext } from '../../context/ContextProvider';
import { useEffect } from 'react';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners'

export default function ClassPage() {
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
  const [nameFilter, setNameFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [classData,setClassData]=useState([]);
  const [pending, setPending] = useState(true);
//data from api
useEffect(() => {
    const timeout = setTimeout(async() => {
        const response = await axios.get("/api/classes");
     
        response.data.map((datar) => {
            setClassData((prev)=>
            (
                [...prev,
                    {
                    id:datar.id,
                    name:datar.name,
                    schoolYear: datar.school_year,
                    capacity:datar.capacity,
                    level:datar.level,
                    startDate:datar.start_date,
                    endDate:datar.end_date,
                    students: datar.nb_etudiants,
                    course: datar.cours.title,
                    teacher: datar.teacher?.first_name + " " + datar.teacher?.last_name,
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


  // const filteredData = data.filter((item) => {
  //   const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
  //   const courseMatch = item.course.toLowerCase().includes(courseFilter.toLowerCase());
  //   return nameMatch && courseMatch;
  // });

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
      name: 'Teacher',
      selector: (row) => row.teacher,
    },
    {
      name: 'Course',
      selector: (row) => row.course,
    },
    {
      name: 'Level',
      selector: (row) => row.level,
    },
    {
      name: 'Number of Students',
      selector: (row) => row.students,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/class/details/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <FaEye style={{ color: 'lightBlue', fontSize: '16px' }} />
            </button>
          </Link>
          <Link to={`${x}/class/edit/${row.id}`}>
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
    await axios.delete(`/api/classes/${id}`);
     setNotification("Class deleted successfully");
    setVariant("danger");
     setTimeout(() => {
        setNotification("");
        setVariant("");
    }, 3000);
    navigate(`${x}/class`);
  };

  const filteredData = classData.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    const coursMatch = item.course.toLowerCase().includes(courseFilter.toLowerCase());
    return nameMatch && coursMatch;
  });

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
        <input
          style={{ backgroundColor: 'rgba(221,222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
          type="text"
          placeholder="Search by Course"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          />
          <Link to={`${x}/class/add`}>
          <button className="btn btn-danger">Add Class</button>
          </Link>
          </div>
          <DataTable columns={columns} data={filteredData}
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
