import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AddSchedule() {
  const formik = useFormik({
    initialValues: {
      course: '',
      level: '',
      group: '',
      day: [],
      startTime: '',
      finishTime: '',
      classroom: '',
    },
    validationSchema: Yup.object({
      course: Yup.string().required('Course is required'),
      level: Yup.string().required('Level is required'),
      group: Yup.string().required('Group is required'),
      day: Yup.array().of(Yup.string()).min(1, 'Select at least one day').required('Day is required'),
      startTime: Yup.string().required('Start time is required'),
      finishTime: Yup.string().required('Finish time is required'),
      classroom: Yup.string().required('Classroom is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission and add schedule
      console.log(values);
    },
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

  return (
    <Form onSubmit={formik.handleSubmit} className='addSchedule'>
      <h1>Add Schedule</h1>

      <Row>
        <Col md={4} className='mb-3'>
          <Form.Group controlId='course'>
            <Form.Label>Course*</Form.Label>
            <Form.Select
              className={`form-select ${formik.errors.course && formik.touched.course ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('course')}
            >
              <option value=''>Select a course</option>
              {/* Add options for all courses */}
            </Form.Select>
            {formik.touched.course && formik.errors.course && (
              <Form.Control.Feedback type='invalid'>{formik.errors.course}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>

        <Col md={4} className='mb-3'>
          <Form.Group controlId='level'>
            <Form.Label>Level*</Form.Label>
            <Form.Select
              className={`form-select ${formik.errors.level && formik.touched.level ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('level')}
            >
              <option value=''>Select a level</option>
              {/* Add options for levels based on selected course */}
            </Form.Select>
            {formik.touched.level && formik.errors.level && (
              <Form.Control.Feedback type='invalid'>{formik.errors.level}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>

        <Col md={4} className='mb-3'>
          <Form.Group controlId='group'>
            <Form.Label>Group*</Form.Label>
            <Form.Select
              className={`form-select ${formik.errors.group && formik.touched.group ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('group')}
            >
              <option value=''>Select a group</option>
              {/* Add options for groups based on selected level */}
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
