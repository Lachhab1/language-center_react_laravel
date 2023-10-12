import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import axios from '../../api/axios';
import { BsFillEyeFill, BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { Ellipsis } from 'react-awesome-spinners';
import { Formik } from 'formik';

export default function TableParent() {
  const [nameFilter, setNameFilter] = useState('');
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
   const [pending, setPending] = useState(true);
  const [parentData, setParentData] = useState([]);
  const { user } = UseStateContext();
  let x = '';
  if (user && user.role === 'admin') {
    x = '';
  } else if (user && user.role === 'director') {
    x = '/director';
  } else {
    x = '/secretary';
  }

  useEffect(() => {
    const fetchData = async () =>
      axios
        .get('api/parents')
        .then((response) => {
          console.log(response.data.data);
          setParentData(
            response.data.data.map((item) => ({
              id: item.id,
              name: item.nom + ' ' + item.prenom,
              cin: item.cin,
              date_naissance: item.date_naissance,
              email: item.email,
              gender: item.sexe,
              address: item.adresse,
              phone: item.telephone,
              nb_enfants: item.nb_enfant_inscrit,
            }))
          );
        })
        .catch((error) => {
          Formik.setErrors(error.response.data.errors);
        });

    setTimeout(async () => {
      await fetchData();
      setPending(false);
    }, 200);
  }, []);

  const col = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
    },
    {
      name: 'E-mail',
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: "Nombre d'enfants",
      selector: (row) => row.nb_enfants,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions" style={{ display: 'flex', gap: '0px' }}>
          <Link to={`${x}/parent/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <BsFillEyeFill style={{ color: 'green', fontSize: '20px' }} />
            </button>
          </Link>
          <Link to={`${x}/parent/edit/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <BsFillPencilFill style={{ color: 'orange' }} />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const filteredData = parentData.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    return nameMatch;
  });

  useEffect(() => {
    setRecords(filteredData);
  }, [nameFilter, parentData]);

  const [records, setRecords] = useState(filteredData);

  return (
    <div>
      <div className="ms-2 w-25">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
          }}
        />
      </div>

      <DataTable
        columns={col}
        data={records}
        fixedHeader
                    pagination
                    customStyles={tableCustomStyles}
                    className="mt-4"
                    progressPending={pending}
                    progressComponent={<Ellipsis  size={64}
                    color='#D60A0B'
                    sizeUnit='px' />} 
      />
    </div>
  );
}
