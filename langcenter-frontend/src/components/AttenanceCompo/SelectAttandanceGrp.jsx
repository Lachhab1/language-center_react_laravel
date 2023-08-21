import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { UseStateContext } from "../../context/ContextProvider";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import absentIcon from '../../images/icons/absent.png';
import presentIcon from '../../images/icons/present.png';
import lateIcon from "../../images/icons/late.png";
import CustomGroupRenderer from './CustomGroupRenderer';


import { ModuleRegistry } from '@ag-grid-community/core';
//import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

//ModuleRegistry.registerModules([RowGroupingModule]);







export default function SelectAttendanceGrp() {
  const presenceSchema = Yup.object().shape({


  });

  const initialValues = {
    course: '',
    group: '',

  };
  const { setNotification, setVariant } = UseStateContext();
  const [selectedCoursId, setSelectedCoursId] = useState('');
  const [grpId, setGroupe] = useState('');
  const [groupesData, setGroupesData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [coursData, setCourseData] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);



  function fillData(valueRes) {
    console.log("valueRes (fillData parameter) ", valueRes)
    const studentMap = new Map();
    const teacherMap = new Map();


    valueRes.studentsData.data.result1.forEach((datar) => {
      const studentId = datar.etudiant.id;
      const fullName = datar.etudiant.nom + ' ' + datar.etudiant.prenom;
      const date = datar.date;
      const attendanceStatus = datar.isAbsent;
      const role = "student";

      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, {
          role: role,
          id: studentId,
          fullName: fullName,
          attendanceData: [],
        });
      }

      const studentData = studentMap.get(studentId);
      studentData.attendanceData.push({ date, attendanceStatus });

      console.log("studentmap ", studentMap.values())
    });

    valueRes.teachersData.data.data.forEach((datar) => {
      const teacherId = datar.teacher.id;
      const fullName = datar.teacher.last_name + ' ' + datar.teacher.first_name;
      const date = datar.date;
      const attendanceStatus = datar.isAbsent;
      const role = "teacher";

      if (!teacherMap.has(teacherId)) {
        teacherMap.set(teacherId, {
          role: role,
          id: teacherId,
          fullName: fullName,
          attendanceData: [],
        });
      }

      const teacherData = teacherMap.get(teacherId);
      teacherData.attendanceData.push({ date, attendanceStatus });
    });

    const updatedTableData = Array.from(teacherMap.values()).concat(Array.from(studentMap.values()));
    setTableData(updatedTableData);

  }

  const handleSubmit = async () => {

    try {
      const studentResponse = await axios.get(`/api/studentsAttendance/${grpId}`);
      const teacherResponse = await axios.get(`/api/teachersAttendance/${grpId}`);


      setDatesData(studentResponse.data.result2);
      setStudentsData(studentResponse);
      setTeachersData(teacherResponse);

      const bothData = {
        studentsData: studentResponse,
        teachersData: teacherResponse,
      };

      fillData(bothData);

      setShowTable(true);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    axios.get('/api/cours').then((res) => {
      setCourseData(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCoursId) {
      axios
        .get(`/api/classes?cours_id=${selectedCoursId}`)
        .then((res) => {
          setGroupesData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setGroupesData([]);
    }
  }, [selectedCoursId]);

  const handleStatusChange = (row, field, status) => {
    const date = field.substring(4);
    const newData = tableData.map((data) => {
      if (data.id === row.id) {
        const attendanceData = [...data.attendanceData];
        const attendanceIndex = attendanceData.findIndex(
          (item) => item.date === date
        );
        if (attendanceIndex !== -1) {
          attendanceData[attendanceIndex].attendanceStatus = status;
        } else {
          attendanceData.push({ date, attendanceStatus: status });
        }
        return { ...data, attendanceData };
      }
      return data;
    });
    setTableData(newData);
  };

  const dynamicColumns = [];
  let currentMonthYear = '';

  const monthYearFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  });



  datesData.forEach(date => {
    const monthYear = monthYearFormatter.format(new Date(date));
    const day = new Date(date).getDate();

    if (monthYear !== currentMonthYear) {
      dynamicColumns.push({
        headerName: monthYear,
        children: [],

      });
      currentMonthYear = monthYear;
    }

    dynamicColumns[dynamicColumns.length - 1].children.push({
      headerName: day.toString(),
      field: `col_${date}`,
      colId: date,
      width: 60,
      cellRenderer: (params) => {

        const { field } = params.colDef;
        const date = field.substring(4);
        const attendanceDataItem = params.data.attendanceData.find(
          (item) => item.date == date
        );

        return (
          <select
            value={attendanceDataItem?.attendanceStatus || 0}
            onChange={(e) =>
              handleStatusChange(params.data, field, parseInt(e.target.value))
            }
            style={{

              appearance: "none",
              border: "none",
              padding: "0px 5px ",

            }}

          >
            <option value={0}>--</option>
            <option value={1} alt="absent">❌</option>
            <option value={2} alt="present" >✅</option>
            <option value={3} alt="late">⚠️</option>
          </select>
        );
      },
    });
  });

  const columns = [
    {
      headerName: 'Role',
      field: 'role',
      width: 85,
      pinned: 'left',
      cellStyle: (params) => {
        if (params.value === 'teacher') {
          // changer background color role  'teacher'
          return { backgroundColor: '#FFCCCC' };
        }
        // return an empty object for other cells
        return {};
      },


    },
    { headerName: 'ID', field: 'id', sortable: true, width: 75, pinned: 'left' },

    { headerName: 'Full Name', field: 'fullName', sortable: true, minWidth: 150, pinned: 'left' },
    ...dynamicColumns,
  ];



  const handleCoursChange = (e) => {
    const courseId = e.target.value;
    setSelectedCoursId(courseId);
  };


  const refresh = async () => {
    if (datesData.length > 0) {

      const refreshStudents = axios.post(`/api/studentsAttendance/${grpId}`, {
        dates: datesData,
        group: groupesData[0].id,
      })

      const refreshTeachers = axios.post(`/api/teachersAttendance/${grpId}`, {
        dates: datesData,
        group: groupesData[0].id,
      })
      try {
        await Promise.all([refreshStudents], [refreshTeachers]);

        setNotification("Attendance refreshed successfully");
        setVariant("warning");
        setTimeout(() => {
          setNotification("");
          setVariant("");
        }, 3000);
      } catch (error) {
        console.error(error); // Log the error for debugging
        if (error.response && error.response.status === 422) {
          formik.setErrors(error.response.data.errors);
        }
      }

      handleSubmit();

    };
    console.log('table data ', tableData)
  }

    const saveFunc = async () => {
      console.log("save ", tableData);
      const studentAttendancePromise = axios.put("/api/studentsAttendance", tableData);
      const teacherAttendancePromise = axios.put("/api/teachersAttendance", tableData);

      try {
        await Promise.all([studentAttendancePromise, teacherAttendancePromise]);

        setNotification("Attendance updated successfully");
        setVariant("success");
        setTimeout(() => {
          setNotification("");
          setVariant("");
        }, 3000);
      } catch (error) {
        console.error(error); // Log the error for debugging
        if (error.response && error.response.status === 422) {
          formik.setErrors(error.response.data.errors);
        }
      }
    }





    return (
      <div style={{ width: '100%', height: '100%' }}>


        <Formik
          initialValues={initialValues}
          validationSchema={presenceSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="course" className="form-label">
                    Course:
                  </label>
                  <Field
                    as="select"
                    id="course"
                    name="course"
                    value={selectedCoursId}
                    className={`form-select ${touched.course && errors.course ? 'is-invalid' : ''}`}
                    onChange={handleCoursChange}
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
                    value={grpId}
                    className={`form-select ${touched.group && errors.group ? 'is-invalid' : ''}`}
                    onChange={(e) => {
                      setGroupe(e.target.value);
                    }}
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
                <div className="col">
                  <div>
                    <br />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mx-2 mt-2"

                    disabled={errors.group !== undefined}
                  >
                    Add/Modify
                  </button>




                </div>
              </div>
            </Form>
          )}
        </Formik>



        {showTable && (
          <>
            <div className='d-flex '>

              <button
                type="button"
                className="btn btn-warning mx-2 mb-2"
                onClick={refresh}

              >
                ↻ Refresh
              </button>

              <p style={{ color: "gray", marginTop: "5px" }}>Used to add the new students or teacher to the attendance list</p>

            </div>
            <div className="ag-theme-alpine" style={{ maxHeight: '600px', width: '100%', marginBottom: "15px" }}>
              <AgGridReact
                rowData={tableData}
                columnDefs={columns}
                suppressAggFuncInHeader={true}
                rowHeight={40}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  filter: true,
                  minWidth: 75,
                }}
                options={{

                }}
                domLayout='autoHeight'
                onGridReady={(params) => {
                  const api = params.api;
                  const gridData = [];

                  api.forEachNodeAfterFilterAndSort((node) => {
                    const rowData = node.data;
                    gridData.push(rowData);
                  });

                  console.log('Ag-Grid Table Data:', gridData);
                }}

              />

            </div>
            <div>
              <button className='btn btn-success' onClick={saveFunc}>
                save
              </button>
            </div>
          </>





          //2



        )}
      </div>
    );
  }
