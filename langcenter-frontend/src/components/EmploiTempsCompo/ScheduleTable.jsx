import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners'
export default function ScheduleTable({ handleDelete }) {
  
  const { user } = UseStateContext();
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
      fetchData();
    }, []);
  
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
  
    // Filter the data based on group and course name
    const filteredData = data.filter((item) => {
      const groupMatch = item.class_name && item.class_name.toLowerCase().includes(groupFilter.toLowerCase());
      const courseNameMatch = item.course_title && item.course_title.toLowerCase().includes(courseNameFilter.toLowerCase());
      return groupMatch && courseNameMatch;
    });
  
    const deleteRow = (id) => {
      // Call the handleDelete function passed from the parent component
      handleDelete(id);
    };
  
    // Define the columns for the DataTable
    const columns = [
      { name: 'id', selector: (row) => row.id, sortable: true },
      { name: 'Course Name', selector: (row) => row.course_title, sortable: true },
      { name: 'Class', selector: (row) => row.class_name, sortable: true },
      { name: 'Classroom', selector: (row) => row.classroom_name, sortable: true },
      { name: 'Start Time', selector: (row) => row.startTime, sortable: true },
      { name: 'Finish Time', selector: (row) => row.finishTime, sortable: true },
      {
        name: 'Days',
        selector: (row) => {
          const days = typeof row.days === 'string' ? JSON.parse(row.days) : row.days;
          return Array.isArray(days) ? days.join(', ') : '';
        },
        sortable: true,
      },
      
      {
        name: 'Action',
        cell: (row) => (
          <div style={{ display: 'flex', gap: '0px' }}>
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
          <Link to="/schedule/AddSchedule">
            <Button className="" variant="danger" isDisabled={false} size="md" value="Add Schedule" handleSmthg={() => console.log('chibakiya')} />
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          progressPending={pending}
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
  
