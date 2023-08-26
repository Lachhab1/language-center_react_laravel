
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Row, Col,Table, Tab } from 'react-bootstrap';
import * as Yup from 'yup';

export default function AddFeesT()
{
    const formik = useFormik({
        initialValues: {
            name: '',
            amount:'',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('select teacher'),
            amount: Yup.string().required('enter amount'),
        }),
          onSubmit: (values) => {
            console.log(values);
          },
        });

    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
            <Row md={4} className='mb-3'>
                <Col>
                        <Form.Label htmlFor='name'>Teacher Name*</Form.Label>
                            <Form.Select
                            id='name'
                            className={`form-control ${formik.errors.name  && formik.touched.name ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name&& formik.errors.name && (
                            <div className='invalid-feedback'>{formik.errors.name}</div>
                            )}
                </Col>  
                <Col>
                        <Form.Label htmlFor='amount'>Amount*</Form.Label>
                                
                            <Form.Control
                            id='amount'
                            type='text'
                            {...formik.getFieldProps('amount')}
                            className={`form-control ${formik.errors.amount && formik.touched.amount ? 'is-invalid' : ''}`}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                            <div className='invalid-feedback'>{formik.errors.amount}</div>
                            )}
                </Col>
            </Row>
                         <Button type='submit' className='btn btn-success'>
                            Checkout
                        </Button>

            </Form>
            <div className='d-flex flex-row-reverse me-5'>  
                {/* payment table containe paid amount grand total ,worked hours */}
                <Table striped bordered hover className='w-25' >
                    <thead>
                        <tr>
                        <th>Worked hours</th>
                        <td>200</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th>Hourly rate</th>
                        <td>100</td>
                        </tr>
                        <tr>
                        <th>month salary</th>
                        <td>{200 * 100}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}