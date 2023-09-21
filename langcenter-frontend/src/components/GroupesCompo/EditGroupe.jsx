import React, { useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';
import { SketchPicker } from 'react-color';


const EditGroup = () => {
  const [selectedColor, setSelectedColor] = useState('#265985');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [teacherData, setTeacherData] = useState([]);
  const [coursData, setCourseData] = useState([]);
  const { user, setNotification, setVariant } = UseStateContext();
  const navigate = useNavigate();
  const [dataValues, setDataValues] = useState({});
  const { id } = useParams();
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
      groupName: '',
      course: '',
      level: '',
      school_year: '',
      start_date: '',
      end_date: '',
      description: '',
    },
    validationSchema: Yup.object({
      groupName: Yup.string().required('Group name is required'),
      course: Yup.string().required('Course is required'),
      level: Yup.string().required('Level is required'),
      school_year: Yup.string().required('School year is required'),
      start_date: Yup.string().required('Start date is required'),
      end_date: Yup.string().required('End date is required'),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    axios.get(`/api/classes/${id}`).then((res) => {
     
      formik.setValues({
        groupName: res.data.data.name,
        course: res.data.data.cours.id,
        level: res.data.data.level,
        school_year: res.data.data.school_year,
        start_date: res.data.data.start_date,
        end_date: res.data.data.end_date,
        description: res.data.data.description,
        teacher: res.data.data.teacher.id,
      });
    });
  }, []);




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
    axios.put(`/api/classes/${id}`, sendData).then((res) => {
   
      setNotification('CLass updtated successfully');
      setVariant('warning');
      setTimeout(() => {
        setNotification('');
        setVariant('success');
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
  // Add more levels as needed

  //get data from api
  useEffect(() => {
    axios.get('/api/teachers').then((res) => {
      // console.log(res.data);
      setTeacherData(
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
    <Form onSubmit={formik.handleSubmit} className="addGroup">
      <h1>Edit Class</h1>

      <Row>
        <Col md={6} className="mb-3">
          <Form.Label htmlFor="groupName">Class Name<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            id="groupName"
            type="text"
            {...formik.getFieldProps('groupName')}
            isInvalid={formik.touched.groupName && formik.errors.groupName}
            disabled
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.groupName}
          </Form.Control.Feedback>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Label htmlFor="course">Course<span className='text-danger'>*</span></Form.Label>
          <Form.Select
            id="course"
            {...formik.getFieldProps('course')}
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
          <Form.Label htmlFor="level">Level<span className='text-danger'>*</span></Form.Label>
          <Form.Select
            id="level"
            {...formik.getFieldProps('level')}
            onChange={(e
            ) => {
              handleLevelChange(e);
              formik.handleChange(e);
            }}
            isInvalid={formik.touched.level && formik.errors.level}
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
          <Form.Label htmlFor="school_year">School Year<span className='text-danger'>*</span></Form.Label>
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
          <Form.Label htmlFor="start_date">Start Date<span className='text-danger'>*</span></Form.Label>
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
          <Form.Label htmlFor="end_date">End Date<span className='text-danger'>*</span></Form.Label>
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
          <Form.Label htmlFor="teacher">Teacher<span className='text-danger'>*</span></Form.Label>
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
        Edit Class
      </Button>
    </Form>
  );
};

export default EditGroup;
