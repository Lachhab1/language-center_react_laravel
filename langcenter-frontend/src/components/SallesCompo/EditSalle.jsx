import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

const editSalleSchema = Yup.object().shape({
  name: Yup.string().max(50, 'Too Long!').required('Required'),
  capacity: Yup.number().integer('Must be an Integer').required('Required'),
});

export default function EditSalle() {
  const {id} = useParams();
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://example.com/api/salles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // The request was successful, perform additional actions here
        console.log('Data updated successfully');
      } else {
        // The request failed, handle errors here
        console.log('Error updating data');
      }
    } catch (error) {
      console.log('Error communicating with the server', error);
    }
  };

  useEffect(() => {
    // Fetch data from the database based on the provided id
    // Update the field values with the fetched data
    // Replace the random values below with the actual fetched data

    const fetchData = async () => {
      try {
        const response = await fetch(`http://example.com/api/salles/${id}`);
        if (response.ok) {
          const data = await response.json();

          // Set the field values with the fetched data
          setFieldValue('name', data.name);
          setFieldValue('capacity', data.capacity);
        } else {
          console.log('Error fetching data');
        }
      } catch (error) {
        console.log('Error communicating with the server', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Formik
      initialValues={{
        name: '', // Will be updated with fetched data
        capacity: '', // Will be updated with fetched data
      }}
      validationSchema={editSalleSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (

        <Form className='edit-salle-form'>
          <div className='row'>
            <div className='form-group col-lg-5'>
              <label htmlFor='name'>Name*</label>
              <Field
                style={{ backgroundColor: ' rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
                type='text'
                name='name'
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder='Entrez le nom de la salle'
              />
              {errors.name && touched.name && (
                <div className='invalid-feedback'>{errors.name}</div>
              )}
            </div>

            <div className='form-group col-lg-5 mt-3 mt-lg-0'>
              <label htmlFor='capacity'>Capacity*</label>
              <Field
                style={{ backgroundColor: ' rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
                type='number'
                name='capacity'
                className={`form-control ${errors.capacity && touched.capacity ? 'is-invalid' : ''}`}
                placeholder='Entrez la capacité de la salle'
              />
              {errors.capacity && touched.capacity && (
                <div className='invalid-feedback'>{errors.capacity}</div>
              )}
            </div>
          </div>


          <button type='submit' className='btn btn-danger mt-2'>
            Update Classroom
          </button>
        </Form>
      )}
    </Formik>
  );
}

