import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, isEmptyArray } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import DataTable from 'react-data-table-component';
import { UseStateContext } from '../../context/ContextProvider';

export default function SelectAttendanceGrp() {
  const presenceSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    course: Yup.string().required('Course is required'),
    group: Yup.string().required('Group is required'),
  });
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

  const initialValues = {
    date: '',
    course: '',
    group: '',
  };

  const [selectedCoursId, setSelectedCoursId] = useState(0);
  const [selectedDate, SetSelectedDate] = useState();
  const [groupesData, setGroupesData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const {user,setNotification, setVariant } = UseStateContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [coursData, setCourseData] = useState([]);

  const closeModal = () => setIsModalOpen(false);

   function fillData(valueRes){
    setTableData([]) //make sure it's empty 
      valueRes.data.data.map((datar) => {
        setTableData((prev)=>
        (
            [...prev,
                {
                id:datar.etudiant.id,
                fullName:datar.etudiant.nom+" "+datar.etudiant.prenom,
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
      console.log(`submit data /api/studentsAttendance/${values.group}/${values.date}`);
      const response = await axios.get(`/api/studentsAttendance/${values.group}/${values.date}`);
      
      
      
      //etape 1 put
      fillData(response)
      console.log("modifier : ",tableData)
      
      
      if(!response.data.data.length ){
        //sinon  donc etape 1 ajouter 
        console.log(" khawi = add ")
        await axios.post(`/api/studentsAttendance/${values.group}/${values.date}`, {
          group: values.group,
          date: values.date,
        });
         //etape 2 get
        console.log(`submit data /api/studentsAttendance/${values.group}/${values.date}`);
        const response = await axios.get(`/api/studentsAttendance/${values.group}/${values.date}`);
        fillData(response)
        
      }
      // Process the response data here
    } catch (error) {
      console.error(error);
    }
    setShowTable(true);
  };
  

  useEffect(() => {
    axios.get('/api/cours').then((res) => {

      setCourseData(res.data);
    });

  }, []);


  useEffect(() => {
    if (selectedCoursId) {
      axios.get(`/api/classes?cours_id=${selectedCoursId}`)
        .then((res) => {
          setGroupesData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // If no cours_id is selected, clear the classes data
      setGroupesData([]);
    }
  }, [selectedCoursId]);

    
  
  

  const handleViewPresence = async() => {
    

const grp = document.getElementById("group").value

    const response = await axios.get(`/api/studentsAttendance/${grp}/${selectedDate}`);
    fillData(response)
    console.log('red ' ,response)
      
      
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
          className="form-check-input"
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
          className="form-control"
        />
      ),
      sortable: true,
    },
  ];

   const  handleSave = (values) => { 
      values.map((e)=>{(
        e.absent ? e.absent=1 : e.absent= 0
      )})

      console.log("updating values ", values,'  date',selectedDate)
    axios.put(`/api/studentsAttendance/${values.group}/${selectedDate}`, values ).then((res) => {
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

  const handleCoursChange = (e) => {
    const courseId = e.target.value;

    setSelectedCoursId(courseId);
  };

  useEffect(() => {
   
  }, [selectedCoursId]);

 {/*
 const handleGroupeChange = (e) => {
   const groupId = e.target.value;
   console.log("grpId",e.target.value)
   setSelectedGroupeId(groupId);
  };
  useEffect(() => {
    
    
  }, [selectedGroupeId]);
*/}

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
              <div className="col">
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
              <div className="col">
                <label htmlFor="course" className="form-label">
                  Course:
                </label>
                <Field
                  as="select"
                  id="course"
                  name="course"
                  value={selectedCoursId}
                  className={`form-select ${touched.course && errors.course ? 'is-invalid' : ''
                    }`}  
                  onChange={(e)=>{(handleCoursChange(e), values.course=selectedCoursId)}}
                >
                  <option value="">Select a course</option>
                  {coursData.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                  
                </Field>
                {touched.course && errors.course && (

                  <div className="invalid-feedback">{errors.course}</div>
                )}
              </div>
              <div className="col">
                <label htmlFor="group" className="form-label">
                  Group:
                </label>
                <Field
                  as="select"
                  id="group"
                  name="group"
                  className={`form-select ${touched.group && errors.group ? 'is-invalid' : ''
                    }`}
                  
                >
                  <option value="">Select a group</option>

                  {groupesData.map((groupe) => (
                    <option key={groupe.id} value={groupe.id}>
                      {groupe.name}
                    </option>
                  ))}
                </Field>
                {touched.group && errors.group && (
                  <div className="invalid-feedback">{errors.group}</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mx-2"
              disabled={Object.keys(errors).length !== 0}
            >
              Add/Modify
            </button>
            <button
              type="button"
              className={`btn btn-secondary mx-2`}
              onClick={handleViewPresence}
              disabled={!values.date  || !values.group}
            >
              View Attendance
            </button>
          </Form>
        )}
      </Formik>

      {showTable && (
        <div className="my-4">
          <DataTable columns={columns} data={tableData} pagination customStyles={tableCustomStyles} />
          <button onClick={()=>handleSave(tableData)} className="btn btn-dark text-light mt-2">
            Save
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal modal-xl" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Report</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <DataTable
                  customStyles={tableCustomStyles}
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
                          className="form-control"
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
