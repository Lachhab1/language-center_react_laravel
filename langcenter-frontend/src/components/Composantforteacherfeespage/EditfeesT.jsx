
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';


export default function EditFeesT()
{
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('select teacher'),
        }),
          onSubmit: (values) => {
            console.log(values);
          },
        });

    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
            <Row md={4} className='mb-4'>
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
            </Row>
                         <Button type='submit' className='btn btn-primary'>
                            Add
                        </Button>

            </Form>
        </div>
    )
}