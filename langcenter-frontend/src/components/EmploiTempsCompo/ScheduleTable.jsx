import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';


import { Ellipsis } from 'react-awesome-spinners'
export default function ScheduleTable({ handleDelete }) {
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
  
  const navigate = useNavigate();
  const {user,setNotification,setVariant} = UseStateContext()
  
 
  let x = '';
  if (user && user.role === 'admin') {
    x = '';
  } else if (user && user.role === 'director') {
    x = '/director';
  } else {
    x = '/secretary';
  }

  const [pending, setPending] = useState(true);
    const [groupFilter, setGroupFilter] = useState('');
    const [courseNameFilter, setCourseNameFilter] = useState('');
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          
      try {
        setPending(true); // Set pending to true before fetching data
        const response = await axios.get('/api/timeTable');
        const fetchedData = response.data;
        setData(fetchedData);
        setPending(false); // Set pending to false after data is fetched
      } catch (error) {
        console.error(error);
        setPending(false); // Set pending to false in case of an error
      }
    };
      fetchData();
    }, []);
  

  
    // Filter the data based on group and course name
    const filteredData = data.filter((item) => {

      
      const groupMatch = item.class_name && item.class_name.toLowerCase().includes(groupFilter.toLowerCase());
      const courseNameMatch = item.course_title && item.course_title.toLowerCase().includes(courseNameFilter.toLowerCase());
  
      return groupMatch && courseNameMatch;
    });
  
   
  
    // Define the columns for the DataTable
    const columns = [
      { name: 'id', selector: (row) => row.id, sortable: true },
      { name: 'Course Name', selector: (row) => row.course_title, sortable: true },
      { name: 'Class', selector: (row) => row.class_name, sortable: true },
      { name: 'Classroom', selector: (row) => row.classroom_name, sortable: true },
      { name: 'Start Time', selector: (row) => row.startTime, sortable: true },
      { name: 'Finish Time', selector: (row) => row.finishTime, sortable: true },
      {
        name: 'Day',
        selector: (row) => row.name, sortable: true },
      {
        name: 'Action',
        cell: (row) => (
          <div className="actions" style={{ display: 'flex', gap: '0px' }}>
            <Link to={`${x}/schedule/EditSchedule/${row.id}`}>
              <button style={{ border: 'none', background: 'none' }} title="Edit">
                <BsFillPencilFill style={{ color: 'orange', fontSize: '16px' }} />
              </button>
            </Link>
            <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)} title="Delete">
              <MdDelete style={{ color: 'red', fontSize: '20px' }} />
            </button>
          </div>
        ),
      },
    ];
    const deleteRow = async (id) => {

       //test
      console.log("data ", data , "  id ", id )
       function formatDate(date) {
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, '0');
         const day = String(date.getDate()).padStart(2, '0');
         return `${year}-${month}-${day}`;
       }
       
       function getDatesWithSpecificDays(desired_days) {
         console.log('function called ',dayId[0].end_date);
         const startDate = new Date(dayId[0].start_date);
         const endDate = new Date(dayId[0].end_date);
       
         const dates = [];
       
         for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
           if (desired_days===date.getDay()) {
             dates.push(formatDate(new Date(date)));
           }
         }
       
         return dates;
       }
       const dayId = data.filter((item) => {
        if (item.id === id) {
          return item.day_id;
        }
        return null; // Return null if the condition is not met
      });
      
       
       
       const day = (dayId[0].day_id == 7 ? 0 : dayId[0].day_id);
       console.log("days ", dayId[0]);

       console.log("so  id ", day);
       
       const result = getDatesWithSpecificDays(day);
       console.log('res ', result);
 
       axios.delete(`/api/studentsAttendance/${dayId[0].class_id}`, {
        data: {
          date: result
        }
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

        //samething teachers
        axios.delete(`/api/teachersAttendance/${dayId[0].class_id}`, {
          data: {
            date: result
          }
        })
          .then(response => {
            console.log('Response:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      
       
       // TEST END

      try {
        await axios.delete(`/api/timeTable/${id}`);
        setNotification("Timetable deleted successfully");
        setVariant("danger");
        setTimeout(() => {
          setNotification("");
          setVariant("");
        }, 3000);
        
        // Remove the deleted row from the data array
        setData((prevData) => prevData.filter((row) => row.id !== id));
      } catch (error) {
        console.error(error);
      } 
      
    };
    
  
    return (
      <div>
        <div className="d-flex justify-content-around">
          {/* Search field for course name */}
          <input
            style={{ backgroundColor: 'rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
            type="text"
            placeholder="Search Course Name"
            value={courseNameFilter}
            onChange={(e) => setCourseNameFilter(e.target.value)}
          />
          {/* Search field for group */}
          <input
            style={{ backgroundColor: 'rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
            type="text"
            placeholder="Search by Class"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
          />
          <Link to={`${x}/schedule/AddSchedule`}>
            <Button className="" variant="danger" isDisabled={false} size="md" value="Add Schedule" handleSmthg={() => console.log('')} />
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          progressPending={pending}
          customStyles={tableCustomStyles}
          className="mt-4"
          progressComponent={<Ellipsis  size={64}
              color='#D60A0B'
              sizeUnit='px' />}
          highlightOnHover
          striped
          noDataComponent="No matching records found."
        />
      </div>
    );
  }
  
