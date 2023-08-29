
import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Row, Col,Table, Tab,Button} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from "../../api/axios"
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
        //get teacher name from database
        const [teacherData, setTeacherData] = useState([]);
        useEffect(
        () => {

            const getTeacherData = async() => {
                const response = await axios.get('/api/teachers');
            setTeacherData(response.data.data);
        };
        getTeacherData()
        
         }
        ,[])

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
                            >
                            {
                            teacherData.map((teacher) => (
                                <option key={teacher?.id} value={teacher?.id}>
                                    {teacher?.first_name} {teacher?.last_name}
                                </option>
                            ))

                            }
                            {formik.touched.name&& formik.errors.name && (
                            <div className='invalid-feedback'>{formik.errors.name}</div>
                            )}
                            </Form.Select>
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