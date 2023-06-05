import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';

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

  const [groupFilter, setGroupFilter] = useState('');
  const [courseNameFilter, setCourseNameFilter] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/timeTable');
      const fetchedData = response.data;
      console.log('11', ...fetchedData);
      // Fetch additional data for each row
      const processedData = await Promise.all(
        fetchedData.map(async (row) => {
          const courseId = row.course_id;
          const classId = row.class_id;
          const classroomId = row.classroom_id;

          try {
            const [courseResponse, classResponse, classroomResponse] = await Promise.all([
              axios.get(`/api/cours/${courseId}`),
              axios.get(`/api/classes/${classId}`),
              axios.get(`/api/classroom/${classroomId}`),
            ]);

            const courseTitle = courseResponse.data.title;
            const className = classResponse.data.name;
            const classroomTitle = classroomResponse.data.name;

            return {
              ...row,
              courseTitle,
              className,
              classroomTitle,
            };
          } catch (error) {
            // Handle error for individual request
            console.error(error);
            // Return a placeholder row or skip this row if necessary
            return null;
          }
        })
      );

      // Remove any null values from processedData array
      const filteredData = processedData.filter((row) => row !== null);

      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  // Filtre les données en fonction du groupe et du nom du cours
  const filteredData = data.filter((item) => {
    const groupMatch = item.group && item.group.toLowerCase().includes(groupFilter.toLowerCase());
    const courseNameMatch = item.courseTitle && item.courseTitle.toLowerCase().includes(courseNameFilter.toLowerCase());
    return groupMatch && courseNameMatch;
  });

  const deleteRow = (id) => {
    // Call the handleDelete function passed from the parent component
    handleDelete(id);
  };

  // Define the columns for the DataTable
  const columns = [
    { name: 'id', selector: (row) => row.id, sortable: true },
    { name: 'Course Name', selector: (row) => row.courseTitle, sortable: true },
    { name: 'Class', selector: (row) => row.className, sortable: true },
    { name: 'Classroom', selector: (row) => row.classroomTitle, sortable: true },
    { name: 'Start Time', selector: (row) => row.startTime, sortable: true },
    { name: 'Finish Time', selector: (row) => row.finishTime, sortable: true },
    { name: 'Days', selector: (row) => row.days, sortable: true },
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
        {/* Champ de recherche pour le nom du cours */}
        <input
          style={{ backgroundColor: 'rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
          type="text"
          placeholder="Search Course Name"
          value={courseNameFilter}
          onChange={(e) => setCourseNameFilter(e.target.value)}
        />
        {/* Champ de recherche pour le groupe */}
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
        pagination
        highlightOnHover
        striped
        noDataComponent="No matching records found."
      />
    </div>
  );
}
