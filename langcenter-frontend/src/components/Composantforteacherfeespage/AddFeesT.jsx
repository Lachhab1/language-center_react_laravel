
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';


export default function AddFeesT()
{
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            gender: '',
           hours:'',
           status:'',
            amount:'',
            date:'',
          },
          validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            gender: Yup.string().required('Gender is required'),
            hours:Yup.number().required('Hours is required'),
            status:Yup.string().required('Status is required'),
            amount:Yup.number().required('Amount is required'),
            date:Yup.date().required('Date is required'),
          }),
          onSubmit: (values) => {
            // Handle form submission and add teacher
            console.log(values);
          },
        });

    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
            <Row md={4} className='mb-4'>
                <Col>
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
                <Col>
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
                <Col>
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
            </Row>
            <Row  md={4} className='mb-4'>
                <Col>
                <Form.Label htmlFor='hours'>Hours*</Form.Label>
                            <Form.Control
                            id='hours'
                            type='number'
                            className={`form-control ${formik.errors.hours  && formik.touched.hours ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('hours')}
                            />
                            {formik.touched.hours && formik.errors.hours && (
                            <div className='invalid-feedback'>{formik.errors.hours}</div>
                            )}
                </Col>
                <Col>
                        <Form.Label htmlFor='status'>Status*</Form.Label>
                        <Form.Select
                            id='status'
                            className={`form-select ${formik.errors.status   && formik.touched.status? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('status')}
                        >
                            <option value=''>Select  status</option>
                            <option value='paid'>Paid</option>
                            <option value='unpaid'>Unpaid</option>
                        </Form.Select>
                        {formik.touched.status && formik.errors.status && (
                            <div className='invalid-feedback'>{formik.errors.status}</div>
                        )}
                </Col>
                <Col>
                         <Form.Label htmlFor='amount'>Amount*</Form.Label>
                            <Form.Control
                            id='amount'
                            type='number'
                            className={`form-control ${formik.errors.amount  && formik.touched.amount ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('amount')}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                            <div className='invalid-feedback'>{formik.errors.amount}</div>
                            )}
                </Col>
            </Row>
            <Row  md={4} className='mb-4'>
                <Col>
                             <Form.Label htmlFor='date'>Date*</Form.Label>
                            <Form.Control
                            id='date'
                            type='date'
                            className={`form-control ${formik.errors.date  && formik.touched.date? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('date')}
                            />
                            {formik.touched.date && formik.errors.date && (
                            <div className='invalid-feedback'>{formik.errors.date}</div>
                            )}
                </Col>
            </Row>
                         <Button type='submit' className='btn btn-primary'>
                            Add
                        </Button>

            </Form>
        </div>
    )
}