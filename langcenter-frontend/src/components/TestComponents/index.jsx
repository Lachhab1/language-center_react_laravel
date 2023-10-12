import React from 'react';
import { Formik, Field,useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate,useParams } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useEffect,useState } from 'react';

export default function EditTest() {
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
    price: Yup.number()
    .integer("must be an Integer")
    .required('Required'),
});
const formik = useFormik({
  initialValues: {
    price: '',
  },
  validationSchema: Scheme,
  onSubmit: (e,values) => {
    handleSubmitt(e,values);
  },
});




  const handleSubmitt = async (e,values) => {
    e.preventDefault()
    console.log("cococ",formik.values)

    const sendData = {
        price: formik.values.price,
    };
    axios.put(`/api/tests/1`, sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Test price edited successfully');
        setVariant('warning');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        navigate(`${x}/tests`);
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
  useEffect(() => {
    axios.get(`/api/tests/1`)
        .then((res) => {
            console.log(res.data);
            formik.setValues(res.data.data);
        })
        .catch((error) => {
            console.error(error);
        }
    );
  }, []);



  return (
    <Form noValidate onSubmit={handleSubmitt}>
      <Row className='mb-3'>
        <h1>Placement Test Price</h1>
      <Form.Group as={Col}
          sm={4} controlId="price">
        <Form.Label column >
          Price
        </Form.Label>
        
          <Form.Control
            type="text"
            placeholder="Price"
            name="price"
            {...formik.getFieldProps('price')}
            isInvalid={formik.touched.price && formik.errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.price}
          </Form.Control.Feedback>
      </Form.Group>
      </Row>
      <Button type="submit" className='my-3 btn-secondary'>Submit</Button>
    </Form>
  );
}
