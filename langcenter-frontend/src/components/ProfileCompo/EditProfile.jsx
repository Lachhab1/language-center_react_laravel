import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { UseStateContext } from '../../context/ContextProvider';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditProfile = React.forwardRef(({ onSubmit }, ref) => {
  const { logout, user } = UseStateContext();

  const handleFormSubmit = (values) => {
    // TODO: handle form submission
    //  console.log('',values);
    onSubmit(values);
    console.log('user ',user)
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          firstName: user.first_name,
          lastName: user.last_name,
          phoneNumber: user.phone,
          address: user.address,
          password: '',
          passwordConfirmation: '',
          
        }}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form>
            <Form.Group className="mb-3  col-12  col-md-6 col-lg-5">
              <Form.Label>First Name:</Form.Label>
              <Field
                type="text"
                name="firstName"
                className={`inputStyle col-sm-8 col-lg-6 form-control ${
                  errors.firstName ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
            </Form.Group>
            <Form.Group className="mb-3 col-12  col-md-6 col-lg-5">
              <Form.Label>Last Name:</Form.Label>
              <Field
                type="text"
                name="lastName"
                className={`inputStyle form-control ${errors.lastName ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
            </Form.Group>
            <Form.Group className="mb-3 col-12  col-md-6 col-lg-5">
              <Form.Label>Phone Number:</Form.Label>
              <Field
                type="tel"
                name="phoneNumber"
                className={`inputStyle form-control ${
                  errors.phoneNumber ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
            </Form.Group>
            <Form.Group className="mb-3 col-12  col-md-6 col-lg-5">
              <Form.Label>Address:</Form.Label>
              <Field
                type="text"
                name="address"
                className={`inputStyle form-control ${
                  errors.address ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage name="address" component="div" className="invalid-feedback" />
            </Form.Group>
            
            <Form.Group className="mb-3 col-12  col-md-6 col-lg-5">
      <Form.Label>New Password:</Form.Label>
      <Field type="password" name="password" className="inputStyle form-control" />
    </Form.Group>
    <Form.Group className=" mb-3 col-12  col-md-6 col-lg-5">
      <Form.Label>Password Confirmation:</Form.Label>
      <Field
        type="password"
        name="passwordConfirmation"
        className={`inputStyle form-control ${
          errors.passwordConfirmation ? 'is-invalid' : ''
        }`}
      />
      <ErrorMessage
        name="passwordConfirmation"
        component="div"
        className="invalid-feedback"
      />
    </Form.Group>

          </Form>
        )}
      </Formik>
    </div>
  );
});

export default EditProfile;




