import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { UseStateContext } from '../../context/ContextProvider';


export default function ScheduleTable({ data, handleDelete }) {
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
  const [groupFilter, setGroupFilter] = useState('');
  const [courseNameFilter, setCourseNameFilter] = useState('');

  // Filtre les données en fonction du groupe et du nom du cours
  const filteredData = data.filter((item) => {
    const groupMatch = item.group.toLowerCase().includes(groupFilter.toLowerCase());
    const courseNameMatch = item.name.toLowerCase().includes(courseNameFilter.toLowerCase());
    return groupMatch && courseNameMatch;
  });

  const deleteRow = (id) => {
    // Perform delete operation here
    // Example API call: deleteSchedule(id)
    // After successful deletion, update the state or fetch the updated data from the server

    // Call the handleDelete function passed from the parent component
    handleDelete(id);
  };

  // Define the columns for the DataTable
  const columns = [
    { name: 'id', selector:row => row.id, sortable: true },
    { name: 'Course Name', selector: row => row.name, sortable: true },
    { name: 'Course Level', selector: row => row.level, sortable: true },
    { name: 'Group', selector: row => row.group, sortable: true },
    { name: 'Classroom', selector: row => row.classroom, sortable: true },
    { name: 'Day', selector: row => row.day, sortable: true },
    { name: 'Start Time', selector: row => row.startTime, sortable: true },
    { name: 'End Time', selector: row => row.endTime, sortable: true },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/schedule/EditSchedule/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }} title="Edit">
              <BsFillPencilFill style={{ color: 'orange', fontSize: '16px'  }} />
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
          style={{ backgroundColor: "rgba(221, 222, 238, 0.5)", border: "none", borderRadius: "8px" }}
          type="text"
          placeholder="Search Course Name"
          value={courseNameFilter}
          onChange={(e) => setCourseNameFilter(e.target.value)}
        />
        {/* Champ de recherche pour le groupe */}
        <input
          style={{ backgroundColor: "rgba(221, 222, 238, 0.5)", border: "none", borderRadius: "8px" }}
          type="text"
          placeholder="Search Group"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
        />
        <Link to="/schedule/AddSchedule">
          <Button
            className=""
            variant="danger"
            isDisabled={false}
            size="md"
            value="Add Schedule"
            handleSmthg={() => console.log('chibakiya')}
          />
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
