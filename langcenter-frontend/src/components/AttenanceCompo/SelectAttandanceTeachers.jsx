import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, isEmptyArray } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import DataTable from 'react-data-table-component';
import { UseStateContext } from '../../context/ContextProvider';

export default function SelectAttendanceGrp() {
  const presenceSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
  });

 

  const initialValues = {
    date: '',
  };


  const [selectedDate, SetSelectedDate] = useState();

  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const {user,setNotification, setVariant } = UseStateContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);


  const closeModal = () => setIsModalOpen(false);

   function fillData(valueRes){
    setTableData([]) //make sure it's empty 
    console.log("3yto liya fill : ",valueRes)
      valueRes.data.data.map((datar) => {
        setTableData((prev)=>
        (
            [...prev,
                {
                id:datar.teacher.id,
                fullName:datar.teacher.last_name+" "+datar.teacher.first_name,
                absent: datar.isAbsent,
                reason:datar.reason,
                }
              ])
        )
            })
  }

  const handleSubmit = async (values) => {
  
    try {
      //essayon modfier
      //etape 1 get 
      console.log(`submit data /api/teachersAttendance/${values.date}`);
      const response = await axios.get(`/api/teachersAttendance/${values.date}`);
      
      
      
      //etape 1 put
      fillData(response)
      console.log("modifier : ",tableData)
      
      
      if(!response.data.data.length ){
        //sinon  donc etape 1 ajouter 
        console.log(" khawi = add ")
        await axios.post(`/api/teachersAttendance/${values.date}`, {
          date: values.date,
        });
         //etape 2 get
        console.log(`submit data /api/teachersAttendance/${values.date}`);
        const response = await axios.get(`/api/teachersAttendance/${values.date}`);
        fillData(response)
        
      }
      // Process the response data here
    } catch (error) {
      console.error(error);
    }
    setShowTable(true);
  };
  


    
  
  

  const handleViewPresence = async() => {
    

    const response = await axios.get(`/api/teachersAttendance/${selectedDate}`);
    fillData(response)
    console.log('handleview response :  ' ,response)
      
      
    //etape 1 put

    setIsModalOpen(true);

  };

  const handleDataChange = (rowIndex, fieldName, value) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][fieldName] = value;
      return newData;
    });
  };

  const columns = [
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'Full Name', selector: 'fullName', sortable: true },
    {
      name: 'Absent',
      selector: 'absent',
      cell: (row, rowIndex) => (
        <input
          type="checkbox"
          checked={row.absent}
          onChange={(e) => handleDataChange(rowIndex, 'absent', e.target.checked)}
        />
      ),
      sortable: true,
    },
    {
      name: 'Reason',
      selector: 'reason',
      cell: (row, rowIndex) => (
        <input
          type="text"
          value={row.reason}
          onChange={(e) => handleDataChange(rowIndex, 'reason', e.target.value)}
        />
      ),
      sortable: true,
    },
  ];

   const  handleSave = (values) => { 
    console.log("wa7ed salam")
    
      values.map((e)=>{(
        e.absent ? e.absent=1 : e.absent= 0
      )})

      console.log("updating values ", values,'  date',selectedDate)
    axios.put(`/api/teachersAttendance/${selectedDate}`, values ).then((res) => {
      console.log(res.data);
      setNotification('attendance updated successfully');
      setVariant('success');
      setTimeout(() => {
        setNotification('');
        setVariant('');
      }, 3000);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      setNotification('An error occurred');
      setVariant('danger');
      setTimeout(() => {
        setNotification('');
        setVariant('');
      }, 3000);
    });
    
  };

  

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={presenceSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="date" className="form-label">
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  onChange={(e) => {
                    SetSelectedDate(e.target.value);
                    values.date = e.target.value;
                  }}
                  className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''
                    }`}
                  
                />
                {touched.date && errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>
             
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={Object.keys(errors).length !== 0}
            >
              Add/Modify
            </button>
            <button
              type="button"
              className={`btn btn-secondary mx-2 `}
              onClick={handleViewPresence}
              disabled={!values.date  }
            >
              View Attendance
            </button>
          </Form>
        )}
      </Formik>

      {showTable && (
        <div className="my-4">
          <DataTable columns={columns} data={tableData} pagination />
          <button onClick={()=>handleSave(tableData)} className="btn btn-success mt-2">
            Submit
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal modal-lg" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Report</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <DataTable
                  columns={[
                    { name: 'ID', selector: 'id', sortable: true },
                    { name: 'Full Name', selector: 'fullName', sortable: true },
                    {
                      name: 'Absent',
                      selector: 'absent',
                      cell: (row) => (row.absent ? 'Absent' : 'Present'),
                      sortable: true,
                    },
                    {
                      name: 'Reason',
                      selector: 'reason',
                      cell: (row, rowIndex) => (
                        <input
                          type="text"
                          value={row.reason}
                          onChange={(e) =>
                            handleDataChange(rowIndex, 'reason', e.target.value)
                          }
                          readOnly
                        />
                      ),
                      sortable: true,
                    },
                  ]}
                  data={tableData}
                  pagination
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
