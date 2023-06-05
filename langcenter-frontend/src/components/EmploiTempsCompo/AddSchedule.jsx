import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import axios from 'axios';

export default function AddSchedule() {
  const [selectedCoursId, setSelectedCoursId] = useState(0);
  const [coursData, setCourseData] = useState([]);
  const [classroomsData, setClassroomsData] = useState([]);
  const [groupesData, setGroupesData] = useState([]);
  const {user,setNotification, setVariant } = UseStateContext();
  const navigate = useNavigate();
   let x = ""
        if (user && user.role==='admin')
        {
            x = ""
        } else if (user && user.role==='director')
        {
            x="/director"
        }
        else{
            x="/secretary"
        }

  const formik = useFormik({
    initialValues: {
      course: '',
      group: '',
      day: [],
      startTime: '',
      finishTime: '',
      classroom: '',
    },
    validationSchema: Yup.object({
      course: Yup.string().required('Course is required'),
      group: Yup.string().required('Group is required'),
      day: Yup.array().of(Yup.string()).min(1, 'Select at least one day').required('Day is required'),
      startTime: Yup.string().required('Start time is required'),
      finishTime: Yup.string().required('Finish time is required'),
      classroom: Yup.string().required('Classroom is required'),
    }),
    
    
    onSubmit: (values) => {
      // Handle form submission and add schedule
      const sendData = {
        course_id: values.course,
        class_id: values.group,
        classroom_id: values.classroom,
        startTime: values.startTime,
        FinishTime: values.finishTime,
        days: values.day,
      };
      console.log(sendData.days);
    
      axios.post('http://127.0.0.1:8000/api/timeTable', sendData)
        .then((res) => {
          console.log(res.data);
          setNotification('Timetable added successfully');
          setVariant('success');
          setTimeout(() => {
            setNotification('');
          }, 3000);
          navigate(`/schedule`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            // Handle specific error status code (422)
            console.log(error.response.data); // Log the error response data
            // Display an error message to the user
            setNotification('Error: Invalid data');
            setVariant('danger');
            setTimeout(() => {
              setNotification('');
            }, 3000);
          } else {
            // Handle other errors
            console.error(error);
            // Display a generic error message to the user
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
    axios.get('http://127.0.0.1:8000/api/cours').then((res) => {

      setCourseData(res.data);
    });

  }, []);

  useEffect(() => {
    // Fetch classes data based on selected cours_id
    if (selectedCoursId) {
      axios.get(`http://127.0.0.1:8000/api/classes?cours_id=${selectedCoursId}`)
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
    axios.get('http://127.0.0.1:8000/api/classroom').then((res) => {


      setClassroomsData(res.data);
    });

  }, []);

  const handleCoursChange = (e) => {
    const courseId = e.target.value;
    setSelectedCoursId(courseId);
  };

  useEffect(() => {
    console.log(selectedCoursId);
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
      </Row>

      <Row>
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
        <Col md={4} className='mb-3'>
          <Form.Group controlId='startTime'>
            <Form.Label>Start Time*</Form.Label>
            <Form.Control
              type='time'
              className={`form-control ${formik.errors.startTime && formik.touched.startTime ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('startTime')}
            />
            {formik.touched.startTime && formik.errors.startTime && (
              <Form.Control.Feedback type='invalid'>{formik.errors.startTime}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>

        <Col md={4} className='mb-3'>
          <Form.Group controlId='finishTime'>
            <Form.Label>Finish Time*</Form.Label>
            <Form.Control
              type='time'
              className={`form-control ${formik.errors.finishTime && formik.touched.finishTime ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('finishTime')}
            />
            {formik.touched.finishTime && formik.errors.finishTime && (
              <Form.Control.Feedback type='invalid'>{formik.errors.finishTime}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId='day'>
        <Form.Label>Day*</Form.Label>
        <div>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <Form.Check
              key={day}
              inline
              label={day}
              type='checkbox'
              id={day}
              value={day}
              checked={formik.values.day.includes(day)}
              onChange={handleDayChange}
            />
          ))}
        </div>
        {formik.touched.day && formik.errors.day && (
          <div className='invalid-feedback'>{formik.errors.day}</div>
        )}
      </Form.Group>

      <Button type='submit' variant='primary'>
        Add Schedule
      </Button>
    </Form>
  );
}
