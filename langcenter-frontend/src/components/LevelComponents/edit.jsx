import React from 'react';
import { Formik, Field,useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate,useParams } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useEffect,useState } from 'react';

export default function Edit() {
    const { id } = useParams();
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
  const addSalleScheme = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
});
const formik = useFormik({
  initialValues: {
    name: '',
  },
  validationSchema: addSalleScheme,
  onSubmit: (values) => {
    handleSubmit(values);
  },
});




  const handleSubmit = async (e) => {
    console.log("cococ",formik.values)

    const sendData = {
      name: values.name,
    };
    axios.put('/api/levels/'+id, sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Level added successfully');
        setVariant('success');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        navigate(`${x}/levels`);
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
  };
  const handleSubmitt = async (e) => {
    e.preventDefault()
    console.log("cococ",formik.values)

    const sendData = {
        name: formik.values.name,
    };
    axios.put('/api/levels/'+id, sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Test added successfully');
        setVariant('success');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        navigate(`${x}/levels`);
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
    axios.get(`/api/levels/${id}`)
      .then((res) => {
        console.log(res.data);
        setLevels(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  return (
    <Form noValidate onSubmit={handleSubmitt}>
      <Row className='mb-3'>
      <Form.Group as={Col}
          sm={4} controlId="name">
        <Form.Label column >
          Name
        </Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            {...formik.getFieldProps('name')}
            isInvalid={formik.touched.name && formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        
      </Form.Group>
      </Row>
      <Button type="submit" className='my-3 btn-secondary'>Submit</Button>
    </Form>
  );
}
