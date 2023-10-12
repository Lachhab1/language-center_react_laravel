import React from 'react';
import { Formik, Field,useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useEffect,useState } from 'react';

export default function AddTest() {
  const [levels, setLevels] = useState([]);
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
  duration: Yup.number()
    .integer("must be an Integer")
    .required('Required'),
    price: Yup.number()
    .integer("must be an Integer")
    .required('Required'),
    level : Yup.string()
    .required('Required'),
    description : Yup.string()
    .nullable()
});
const formik = useFormik({
  initialValues: {
    name: '',
    duration: '',
    price: '',
    level: '',
    description: '',
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
        duration: values.duration,
        price: values.price,
        level_id: values.level,
        description: values.description,
    };
    axios.post('/api/tests', sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Test added successfully');
        setVariant('success');
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
  };
  const handleSubmitt = async (e) => {
    e.preventDefault()
    console.log("cococ",formik.values)

    const sendData = {
        name: formik.values.name,
        duration: formik.values.duration,
        price: formik.values.price,
        level_id: formik.values.level,
        description: formik.values.description,
    };
    axios.post('/api/tests', sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Test added successfully');
        setVariant('success');
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
    axios.get('/api/levels')
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
      <Form.Group as={Col}
          sm={4} controlId="duration">
        <Form.Label column >
          Duration
        </Form.Label>
        
          <Form.Control

            type="text"
            placeholder="Duration en minutes"
            name="duration"
            {...formik.getFieldProps('duration')}
            isInvalid={formik.touched.duration && formik.errors.duration}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.duration}
          </Form.Control.Feedback>
        
      </Form.Group>
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
      <Form.Group as={Col}
          sm={4} controlId="level">
        <Form.Label>
          Level
        </Form.Label>
          <Form.Select
            name="level"
            {...formik.getFieldProps('level')}
            isInvalid={formik.touched.level && formik.errors.level}
          >
            <option value="">Select a level</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.level}
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}
          sm={4} controlId="description">
        <Form.Label column >
          Description
        </Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            {...formik.getFieldProps('description')}
            isInvalid={formik.touched.description && formik.errors.description}
            />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
      </Form.Group>
      </Row>
      <Button type="submit" className='my-3 btn-secondary'>Submit</Button>
    </Form>
  );
}
