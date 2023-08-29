import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';

export default function AddSchedule() {
  const [selectedCoursId, setSelectedCoursId] = useState(0);
  const [coursData, setCourseData] = useState([]);
  const [classroomsData, setClassroomsData] = useState([]);
  const [groupesData, setGroupesData] = useState([]);
  const [allDatesData, setAllDaysData] = useState([]);
  const [days, setDays] = useState([]);
  const { user, setNotification, setVariant } = UseStateContext();
  const navigate = useNavigate();
  let x = ""
  if (user && user.role === 'admin') {
    x = ""
  } else if (user && user.role === 'director') {
    x = "/director"
  }
  else {
    x = "/secretary"
  }

  const formik = useFormik({
    initialValues: {
      course: '',
      group: '',
      startTime_Monday: '',
      finishTime_Monday: '',
      startTime_Tuesday: '',
      finishTime_Tuesday: '',
      startTime_Wednesday: '',
      finishTime_Wednesday: '',
      startTime_Thursday: '',
      finishTime_Thursday: '',
      startTime_Friday: '',
      finishTime_Friday: '',
      startTime_Saturday: '',
      finishTime_Saturday: '',
      startTime_Sunday: '',
      finishTime_Sunday: '',
      classroom: '',
    },
    validationSchema: Yup.object({
      course: Yup.string().required('Course is required'),
      group: Yup.string().required('Group is required'),
      startTime_Monday: Yup.string(),
      finishTime_Monday: Yup.string(),
      startTime_Tuesday: Yup.string(),
      finishTime_Tuesday: Yup.string(),
      startTime_Wednesday: Yup.string(),
      finishTime_Wednesday: Yup.string(),
      startTime_Thursday: Yup.string(),
      finishTime_Thursday: Yup.string(),
      startTime_Friday: Yup.string(),
      finishTime_Friday: Yup.string(),
      startTime_Saturday: Yup.string(),
      finishTime_Saturday: Yup.string(),
      startTime_Sunday: Yup.string(),
      finishTime_Sunday: Yup.string(),
      classroom: Yup.string().required('Classroom is required'),
    }),


    onSubmit: (values) => {
      const dayData = [
        { name: 'Monday', startTime: values.startTime_Monday, endTime: values.finishTime_Monday },
        { name: 'Tuesday', startTime: values.startTime_Tuesday, endTime: values.finishTime_Tuesday },
        { name: 'Wednesday', startTime: values.startTime_Wednesday, endTime: values.finishTime_Wednesday },
        { name: 'Thursday', startTime: values.startTime_Thursday, endTime: values.finishTime_Thursday },
        { name: 'Friday', startTime: values.startTime_Friday, endTime: values.finishTime_Friday },
        { name: 'Saturday', startTime: values.startTime_Saturday, endTime: values.finishTime_Saturday },
        { name: 'Sunday', startTime: values.startTime_Sunday, endTime: values.finishTime_Sunday }
      ];
    
      const getId = (value) => {
        switch (value) {
          case "Monday": return 1; break;
          case "Tuesday": return 2; break;
          case "Wednesday": return 3; break;
          case "Thursday": return 4; break;
          case "Friday": return 5; break;
          case "Saturday": return 6; break;
          case "Sunday": return 7; break;
        }
      }
    
      const test = dayData
        .filter((e) => e.startTime !== '' || e.endTime !== '')
        .map((e) => ({
          name: getId(e.name),
          startTime: e.startTime,
          FinishTime: e.endTime,
        }));
        
      const sendData = {
        course_id: values.course,
        class_id: values.group,
        classroom_id: values.classroom,
        days: test,
      };


      //test

      console.log("day data ",test) 
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
      function getDatesWithSpecificDays(desired_days) {
        let startDate = new Date();
        let endDate = new Date();
        groupesData?.map(
          (group) => {
            if (group.id == formik.values.group)
            {
              startDate = new Date(group.start_date);
              endDate = new Date(group.end_date);
            }
          }
        )
        console.log('function called');
      
        const dates = [];
      
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
          if (desired_days.includes(date.getDay())) {
            dates.push(formatDate(new Date(date)));
          }
        }
      
        return dates;
      }
      
      const days = test.map((e) => (e.name == 7 ? 0 : e.name));
      console.log("groupesData ", groupesData);
      
      const result = getDatesWithSpecificDays(days);
      console.log('res ', result);

      // in student attendace table 
      // axios.post(`/api/studentsAttendance/${groupesData[0].id}`, {
        axios.post(`/api/studentsAttendance/${formik.values?.group}`, {
        dates: result,
        group: formik.values.group,
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });


      // same thing but in teachers attendace table 
      // axios.post(`/api/teachersAttendance/${groupesData[0].id}`, {
        axios.post(`/api/teachersAttendance/${formik.values?.group}`, {
        dates: result,
        group: formik.values?.group,
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      // TEST END
    
      axios.post('/api/timeTable', sendData)
        .then((res) => {
         
          setNotification('Timetable added successfully');
          setVariant('success');
          setTimeout(() => {
            setNotification('');
            setVariant('');
          }, 3000);
          navigate(`${x}/schedule`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            console.log(error.response.data);
            setNotification('Error: Invalid data');
            setVariant('danger');
            setTimeout(() => {
              setNotification('');
            }, 3000);
          } else {
            console.error(error);
            setNotification('An error occurred');
            setVariant('danger');
            setTimeout(() => {
              setNotification('');
            }, 3000);
          }
        });
       
    }
    

  });

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    const isDaySelected = formik.values.day.includes(selectedDay);

    if (isDaySelected) {
      formik.setFieldValue(
        'day',
        formik.values.day.filter((day) => day !== selectedDay)
      );
    } else {
      formik.setFieldValue('day', [...formik.values.day, selectedDay]);
    }
  };
  useEffect(() => {
    axios.get('/api/cours').then((res) => {

      setCourseData(res.data);
    });

  }, []);

  useEffect(() => {
    // Fetch classes data based on selected cours_id
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

  useEffect(() => {
    axios.get('/api/classroom').then((res) => {
      setClassroomsData(
        res.data.data.map((classroom) => ({
          id: classroom.id,
          name: `${classroom.class_room}`,
        }))
      );
    });

  }, []);

  const handleCoursChange = (e) => {
    const courseId = e.target.value;
    setSelectedCoursId(courseId);
  };

  useEffect(() => {
   
  }, [selectedCoursId]);


  return (
    <Form onSubmit={formik.handleSubmit} className='addSchedule'>
      <h1>Add Schedule</h1>

      <Row>
        <Col md={4} className='mb-3'>
          <Form.Group controlId='course'>
            <Form.Label>Course*</Form.Label>
            <Form.Select
              className={`form-select ${formik.errors.course && formik.touched.course ? 'is-invalid' : ''}`}
              value={formik.values.course}
              onChange={(e) => {
                formik.handleChange(e);
                handleCoursChange(e);
              }}
            >
              <option value=''>Select a course</option>
              {/* Add options for all courses */}
              {coursData.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Form.Select>
            {formik.touched.course && formik.errors.course && (
              <div className='invalid-feedback'>{formik.errors.course}</div>
            )}
          </Form.Group>



        </Col>


        <Col md={4} className='mb-3'>
          <Form.Group controlId='group'>
            <Form.Label>Class*</Form.Label>
            <Form.Select
              className={`form-select ${formik.errors.group && formik.touched.group ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('group')}
            >
              <option value=''>Select a class</option>
              {/* Add options for groups based on selected level */}
              {groupesData.map((groupe) => (

                <option key={groupe.id} value={groupe.id}>
                  {groupe.name}
                </option>
              ))}
            </Form.Select>
            {formik.touched.group && formik.errors.group && (
              <Form.Control.Feedback type='invalid'>{formik.errors.group}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md={4} className='mb-3'>
          <Form.Group controlId='classroom'>
            <Form.Label>Classroom*</Form.Label>
            <Form.Select
              className={`form-select ${formik.errors.classroom && formik.touched.classroom ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('classroom')}
            >
              <option value=''>Select a classroom</option>
              {/* Add options for all classrooms */}
              {classroomsData.map((classroom) => (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.name}
                </option>
              ))}
            </Form.Select>
            {formik.touched.classroom && formik.errors.classroom && (
              <Form.Control.Feedback type='invalid'>{formik.errors.classroom}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <table>
        <thead>

          <tr>
            <th>Days</th><th>Start Time</th><th>Finish Time</th>
          </tr>
        </thead>
        <tbody>

          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (

            <tr key={day}>
              <td>{day} </td>
              <td><Form.Group controlId={`startTime_${day}`}>

                <Form.Control
                  type='time'
                  className={`form-control ${formik.errors[`startTime_${day}`] && formik.touched[`{startTime_${day}}`] ? 'is-invalid' : ''}`}
                  {...formik.getFieldProps(`startTime_${day}`)}

                />
                {formik.touched[`{startTime_${day}}`] && formik.errors[`{startTime_${day}}`] && (
                  <Form.Control.Feedback type='invalid'>{formik.errors.startTime}</Form.Control.Feedback>
                )}
              </Form.Group></td>
              <td><Form.Group controlId={`finishTime_${day}`}>

                <Form.Control
                  type='time'
                  className={`form-control ${formik.errors[`finishTime_${day}`] && formik.touched[`finishTime_${day}`] ? 'is-invalid' : ''}`}
                  {...formik.getFieldProps(`finishTime_${day}`)}
                />
                {formik.touched[`finishTime_${day}`] && formik.errors[`finishTime_${day}`] && (
                  <Form.Control.Feedback type='invalid'>{formik.errors.finishTime}</Form.Control.Feedback>
                )}
              </Form.Group>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
                 
      <Button type='submit' variant='primary'>
        Add Schedule
      </Button>
    </Form>
  );
}
