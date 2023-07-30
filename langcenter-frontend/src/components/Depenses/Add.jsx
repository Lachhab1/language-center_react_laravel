import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';
import { Ellipsis } from 'react-awesome-spinners';
import { SketchPicker } from 'react-color';

const Add = () => {
  const { user, setNotification, setVariant } = UseStateContext();
  const navigate = useNavigate();
  let x = ""
  if (user && user.role === 'admin') {
    x = ""
  } else if (user && user.role === 'director') {
    x = "/director"
  }
  else {
    x = "/secretary"
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Expense name is required'),
    description: Yup.string(),
    amount: Yup.number().required('amount is required'),
  });
  const initialValues = {
    name: '',
    amount: '',
    description: '',
  };

  const handleSubmit = (values) => {
    // Handle form submission and add group
    const sendData = {
      expense_name: values.name,
      expense_amount: values.amount,
      expense_description: values.description,
    };
    axios.post('/api/expenses', sendData).then((res) => {
      console.log(res.data);
      setNotification('Expense added successfully');
      setVariant('success');
      setTimeout(() => {
        setNotification('');
        setVariant('');
      }, 3000);
      navigate(`${x}/fees/expenses`);
    });

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit} className="addGroup">
          <h1>Add Expense</h1>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="groupName">Expense Name*</Form.Label>
              <Form.Control
                id="name"
                type="text"
                {...formik.getFieldProps('name')}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                id="description"
                type="text"
                {...formik.getFieldProps('description')}
                isInvalid={
                  formik.touched.description && formik.errors.description
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label htmlFor="amount">Amount*</Form.Label>
              <Form.Control
                id="amount"
                type="number"
                {...formik.getFieldProps('amount')}
                isInvalid={
                  formik.touched.amount && formik.errors.amount
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.amount}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Button type="submit" variant="primary">
            Add Expense
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Add;
