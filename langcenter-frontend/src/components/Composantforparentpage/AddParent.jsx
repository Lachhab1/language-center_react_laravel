import { useFormik } from 'formik';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';

function AddParent() {
  const formik = useFormik({
    initialValues: {
      guardfName: '',
      guardLName: '',
      guardOcup: '',
      guardEmail: '',
      guardPhone: '',
      gender: '',
      CIN: '',
      birthday: ''
    },
    validationSchema: yup.object().shape({
      guardfName: yup.string().required('First name is required'),
      guardLName: yup.string().required('Last name is required'),
      guardOcup: yup.string().required('Occupation is required'),
      guardEmail: yup.string().email('Invalid Email').required('Email is required'),
      guardPhone: yup.string().required('Phone number is required').min(9, 'Phone number must be at least 9 characters'),
      gender: yup.string().required('Please select a gender'),
      CIN: yup.string().required('CIN is required'),
      birthday: yup.date().required('Birthday is required').nullable()
    }),
    onSubmit: values => {
      // Handle form submission here
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className='mb-3'>
        <h3>Parents</h3>
        <Form.Group as={Col} md="3" sm="6" xs="12" controlId="validationFormik1032" className='position-relative'>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="guardfName"
            placeholder="First name"
            {...formik.getFieldProps('guardfName')}
            isInvalid={formik.touched.guardfName && formik.errors.guardfName}
          />
          <Form.Control.Feedback type="invalid" tooltip>{formik.errors.guardfName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" controlId="validationFormik1" className='position-relative'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name="guardLName"
            placeholder="Last name"
            {...formik.getFieldProps('guardLName')}
            isInvalid={formik.touched.guardLName && formik.errors.guardLName}
          />
          <Form.Control.Feedback type="invalid" tooltip>{formik.errors.guardLName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Occupation"
            name="guardOcup"
            {...formik.getFieldProps('guardOcup')}
            isInvalid={formik.touched.guardOcup && formik.errors.guardOcup}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardOcup}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="guardEmail"
            {...formik.getFieldProps('guardEmail')}
            isInvalid={formik.touched.guardEmail && formik.errors.guardEmail}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardEmail}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone"
            name="guardPhone"
            {...formik.getFieldProps('guardPhone')}
            isInvalid={formik.touched.guardPhone && formik.errors.guardPhone}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardPhone}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            {...formik.getFieldProps('gender')}
            isInvalid={formik.touched.gender && formik.errors.gender}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.gender}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>CIN</Form.Label>
          <Form.Control
            type="text"
            placeholder="CIN"
            name="CIN"
            {...formik.getFieldProps('CIN')}
            isInvalid={formik.touched.CIN && formik.errors.CIN}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.CIN}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="Birthday"
            name="birthday"
            {...formik.getFieldProps('birthday')}
            isInvalid={formik.touched.birthday && formik.errors.birthday}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.birthday}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default AddParent;
