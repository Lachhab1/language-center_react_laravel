import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners';
import Button from '../Button';

export default function index() {
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
  };

  const { user, setNotification, setVariant } = UseStateContext();
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const navigate = useNavigate();

  let x = '';
  if (user && user.role === 'admin') {
    x = '';
  } else if (user && user.role === 'director') {
    x = '/director';
  } else {
    x = '/secretary';
  }

  const col = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Level',
      selector: (row) => row.level,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/tests/edit/${row.id}`}>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tests');
        setData(
          response.data.data.map((item) => ({
            id: item.id,
            name: item.name,
            duration: item.duration,
            price: item.price,
            level: item?.level,
          }))
        );
        setPending(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Filter data based on search criteria
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (!levelFilter || item.level?.toLowerCase().includes(levelFilter.toLowerCase()))
  );

  // Method to delete a row
  const deleteRow = async (id) => {
    try {
      const response = await axios.delete(`/api/tests/${id}`);
      console.log(response);
      setNotification('Test deleted successfully');
      setVariant('danger');
      navigate(`${x}/tests`);
    } catch (err) {
      console.log(err);
      setNotification('Test deletion failed');
      setVariant('danger');
    }
  };

  return (
    <div>
      <div className="row offset-1 my-2">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Level"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          />
        </div>
        <Link to={`${x}/tests/add`} className="col">
          <Button
            className=""
            variant="danger"
            isDisabled={false}
            size="md"
            value="add Test"
            handleSmthg={() => console.log('chibakiya')}
          />
        </Link>
      </div>
      <DataTable
        columns={col}
        data={filteredData}
        fixedHeader
        pagination
        progressPending={pending}
        customStyles={tableCustomStyles}
        progressComponent={<Ellipsis size={64} color="#D60A0B" sizeUnit="px" />}
      />
    </div>
  );
}
