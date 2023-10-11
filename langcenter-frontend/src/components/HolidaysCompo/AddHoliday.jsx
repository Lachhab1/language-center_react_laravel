import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';

const AddHoliday = () => {
  const { user, setNotification, setVariant } = UseStateContext();
  const navigate = useNavigate();
  
  let x = '';
  if (user && user.role === 'admin') {
    x = '';
  } else if (user && user.role === 'director') {
    x = '/director';
  } else {
    x = '/secretary';
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      startDate: Yup.string().required('Required'),
      endDate: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('val ', values);

      const sendData = {
        name: values.name,
        start_date: values.startDate,
        end_date: values.endDate,
      };

      axios
        .post('/api/holiday', sendData)
        .then((res) => {
          console.log(res.data);
          setNotification('Holiday added successfully');
          setVariant('success');
          setTimeout(() => {
            setNotification('');
            setVariant('');
          }, 3000);
          navigate(`${x}/holidays`);
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
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='name'>Holiday name</label>
      <input
        id='name'
        name='name'
        type='text'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor='startDate'>Start Date</label>
      <input
        id='startDate'
        name='startDate'
        type='date'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.startDate}
      />
      {formik.touched.startDate && formik.errors.startDate ? (
        <div>{formik.errors.startDate}</div>
      ) : null}

      <label htmlFor='endDate'> End Date </label>
      <input
        id='endDate'
        name='endDate'
        type='date'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.endDate}
      />
      {formik.touched.endDate && formik.errors.endDate ? (
        <div>{formik.errors.endDate}</div>
      ) : null}

      <button type='submit'>Submit</button>
    </form>
  );
};
export default AddHoliday;
