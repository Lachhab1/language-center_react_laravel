import React from 'react';
import { Formik, Field,useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate,useParams } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useEffect,useState } from 'react';

export default function EditTest({setSelectedTab}) {
    const {id} = useParams();
const {user,setNotification, setVariant } = UseStateContext();
const navigate = useNavigate();
 let x = ""
      if (user && user.role==='admin')
      {
          x = ""
      } else if (user && user.role==='director')
      {
          x="/director"
      }
      else{
          x="/secretary"
      }
  const Scheme = Yup.object().shape({
    amount: Yup.number()
    .integer("must be an Integer")
    .required('Required')
});
const formik = useFormik({
  initialValues: {
    amount: '',
  },
  validationSchema: Scheme,
  onSubmit: (e,values) => {
    handleSubmitt(e,values);
  },
});




  const handleSubmitt = async (e,values) => {
    e.preventDefault()

    const sendData = {
        register_id: id,
        amount: formik.values.amount,
    };
    axios.put(`/api/testPayment/${id}`, sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Test payment edited successfully');
        setVariant('warning');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        navigate(`${x}/income/student`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Handle specific error status code (422)
          console.log(error.response.data); // Log the error response data
          // Display an error message to the user
          setNotification('Error: Invalid data');
          setVariant('danger');
          setTimeout(() => {
            setNotification('');
          }, 3000);
        } else {
          // Handle other errors
          console.error(error);
          // Display a generic error message to the user
          setNotification('An error occurred');
          setVariant('danger');
          setTimeout(() => {
            setNotification('');
          }, 3000);
        }
      });
  }



  return (
    <Form noValidate onSubmit={handleSubmitt}>
      <Row className='mb-3'>
        <Form.Group as={Col} md='4' controlId='validationFormik01'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
                type='text'
                name='amount'
                value={formik.values.amount}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.amount}
            />
            <Form.Control.Feedback type='invalid'>
                {formik.errors.amount}
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit" className='my-3 btn-secondary'>Submit</Button>
    </Form>
  );
}
