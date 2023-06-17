import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';
import { Ellipsis } from 'react-awesome-spinners';
import { SketchPicker } from 'react-color';

const AddGroup = () => {
  const [selectedColor, setSelectedColor] = useState('#265985');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [coursData, setCourseData] = useState([]);
  const { user, setNotification, setVariant } = UseStateContext();
  const [teacherData, setTeacherDate] = useState([]);
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

  const validationSchema = Yup.object({
    groupName: Yup.string().required('Group name is required'),
    course: Yup.string().required('Course is required'),
    level: Yup.string().required('Level is required'),
    school_year: Yup.string().required('School year is required'),
    start_date: Yup.string().required('Start date is required'),
    end_date: Yup.string().required('End date is required'),
    description: Yup.string(),
    capacity: Yup.number().required('Capacity is required'),
  });
  const initialValues = {
    groupName: '',
    course: '',
    level: '',
    school_year: '',
    start_date: '',
    end_date: '',
    description: '',
    capacity: '',

  };

  const handleSubmit = (values) => {
    // Handle form submission and add group
    const sendData = {
      name: values.groupName,
      cours_id: values.course,
      school_year: values.school_year,
      start_date: values.start_date,
      end_date: values.end_date,
      description: values.description,
      capacity: values.capacity,
      level: values.level,
      teacher_id: values.teacher,
      event_color: selectedColor,
    };
    axios.post('/api/classes', sendData).then((res) => {
      console.log(res.data);
      setNotification('CLass added successfully');
      setVariant('success');
      setTimeout(() => {
        setNotification('');
      }, 3000);
      navigate(`${x}/class`);
    });

  };

  // Fetch available courses and levels from the database
  // Replace this with your actual API call to fetch data
  const availableCourses = [];
  useEffect(() => {
    axios.get('/api/cours').then((res) => {
      // console.log(res.data);
      setCourseData(res.data);
    });

  }, []);

  const availableLevels = [
    { id: '1', name: 'A2' },
    { id: '2', name: 'A1' },
    { id: '3', name: 'B2' },
    { id: '4', name: 'B1' },
    { id: '5', name: 'C2' },
    { id: '6', name: 'C1' },
    // Add more levels as needed
  ];
  //get data from api
  useEffect(() => {
    axios.get('/api/teachers').then((res) => {
      // console.log(res.data);
      setTeacherDate(
        res.data.data.map((teacher) => {
          return {
            id: teacher.id,
            name: teacher.first_name + ' ' + teacher.last_name,
          };
        })
      );
    });
  }, []);


  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
  };

  const handleLevelChange = (e) => {
    const levelId = e.target.value;
    setSelectedLevel(levelId);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit} className="addGroup">
          <h1>Add Class</h1>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="groupName">Class Name*</Form.Label>
              <Form.Control
                id="groupName"
                type="text"
                {...formik.getFieldProps('groupName')}
                isInvalid={formik.touched.groupName && formik.errors.groupName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.groupName}
              </Form.Control.Feedback>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label htmlFor="course">Course*</Form.Label>
              <Form.Select
                id="course"
                {...formik.getFieldProps('course')}
                value={selectedCourse}
                onChange={(e) => {
                  handleCourseChange(e);
                  formik.handleChange(e);
                }}
                isInvalid={formik.touched.course && formik.errors.course}
              >
                <option value="">Select course</option>
                {coursData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.course}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="level">Level*</Form.Label>
              <Form.Select
                id="level"
                {...formik.getFieldProps('level')}
                value={selectedLevel}
                onChange={(e
                ) => {
                  handleLevelChange(e);
                  formik.handleChange(e);
                }}
                isInvalid={formik.touched.level && formik.errors.level}
                disabled={!selectedCourse}
              >
                <option value="">Select level</option>
                {availableLevels.map((level) => (
                  <option key={level.id} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.level}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="school_year">School Year*</Form.Label>
              <Form.Control

                id="school_year"
                type="text"
                {...formik.getFieldProps('school_year')}
                isInvalid={
                  formik.touched.school_year && formik.errors.school_year
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.school_year}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="start_date">Start Date*</Form.Label>
              <Form.Control

                id="start_date"
                type="date"
                {...formik.getFieldProps('start_date')}
                isInvalid={
                  formik.touched.start_date && formik.errors.start_date
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.start_date}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="end_date">End Date*</Form.Label>
              <Form.Control
                id="end_date"
                type="date"
                {...formik.getFieldProps('end_date')}
                isInvalid={formik.touched.end_date && formik.errors.end_date}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.end_date}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control

                id="description"
                type="text"
                {...formik.getFieldProps('description')}
                isInvalid={
                  formik.touched.description && formik.errors.description
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="capacity">Capacity*</Form.Label>
              <Form.Control
                id="capacity"
                type="number"
                {...formik.getFieldProps('capacity')}
                isInvalid={
                  formik.touched.capacity && formik.errors.capacity
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.capacity}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="teacher">Teacher*</Form.Label>
              <Form.Select

                id="teacher"
                {...formik.getFieldProps('teacher')}
                isInvalid={
                  formik.touched.teacher && formik.errors.teacher
                }
              >
                <option value="">Select teacher</option>
                {teacherData.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {formik.errors.teacher}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <div className='d-flex flex-column align-items-center'>

            <div style={{ backgroundColor: selectedColor, width: '200px', height: '80px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h5 style={{ color: 'white', height: '20px' }}>TITLE (MORE INFOS)</h5>
            </div>

            <div>
              <SketchPicker color={selectedColor} onChange={(color) => setSelectedColor(color.hex)} />
            </div>
          </div>

          <Button type="submit" variant="primary">
            Add Class
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddGroup;
