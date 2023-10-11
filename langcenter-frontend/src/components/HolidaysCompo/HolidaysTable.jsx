import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { Ellipsis } from 'react-awesome-spinners';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { UseStateContext } from '../../context/ContextProvider';

const HolidaysTable = () => {
  const [holidaysData, setHolidaysData] = useState([]);
  const [pending, setPending] = useState(true);
  const { user, setNotification, setVariant } = UseStateContext();

  let x = '';
  if (user && user.role === 'admin') {
    x = '';
  } else if (user && user.role === 'director') {
    x = '/director';
  } else {
    x = '/secretary';
  }

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await axios.get('api/holiday');
        console.log('res ', res);
        setHolidaysData(
          res.data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              start_date: item.start_date,
              end_date: item.end_date,
            };
          })
        );
        setPending(false);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  const deleteRow = async (id) => {
    try {
      await axios.delete(`/api/holiday/${id}`);
      setNotification('Holiday deleted successfully');
      setVariant('danger');
      setTimeout(() => {
        setNotification('');
        setVariant('');
      }, 3000);

      // Remove the deleted row from the data array
      setHolidaysData((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  console.log('holidays', holidaysData);

  const columns = [
    { name: 'id', selector: (row) => row.id, sortable: true },
    { name: 'name', selector: (row) => row.name, sortable: true },
    { name: 'start date', selector: (row) => row.start_date, sortable: true },
    { name: 'end date', selector: (row) => row.end_date, sortable: true },
    {
      name: 'actions',
      cell: (row) => (
        <div>
          {/* <Link to={`${x}/classroom/details/${row.id}`}>
            <button style={{ border: "none", background: "none" }} title="details">
              <FaEye style={{ color: "lightBlue", fontSize: "16px" }} />
            </button>
          </Link> */}

          <Link to={`${x}/holidays/editHoliday/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }} title='edit'>
              <BsFillPencilFill style={{ color: 'orange', fontSize: '15px' }} />
            </button>
          </Link>
          <button
            style={{ border: 'none', background: 'none' }}
            onClick={() => deleteRow(row.id)}
            title='delete'
          >
            <MdDelete style={{ color: 'red', fontSize: '18px' }} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <h2>
        <a href={`${x}/holidays/addHoliday`}>Add Holiday</a>
      </h2>
      <DataTable
        columns={columns}
        data={holidaysData}
        fixedHeader
        pagination
        progressPending={pending}
        progressComponent={<Ellipsis size={64} color='#D60A0B' sizeUnit='px' />}
      />
    </div>
  );
};

export default HolidaysTable;
