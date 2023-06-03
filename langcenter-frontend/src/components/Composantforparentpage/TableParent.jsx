import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from "../Button"
import {
  BsFillEyeFill, BsFillPencilFill,
  MdDelete
} from 'react-icons/all';
import { Link } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';

export default function TableParent() {
  const { user } = UseStateContext();
  let x = "";
  if (user && user.role === 'admin') {
    x = "";
  } else if (user && user.role === 'director') {
    x = "/director";
  }
  else {
    x = "/secretary";
  }
  const col = [
    {
      name: "ID",
      selector: row => row.id
    },
    {
      name: "Name",
      selector: row => row.name
    },
    {
      name: "Gender",
      selector: row => row.gender
    },
    {
      name: "Occupation",
      selector: row => row.occupation
    },
    {
      name: "Address",
      selector: row => row.address
    },
    {
      name: "E-mail",
      selector: row => row.email
    },
    {
      name: "Phone",
      selector: row => row.phone
    },
    {
      name: "Action",
      selector: row => row.action,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
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
          <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.id)}>
            <MdDelete style={{ color: 'red', fontSize: '20px' }} />
          </button>
        </div>
      ),
    }
  ];

  const Data = [
    { id: "1", name: "sopa", gender: "male", occupation: "eng teacher", address: "sopa 3owa", email: "6@ma.com", phone: "060000000" },
    { id: "2", name: "sopa", gender: "male", occupation: "eng teacher", address: "sopa 3owa", email: "6@ma.com", phone: "060000000" },
    { id: "3", name: "sopa", gender: "male", occupation: "eng teacher", address: "sopa 3owa", email: "6@ma.com", phone: "060000000" }
  ];

  const [formData, setFormData] = useState([...Data]);

  const [records, setRecords] = useState(Data);

  function handleFilter(event) {
    const newData = Data.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div>
      <div className="row offset-1">
        <div className="col">
          <input type="text" className="form-control" placeholder="Search by Name" onChange={handleFilter} />
        </div>
        <div className="col">
          {/* Search by Class input field */}
        </div>
        <div className="col text-end me-5">
          <Link to={`${x}/parent/addParent`}>
            <Button className=" me-5" variant="danger" isDisabled={false} size="md" value="Add Parent" handleSmthg={() => console.log("chibakiya")} />
          </Link>
        </div>
      </div>

      <DataTable
        columns={col}
        data={records}
        fixedHeader
        pagination
      />
    </div>
  );
}
