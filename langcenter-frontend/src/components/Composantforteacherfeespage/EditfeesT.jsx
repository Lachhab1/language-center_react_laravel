import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Row, Col,Table, Tab,Button} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from "../../api/axios"
import { useNavigate, useParams } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';

export default function EditfeesT()
{
        const [hoursData, setHoursData] = useState([]);
        const [hourlyRateData, setHourlyRateData] = useState([]);

    const navigate = useNavigate();
    const {id} = useParams();
    const { setNotification, setVariant } = UseStateContext();
    const formik = useFormik({
        initialValues: {
            name: '',
            month: '',
            year: '',
            amount:'',
        },
        validationSchema: Yup.object({
            name : Yup.string().required('select teacher'),
            month: Yup.string().required('select month'),
            year: Yup.string().required('select year'),
            amount: Yup.string().required('enter amount'),
        }),
            onSubmit: (values) => {
            console.log(values);
            const sendData = {
                teacher_id:values.name,
                salary:values.amount,
                month: values.month,
                year:values.year,
            }
            axios.put(`/api/salary/${id}`,sendData);
            setNotification('Salary has been updated successfully');
                setVariant('warning');
                setTimeout(() => {
                    setNotification('');
                    setVariant('');
                }
                , 3000);
                navigate('/fees/teacher');
            },
        });
        //get teacher id from salary table
        const [teacherData, setTeacherData] = useState([]);
        const [teacherId, setTeacherId] = useState([]);
        const [salaryData, setSalaryData] = useState([]);
        useEffect(
            () => {
                const getTeacherData = async() => {
                    const response = await axios.get('/api/teachers');
                    setTeacherData(response.data.data);
                    console.log(response.data.data);
                };
                getTeacherData();
                console.log("wewe");
                const getTeacherId = async() => {
                    const response = await axios.get(`/api/salary/${id}`);
                    setTeacherId(response.data.data.teacher_id);
                    formik.setValues({
                    name:teacherId,
                    month: response.data.data.month_number,
                    year: response.data.data.year,
                    amount: response.data.data.salary,
                })
                
                };
                getTeacherId()
            }
            ,[teacherId])
            //get worked hours from hours table
            useEffect(
                () => {
                    axios.get(`/api/salary/${id}`)
                    .then(response => {
                    console.log(response);
                    setHoursData(response.data.data.hours);
                    })
                    teacherData.map((teacher) => 
                    {
                    if(teacher.id == formik.values.name)
                    {
                        setHourlyRateData(teacher.hourly_rate);
                    }
                })
                    
            }
            ,[formik.values.name,formik.values.month,formik.values.year])
                        return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Label htmlFor='name'>Teacher Name*</Form.Label>
                            <Form.Select
                            id='name'
                            className={`form-control ${formik.errors.name  && formik.touched.name ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('name')}
                            disabled
                            >
                            <option value=''>Select Teacher</option>
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
                        <Form.Label htmlFor='month'>Month*</Form.Label>
                                
                            <Form.Select
                            id='month'
                            className={`form-control ${formik.errors.month  && formik.touched.month ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('month')}
                            disabled
                            >
                            <option value=''>Select Month</option>
                            <option value='1'>January</option>
                            <option value='2'>February</option>
                            <option value='3'>March</option>
                            <option value='4'>April</option>
                            <option value='5'>May</option>
                            <option value='6'>June</option>
                            <option value='7'>July</option>
                            <option value='8'>August</option>
                            <option value='9'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                            {formik.touched.month&& formik.errors.month && (
                            <div className='invalid-feedback'>{formik.errors.month}</div>
                            )}
                            </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label htmlFor='year'>Year*</Form.Label>
                                
                            <Form.Select
                            id='year'
                            className={`form-control ${formik.errors.year  && formik.touched.year ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('year')}
                            disabled
                            >
                            <option value=''>Select Year</option>
                            <option value='2021'>2021</option>
                            <option value='2022'>2022</option>
                            <option value='2023'>2023</option>
                            <option value='2024'>2024</option>
                            {formik.touched.year&& formik.errors.year && (
                            <div className='invalid-feedback'>{formik.errors.year}</div>
                            )}
                            </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label htmlFor='amount'>Amount*</Form.Label>
                        <Form.Control
                            id='amount'
                            type='text'
                            {...formik.getFieldProps('amount')}
                            isInvalid={formik.touched.amount && formik.errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.amount}
                        </Form.Control.Feedback>
                    </Col>
                    </Row>
                    <Button variant="secondary" type="submit" className="mt-3">
                        save
                    </Button>
                </Form>
                <div className='d-flex flex-row-reverse me-5'>  
                {/* payment table containe paid amount grand total ,worked hours */}
                <Table striped bordered hover className='w-25' >
                    <thead>
                        <tr>
                        <th>Worked hours</th>
                        <td>{hoursData}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th>Hourly rate</th>
                        <td>{hourlyRateData}</td>
                        </tr>
                        <tr>
                        <th>month salary</th>
                        <td>{hoursData * hourlyRateData}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            </div>
    )
}
