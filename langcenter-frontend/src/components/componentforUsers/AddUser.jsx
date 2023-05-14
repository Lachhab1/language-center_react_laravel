import React, { useState } from 'react';
import { useFormik } from 'formik';
import AvatarEdit from "../ProfileCompo/AvatarEdit";
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import axios from '../../api/axios';

export default function AddUser() {
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
            gender: Yup.string().required('Gender is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            emailConfirmation: Yup.string()
                .oneOf([Yup.ref('email'), null], 'email must match'),
            password: Yup.string().required('Password is required'),
            passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
        <form onSubmit={formik.handleSubmit} noValidate className='addTeacher'>
            <h1>Add New User</h1>

            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name*
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        className={`form-control ${formik.errors.firstName ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                    )}
                </div>

                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name*
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        className={`form-control ${formik.errors.lastName ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                    )}
                </div>


                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="cin" className="form-label">
                        CIN*
                    </label>
                    <input
                        id="cin"
                        type="text"
                        className={`form-control ${formik.errors.cin ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('cin')}
                    />
                    {formik.touched.cin && formik.errors.cin && (
                        <div className="invalid-feedback">{formik.errors.cin}</div>
                    )}
                </div>

                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="birthday" className="form-label">
                        Birthday*
                    </label>
                    <input
                        id="birthday"
                        type="date"
                        className={`form-control ${formik.errors.birthday ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('birthday')}
                    />
                    {formik.touched.birthday && formik.errors.birthday && (<div className="invalid-feedback">{formik.errors.birthday}</div>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="gender" className="form-label">
                        Gender*
                    </label>
                    <select
                        id="gender"
                        className={`form-select ${formik.errors.gender ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('gender')}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                        <div className="invalid-feedback">{formik.errors.gender}</div>
                    )}
                </div>
                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="address" className="form-label">
                        Address*
                    </label>
                    <input
                        id="address"
                        type="text"
                        className={`form-control ${formik.errors.address ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <div className="invalid-feedback">{formik.errors.address}</div>
                    )}
                </div>

                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone*
                    </label>
                    <input
                        id="phone"
                        type="text"
                        className={`form-control ${formik.errors.phone ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                    )}
                </div>


                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="hireDate" className="form-label">
                        Hire Date*
                    </label>
                    <input
                        id="hireDate"
                        type="date"
                        className={`form-control ${formik.errors.hireDate ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('hireDate')}
                        />
                    {formik.touched.hireDate && formik.errors.hireDate && (
                        <div className="invalid-feedback">{formik.errors.hireDate}</div>
                        )}
                </div>

            </div>
                <div className='row'>
                    <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="email" className="form-label">
                        Email*
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>
                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="conf-email" className="form-label">
                        Confirme Email*
                    </label>
                    <input
                        id="conf-email"
                        type="email"
                        className={`form-control ${formik.errors.emailConfirmation ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('emailConfirmation')}
                    />
                    {formik.touched.emailConfirmation && formik.errors.emailConfirmation && (
                        <div className="invalid-feedback">{formik.errors.emailConfirmation}</div>
                    )}
                </div>
                <div className="col-md-3 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="password" className="form-label">
                        password*
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>
                <div className="col-md-3 col-sm-6 col-xs-7 col-sm-6 col-xs-7 mb-3">
                    <label htmlFor="conf-password" className="form-label">
                        Confirme password*
                    </label>
                    <input
                        id="conf-password"
                        type="password"
                        className={`form-control ${formik.errors.passwordConfirmation ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('passwordConfirmation')}
                    />
                    {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                        <div className="invalid-feedback">{formik.errors.passwordConfirmation}</div>
                    )}
                </div>
                        </div>
                <div className="row">
                        <AvatarEdit button='Add Teacher profile photo'/>
            <div className='col-md-3 col-sm-6 col-xs-7 col-sm-6 col-xs-7 mb-3 w-100'>
            
                <div className="col-md-3 col-sm-6 col-xs-7 col-sm-6 col-xs-7 m-3">
                    <div className="form-check">
                        <input
                            id="isActive"
                            type="checkbox"
                            className="form-check-input"
                            checked={formik.values.isActive}
                            {...formik.getFieldProps('isActive')}
                            />
                        <label htmlFor="isActive" className="form-check-label ">
                            Active
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <Button type="submit">add User</Button>
        </form>





    </div>
  )
}

