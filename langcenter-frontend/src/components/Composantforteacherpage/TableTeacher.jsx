import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { UseStateContext } from '../../context/ContextProvider';

export default function TableTeacher() {
  const {user} = UseStateContext()
  const [nameFilter, setNameFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
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
  const data = [
    { id: '1', name: 'Sopa', gender: 'Male', class: 'C-4', subject: 'Sopa 3owa', status: 'Active', phone: '060000000' },
    { id: '2', name: 'Ayman Kacemi', gender: 'Male', class: 'C-5', subject: 'Mathematics', status: 'Active', phone: '065555555' },
    { id: '3', name: 'Youssef Hafiane', gender: 'Male', class: 'C-6', subject: 'Science', status: 'Active', phone: '067777777' },
    { id: '4', name: 'Lachhab Mohammed', gender: 'Male', class: 'C-7', subject: 'English', status: 'Active', phone: '069999999' },
    { id: '5', name: 'Sopa', gender: 'Male', class: 'C-4', subject: 'Sopa 3owa', status: 'Active', phone: '060000000' },
    { id: '6', name: 'Ayman Kacemi', gender: 'Male', class: 'C-5', subject: 'Mathematics', status: 'Active', phone: '065555555' },
    { id: '7', name: 'Youssef Hafiane', gender: 'Male', class: 'C-6', subject: 'Science', status: 'Active', phone: '067777777' },
    { id: '8', name: 'Lachhab Mohammed', gender: 'Male', class: 'C-7', subject: 'English', status: 'Active', phone: '069999999' },
    { id: '9', name: 'Sopa', gender: 'Male', class: 'C-4', subject: 'Sopa 3owa', status: 'Active', phone: '060000000' },
    { id: '10', name: 'Ayman Kacemi', gender: 'Male', class: 'C-5', subject: 'Mathematics', status: 'Active', phone: '065555555' },
    { id: '11', name: 'Youssef Hafiane', gender: 'Male', class: 'C-6', subject: 'Science', status: 'Active', phone: '067777777' },
    { id: '12', name: 'Lachhab Mohammed', gender: 'Male', class: 'C-7', subject: 'English', status: 'Active', phone: '069999999' },
    // Add more data objects here
  ];

  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    const classMatch = item.class.toLowerCase().includes(classFilter.toLowerCase());
    return nameMatch && classMatch;
  });

  const col = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      wrap:true,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'Class',
      selector: (row) => row.class,
    },
    {
      name: 'Subject',
      selector: (row) => row.subject,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/teacher/details/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <FaEye style={{ color: 'lightBlue', fontSize: '16px' }} />
            </button>
          </Link>
          <Link to={`${x}/teacher/edit/${row.id}`}>
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

  return (
    <div>
      <div className="d-flex justify-content-around">
        <input
          style={{ backgroundColor: ' rgba(221, 222, 238, 0.5)', border:'none', borderRadius: '8px' }}
          type="text"
          placeholder="Search by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          style={{ backgroundColor: ' rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
          type="text"
          placeholder="Search by Class"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        />
        <Link to={`${x}/teacher/add`}>
          <button className="btn btn-danger">Add Teacher</button>
        </Link>
      </div>
      <DataTable columns={col} data={filteredData} fixedHeader pagination />
    </div>
  );
}
