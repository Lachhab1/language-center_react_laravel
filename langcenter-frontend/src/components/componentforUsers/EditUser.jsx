import React, { useState } from 'react';
import { useFormik } from 'formik';
import AvatarEdit from "../ProfileCompo/AvatarEdit";
import * as Yup from 'yup';
import { Form,Button,Row,Col } from 'react-bootstrap';
import axios from '../../api/axios';

export default function EditUser() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            cin: '',
            birthday: '',
            gender: '',
            email: '',
            emailConfirmation: '',
            password: '',
            passwordConfirmation: '',
            role: '',
            address: '',
            phone: '',
            isActive: false,
            hireDate: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            cin: Yup.string().required('CIN is required'),
            birthday: Yup.date().required('Birthday is required'),
            gender: Yup.string().oneOf(['female','male']).required('required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            emailConfirmation: Yup.string()
                .oneOf([Yup.ref('email'), null], 'email must match'),
            password: Yup.string().required('Password is required'),
            passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            role: Yup.string().required('Role is required').oneOf(['admin', 'secretary', 'director']),
            address: Yup.string().required('Address is required'),
            phone: Yup.string().required('Phone number is required'),
            isActive: Yup.boolean(),
            hireDate: Yup.date().required('Hire date is required'),
        }),
        onSubmit: values => {
            axios.post('/saveUser',values).then(({data}) => {
                console.log(data);
            })
            .catch (error => {
                if(error.response &&error.response.status === 422)
                {
                    console.log(error.response.data.errors);
                }
            })
    },
    });
  return (
    <div>
                        < Form.Group
                as={Col}
                md="4"
                sm="6"
                xs="12"
                className='position-relative' controlId="validationFormik10">
                <Form.Label>Role</Form.Label>
                <Form.Select
                    component="select"
                    id="role"
                    name="role"
                    {...formik.getFieldProps('role')}
                    isInvalid={formik.touched.role && formik.errors.role}
                >
                    <option value=''>Chose Role</option>
                    <option value='admin'>admin</option>
                    <option value='user'>user</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" tooltip>{formik.errors.role}</Form.Control.Feedback>
            </Form.Group>




    </div>
  )
}

