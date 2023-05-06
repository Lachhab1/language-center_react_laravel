import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';


export default function ScheduleTable({ data, handleDelete }) {
  const [groupFilter, setGroupFilter] = useState('');
  const [courseNameFilter, setCourseNameFilter] = useState('');

  // Filtre les données en fonction du groupe et du nom du cours
  const filteredData = data.filter((item) => {
    const groupMatch = item.group.toLowerCase().includes(groupFilter.toLowerCase());
    const courseNameMatch = item.courseName.toLowerCase().includes(courseNameFilter.toLowerCase());
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
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'Course Name', selector: 'courseName', sortable: true },
    { name: 'Course Level', selector: 'courseLevel', sortable: true },
    { name: 'Group', selector: 'group', sortable: true },
    { name: 'Classroom', selector: 'classroom', sortable: true },
    { name: 'Day', selector: 'day', sortable: true },
    { name: 'Start Time', selector: 'startTime', sortable: true },
    { name: 'End Time', selector: 'endTime', sortable: true },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`/schedule/EditSchedule/${row.id}`}>
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
  ];

  return (
    <div>
      <div className="d-flex justify-content-around">
        {/* Champ de recherche pour le nom du cours */}
        <input
          style={{ backgroundColor: "#E5E5E5", border: "none", borderRadius: "8px" }}
          type="text"
          placeholder="Search Course Name"
          value={courseNameFilter}
          onChange={(e) => setCourseNameFilter(e.target.value)}
        />
        {/* Champ de recherche pour le groupe */}
        <input
          style={{ backgroundColor: "#E5E5E5", border: "none", borderRadius: "8px" }}
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
