import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import EditCourse from './EditCourse';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import AddCourse from './AddCourse';
import { useParams, useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners';

export default function TableCourse() {
  const { user, setNotification, setVariant } = UseStateContext();
  let x = '';
  if (user && user.role === 'admin') {
    x = '';
  } else if (user && user.role === 'director') {
    x = '/director';
  } else {
    x = '/secretary';
  }

  const [coursData, setCoursData] = useState([]);
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const response = await axios.get('/api/cours');
      const newData = response.data.map((datar) => ({
        id: datar.id,
        course_name: datar.title,
        duration: datar.duration,
        price: datar.price,
        description: datar.description,
      }));
      setCoursData(newData);
      setRecords(newData); // Update records with the newly fetched data
      setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  // delete row
  const deleteRow = async (id) => {
    await axios.delete(`/api/cours/${id}`);
    setNotification('Cours deleted successfully');
    setVariant('danger');
    setTimeout(() => {
      setNotification('');
      setVariant('');
    }, 3000);
    navigate(`${x}/course`);
  };

  const col = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Course Name',
      selector: (row) => row.course_name,
    },
    {
      name: 'Duration[Hour]',
      selector: (row) => row.duration,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/course/edit/${row.id}`}>
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

  const [records, setRecords] = useState(coursData);

  const handleSearchChange = (searchQuery) => {
    const filteredData = coursData.filter((item) =>
      item.course_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setRecords(filteredData);
  };

  return (
    <div>
      <div className="row offset-1">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Course Name"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="col">
          <Link to={`${x}/course/add`}>
            <Button
              className=""
              variant="danger"
              isDisabled={false}
              size="md"
              value="Add Course"
              handleSmthg={() => console.log('chibakiya')}
            />
          </Link>
        </div>
      </div>
      <DataTable
        columns={col}
        data={records}
        fixedHeader
        pagination
        progressPending={pending}
        progressComponent={<Ellipsis size={64} color="#D60A0B" sizeUnit="px" />}
      />
    </div>
  );
}
