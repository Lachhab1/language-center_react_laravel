import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UseStateContext } from "../../context/ContextProvider";
import axios from "../../api/axios";


export default function SallesTable() {
const {user,setNotification, setVariant } = UseStateContext();
const navigate = useNavigate();

  let x = "";
  if (user && user.role === "admin") {
    x = "";
  } else if (user && user.role === "director") {
    x = "/director";
  } else {
    x = "/secretary";
  }

  const [nameFilter, setNameFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/classroom");
      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    return nameMatch;
  });

 
const deleteRow = async (id) => {
      try {
        await axios.delete(`/api/classroom/${id}`);
        setNotification("Classroom deleted successfully");
        setVariant("danger");
        setTimeout(() => {
          setNotification("");
        }, 3000);
        
        // Remove the deleted row from the data array
        setData((prevData) => prevData.filter((row) => row.id !== id));
      } catch (error) {
        console.error(error);
      }
    };
  const columns = [
    { name: "id", selector: (row) => row.id, sortable: true },
    { name: "name", selector: (row) => row.name, sortable: true },
    { name: "capacity", selector: (row) => row.capacity, sortable: true },
    {
      name: "actions",
      cell: (row) => (
        <div>
          <Link to={`${x}/classroom/details/${row.id}`}>
            <button style={{ border: "none", background: "none" }} title="details">
              <FaEye style={{ color: "lightBlue", fontSize: "16px" }} />
            </button>
          </Link>

          <Link to={`${x}/classroom/edit/${row.id}`}>
            <button style={{ border: "none", background: "none" }} title="edit">
              <BsFillPencilFill style={{ color: "orange", fontSize: "15px" }} />
            </button>
          </Link>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => deleteRow(row.id)}
            title="delete"
          >
            <MdDelete style={{ color: "red", fontSize: "18px" }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-around">
        <input
          type="text"
          placeholder="search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={{ backgroundColor: "rgba(221, 222, 238, 0.5)", border: "none", borderRadius: "8px" }}
        />
        <Link to={`${x}/classroom/add/`}>
          <button className="btn btn-danger">Add Classroom</button>
        </Link>
      </div>
      <DataTable columns={columns} data={filteredData} fixedHeader pagination noDataComponent="No data found" />
    </div>
  );
}
