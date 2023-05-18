import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import AvatarEdit from '../ProfileCompo/AvatarEdit';

export default function AddTeacher() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      cin: '',
      birthday: '',
      gender: '',
      email: '',
      address: '',
      phone: '',
      isActive: false,
      diploma: '',
      hireDate: '',
      speciality: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      cin: Yup.string().required('CIN is required'),
      birthday: Yup.date().required('Birthday is required'),
      gender: Yup.string().required('Gender is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      address: Yup.string().required('Address is required'),
      phone: Yup.string().required('Phone number is required'),
      isActive: Yup.boolean().required('Status is required'),
      diploma: Yup.string().required('Diploma is required'),
      hireDate: Yup.date().required('Hire date is required'),
      speciality: Yup.string().required('Speciality is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission and add teacher
      console.log(values);
    },
  });

  // Available classes from the database (dynamic data)
  const availableClasses = [
    { id: '1', name: 'Class A' },
    { id: '2', name: 'Class B' },
    { id: '3', name: 'Class C' },
    // Add more classes as needed
  ];

  return (
    <Form onSubmit={formik.handleSubmit} className='addTeacher'>
      <h1>Add New Teacher</h1>

      <Row>
        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='firstName'>First Name*</Form.Label>
          <Form.Control
            id='firstName'
            type='text'
            className={`form-control ${formik.errors.firstName  && formik.touched.firstName  ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className='invalid-feedback'>{formik.errors.firstName}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='lastName'>Last Name*</Form.Label>
          <Form.Control
            id='lastName'
            type='text'
            className={`form-control ${formik.errors.lastName  && formik.touched.lastName ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className='invalid-feedback'>{formik.errors.lastName}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='cin'>CIN*</Form.Label>
          <Form.Control
            id='cin'
            type='text'
            className={`form-control ${formik.errors.cin  && formik.touched.cin ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('cin')}
          />
          {formik.touched.cin && formik.errors.cin && (
            <div className='invalid-feedback'>{formik.errors.cin}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='birthday'>Birthday*</Form.Label>
          <Form.Control
            id='birthday'
            type='date'
            className={`form-control ${formik.errors.birthday  && formik.touched.birthday ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('birthday')}
          />
          {formik.touched.birthday && formik.errors.birthday && (
            <div className='invalid-feedback'>{formik.errors.birthday}</div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='gender'>Gender*</Form.Label>
          <Form.Select
            id='gender'
            className={`form-select ${formik.errors.gender   && formik.touched.gender? 'is-invalid' : ''}`}
            {...formik.getFieldProps('gender')}
          >
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Form.Select>
          {formik.touched.gender && formik.errors.gender && (
            <div className='invalid-feedback'>{formik.errors.gender}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='email'>Email*</Form.Label>
          <Form.Control
            id='email'
            type='email'
            className={`form-control ${formik.errors.email  && formik.touched.email ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='invalid-feedback'>{formik.errors.email}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='address'>Address*</Form.Label>
          <Form.Control
            id='address'
            type='text'
            className={`form-control ${formik.errors.address  && formik.touched.address ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('address')}
          />
          {formik.touched.address && formik.errors.address && (
            <div className='invalid-feedback'>{formik.errors.address}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='phone'>Phone*</Form.Label>
          <Form.Control
            id='phone'
            type='text'
            className={`form-control ${formik.errors.phone  && formik.touched.phone ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('phone')}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className='invalid-feedback'>{formik.errors.phone}</div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='speciality'>Speciality*</Form.Label>
          <Form.Control
            id='speciality'
            type='text'
            className={`form-control ${formik.errors.speciality  && formik.touched.speciality ?  'is-invalid' : ''}`}
            {...formik.getFieldProps('speciality')}
          />
          {formik.touched.speciality && formik.errors.speciality && (
            <div className='invalid-feedback'>{formik.errors.speciality}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='diploma'>Diploma*</Form.Label>
          <Form.Control
            id='diploma'
            type='text'
            className={`form-control ${formik.errors.diploma  && formik.touched.diploma ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('diploma')}
          />
          {formik.touched.diploma && formik.errors.diploma && (
            <div className='invalid-feedback'>{formik.errors.diploma}</div>
          )}
        </Col>

        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='hireDate'>Hire Date*</Form.Label>
          <Form.Control
            id='hireDate'
            type='date'
            className={`form-control ${formik.errors.hireDate  && formik.touched.hireDate ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('hireDate')}
          />
          {formik.touched.hireDate && formik.errors.hireDate && (
            <div className='invalid-feedback'>{formik.errors.hireDate}</div>
          )}
        </Col>

        <Col md={3} className='mb-3 d-flex justify-content-center align-items-end'>
          <Form.Check
            id='isActive'
            type='checkbox'
            className='form-check-input'
            checked={formik.values.isActive}
            {...formik.getFieldProps('isActive')}
          />
          <Form.Label htmlFor='isActive' className='form-check-label'>
            Active
          </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={3} className='mb-3'>
          <Form.Label htmlFor='selectedClasses'>Class(es)*</Form.Label>
          <Form.Select
            id='selectedClasses'
            className={`form-select ${formik.errors.selectedClasses  && formik.touched.selectedClasses ? 'is-invalid' : ''}`}
            multiple
            value={selectedClasses}
            onChange={(e) =>
              setSelectedClasses(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {availableClasses.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </Form.Select>
          {formik.touched.selectedClasses && formik.errors.selectedClasses && (
            <div className='invalid-feedback'>{formik.errors.selectedClasses}</div>
          )}
          <div className='form-text text-muted' style={{ fontSize: 'small', color: 'lightgray' }}>
            (Ctrl + click) or (⌘ + click) to select multiple classes
          </div>
        </Col>
        <AvatarEdit button='Add Teacher profile photo' />
      </Row>

      <Button type='submit' className='btn btn-primary'>
        Add Teacher
      </Button>
    </Form>
  );
}
