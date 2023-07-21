import axios from "../../api/axios"
import Button from "../Button"
import DataTable from "react-data-table-component"
import { Ellipsis } from 'react-awesome-spinners'
import { Link, useNavigate } from "react-router-dom"
import { BsFillEyeFill, BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from "react";
import { UseStateContext } from "../../context/ContextProvider";
import { Form, Col, Row } from "react-bootstrap";

export default function TabUser() {
  const navigate = useNavigate();
  const { setNotification, setVariant } = UseStateContext();
  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const getUsers = async () => {
    // Fetch user data from the database
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const response = await axios.get("/api/users");
      setData(response.data.data);
      setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const deleteRow = async (id) => {
    await axios.delete(`/api/users/${id}`);
    setNotification("User deleted successfully");
    setVariant("danger");
    setTimeout(() => {
      setNotification("");
      setVariant("");
    }, 3000);
    navigate("/users");
  };

  const col = [
    {
      name: "first Name",
      selector: (row) => row.first_name,
      sortable: true
    },
    {
      name: "last Name",
      selector: (row) => row.last_name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0px' }}>
          <Link to={`/users/${row.id}`}>
            <button style={{ border: 'none', background: 'none' }}>
              <BsFillEyeFill style={{ color: 'green', fontSize: '20px' }} />
            </button>
          </Link>
          <Link to={`/users/editUser/${row.id}`}>
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

  const filteredData = data.filter((item) => {
    const lastNameMatch = item.last_name.toLowerCase().includes(lastNameFilter.toLowerCase());
    const roleMatch = item.role.toLowerCase().includes(roleFilter.toLowerCase());
    return lastNameMatch && roleMatch;
  });

  function handleFilterByLastName(event) {
    setLastNameFilter(event.target.value);
  }

  function handleFilterByRole(event) {
    setRoleFilter(event.target.value);
  }

  return (
    <div>
      <div className="row offset-1">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Last Name"
            value={lastNameFilter}
            onChange={handleFilterByLastName}
          />
        </div>
        <div className="col">
          <Form.Select type="text" className="form-control" onChange={handleFilterByRole}>
            <option value="">Filter by Role</option>
            <option value="admin">Admin</option>
            <option value="director">director</option>
            <option value="secretary">Secretary</option>
          </Form.Select>
        </div>
        <Link to="/users/addUser" className="col">
          <Button className="" variant="danger" isDisabled={false} size="md" value="New User" handleSmthg={() => console.log("chibakiya")} />
        </Link>
      </div>
      <DataTable
        columns={col}
        data={filteredData}
        fixedHeader
        pagination
        progressPending={pending}
        progressComponent={<Ellipsis size={64} color='#D60A0B' sizeUnit='px' />}
      />
    </div>
  );
}
