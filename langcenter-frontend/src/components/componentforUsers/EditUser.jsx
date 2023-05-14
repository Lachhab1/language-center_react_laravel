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
                <Form onSubmit={formik.handleSubmit} noValidate className='addTeacher'>
            <h1>Add New User</h1>
            <Row>
                <Form.Group as={Col} md="3" controlId="validationFormik01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        {...formik.getFieldProps('firstName')}
                        isInvalid={formik.touched.firstName && formik.errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        {...formik.getFieldProps('lastName')}
                        isInvalid={formik.touched.lastName && formik.errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik03">
                    <Form.Label>CIN</Form.Label>
                    <Form.Control
                        type="text"
                        name="cin"
                        {...formik.getFieldProps('cin')}
                        isInvalid={formik.touched.cin && formik.errors.cin}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.cin}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik04">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control

                        type="date"
                        name="birthday"
                        {...formik.getFieldProps('birthday')}
                        isInvalid={formik.touched.birthday && formik.errors.birthday}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.birthday}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik05">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        component="select"
                        id="gender"
                        name="gender"
                        {...formik.getFieldProps(gender)}
                        isInvalid={formik.touched.gender && formik.errors.gender}
                    >
                        <option value=''>Choose gender</option>
                        <option value='female'>female</option>
                        <option value='male'>male</option>
                     </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.gender}</Form.Control.Feedback>
              </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationFormik06">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                name="email"
                {...formik.getFieldProps('email')}
                isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.email}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik07">
            <Form.Label>Email Confirmation</Form.Label>
            <Form.Control
                type="text"
                name="emailConfirmation"
                {...formik.getFieldProps('emailConfirmation')}
                isInvalid={formik.touched.emailConfirmation && formik.errors.emailConfirmation}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.emailConfirmation}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik08">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                name="password"
                {...formik.getFieldProps('password')}
                isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.password}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik09">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
                type="password"
                name="passwordConfirmation"
                {...formik.getFieldProps('passwordConfirmation')}
                isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.passwordConfirmation}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik10">
            <Form.Label>Phone</Form.Label>
            <Form.Control

                type="text"
                name="phone"
                {...formik.getFieldProps('phone')}
                isInvalid={formik.touched.phone && formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.phone}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik11">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type="text"
            name="address"
            {...formik.getFieldProps('address')}
            isInvalid={formik.touched.address && formik.errors.address}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.address}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik12">
            <Form.Label>Hiredata</Form.Label>
            <Form.Control
                type="date"
                name="hireDate"
                {...formik.getFieldProps('hireDate')}
                isInvalid={formik.touched.hireDate && formik.errors.hireDate}
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.hireDate}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative my-3">
            <Form.Check
              required
              name="Active"
              label="Active"
              onChange={formik.handleChange}
              feedback={formik.errors.isActive}
              isInvalid={!!(formik.errors.isActive && formik.touched.isActive)}
              feedbackType="invalid"
              id="validationFormik106"
              feedbackTooltip
            />
          </Form.Group>
        </Row>
        <Button type="submit">save User</Button>
        </Form>





    </div>
  )
}

