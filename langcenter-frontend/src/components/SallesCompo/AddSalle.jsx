import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';

export default function AddSalle() {
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
  capacity: Yup.number()
    .integer("must be an Integer")
    .required('Required'),
});

  const handleSubmit = async (values) => {
    console.log("cococ",values)

    const sendData = {
      name: values.name,
      capacity: values.capacity,
    };
  
    axios.post('/api/classroom', sendData)
      .then((res) => {
        console.log(res.data);
        setNotification('Classroom added successfully');
        setVariant('success');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        navigate(`${x}/classroom`);
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
  

  return (
    <Formik
      initialValues={{
        name: '',
        capacity: '',
      }}
      validationSchema={addSalleScheme}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className='add-salle-form'>
          <div className='row'>
            <div className='form-group col-lg-5 mt-3 mt-lg-0' >
              <label htmlFor='name'>Name*</label>
              <Field
                style={{ backgroundColor: ' rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
                type='text'
                name='name'
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder='Entrez le nom de la salle' // Placeholder avec commentaire
              />
              {errors.name && touched.name && <div className='invalid-feedback'>{errors.name}</div>}
            </div>

            <div className='form-group col-lg-5 mt-3 mt-lg-0'>
              <label htmlFor='capacity'>Capacity*</label>
              <Field
                style={{ backgroundColor: ' rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
                type='number'
                name='capacity'
                className={`form-control ${errors.capacity && touched.capacity ? 'is-invalid' : ''}`}
                placeholder='Entrez la capacité de la salle' // Placeholder avec commentaire
              />
              {errors.capacity && touched.capacity && (
                <div className='invalid-feedback'>{errors.capacity}</div>
              )}
            </div>
          </div>

          <button type='submit' className='btn btn-danger mt-2'>
            Add Classroom
          </button>
        </Form>
      )}
    </Formik>
  );
}
