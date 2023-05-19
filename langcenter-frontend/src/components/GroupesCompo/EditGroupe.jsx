import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const EditGroup = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const { id } = useParams();

  const validationSchema = Yup.object({
    groupName: Yup.string().required('Group name is required'),
    course: Yup.string().required('Course is required'),
    level: Yup.string().required('Level is required'),
  });

  const initialValues = {
    groupName: '',
    course: '',
    level: '',
  };

  const handleSubmit = (values) => {
    // Handle form submission and update group
    console.log(values);
  };

  // Fetch group data based on groupId and populate form fields
  useEffect(() => {
    // Replace this with your actual API call to fetch group data
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/groups/${id}`);
        const data = await response.json();

        formik.setFieldValue('groupName', data.groupName);
        formik.setFieldValue('course', data.course);
        formik.setFieldValue('level', data.level);
        setSelectedCourse(data.course);
        setSelectedLevel(data.level);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [id]);

  // Fetch available courses and levels from the database
  // Replace this with your actual API calls to fetch data
  const availableCourses = [
    { id: '1', name: 'Course A' },
    { id: '2', name: 'Course B' },
    { id: '3', name: 'Course C' },
    // Add more courses as needed
  ];

  const availableLevels = [
    { id: '1', name: 'Level 1' },
    { id: '2', name: 'Level 2' },
    { id: '3', name: 'Level 3' },
    // Add more levels as needed
  ];

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
        <Form onSubmit={formik.handleSubmit} className="editGroup">
          <h1>Edit Group {id}</h1>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="groupName">Group Name*</Form.Label>
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
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.course}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="level">Level*</Form.Label>
              <Form.Select
                id="level"
                {...formik.getFieldProps('level')}
                value={selectedLevel}
                onChange={(e) => {
                  handleLevelChange(e);
                  formik.handleChange(e);
                }}
                isInvalid={formik.touched.level && formik.errors.level}
                disabled={!selectedCourse}
              >
                <option value="">Select level</option>
                {availableLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.level}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Update Group
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditGroup;
