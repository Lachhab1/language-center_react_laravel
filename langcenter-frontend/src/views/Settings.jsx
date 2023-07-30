import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UseStateContext } from '../context/ContextProvider';
import { useFormik } from 'formik'; // Importing the useFormik hook
import * as Yup from 'yup';
import axios from '../api/axios';
import AvatarEdit from "../components/ProfileCompo/AvatarEdit";

export default function Settings() {
  const { user, setNotification, setVariant } = UseStateContext();
  const [imageData, setImageData] = useState([]);
  const formRef = useRef(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone,
      address: user.address,
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const sendValues = {
        username: user.username,
        first_name: values.firstName,
        last_name: values.lastName,
        role: user.role,
        date_of_hiring: user.date_of_hiring,
        birthday: user.birthday,
        email: user.email,
        gender: user.gender,
        cin: user.cin,
        address: values.address,
        phone: values.phoneNumber,
        is_active: 1,
        password: values.password ? values.password : undefined,
        password_confirmation: values.passwordConfirmation ? values.passwordConfirmation : undefined,
      };

      axios
        .put(`/api/users/${user.id}`, sendValues, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        })
        .then(({ data }) => {
          setNotification('User has been edited successfully');
          setVariant('warning');
          setTimeout(() => {
            setNotification('');
            setVariant('');
          }, 3000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            formik.setErrors(error.response.data.errors);
            console.log('error a m3lm', error.response.data.errors)
          }
        });
    },
  });

  return (
    <div className="d-flex flex-column zz align-item-center">
      <div>
        <div className="card-body">
          <div>
            <div className="card-body">
              <AvatarEdit setImageData={setImageData} />
            </div>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 col-12 col-md-6 col-lg-5">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                className={`inputStyle col-sm-8 col-lg-6 form-control ${formik.errors.firstName ? 'is-invalid' : ''
                  }`}
                {...formik.getFieldProps('firstName')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6 col-lg-5">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                className={`inputStyle form-control ${formik.errors.lastName ? 'is-invalid' : ''
                  }`}
                {...formik.getFieldProps('lastName')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6 col-lg-5">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                className={`inputStyle form-control ${formik.errors.phoneNumber ? 'is-invalid' : ''
                  }`}
                {...formik.getFieldProps('phoneNumber')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6 col-lg-5">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                className={`inputStyle form-control ${formik.errors.address ? 'is-invalid' : ''
                  }`}
                {...formik.getFieldProps('address')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6 col-lg-5">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="inputStyle form-control"
                {...formik.getFieldProps('password')}
                isInvalid={formik.touched.password && formik.errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6 col-lg-5">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                className={`inputStyle form-control ${formik.errors.passwordConfirmation ? 'is-invalid' : ''
                  }`}
                {...formik.getFieldProps('passwordConfirmation')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="col-12 col-md-6 col-lg-5"
            >
              Save Changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
