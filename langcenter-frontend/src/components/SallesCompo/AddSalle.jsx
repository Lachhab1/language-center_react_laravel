import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const addSalleScheme = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
  capacity: Yup.number()
  .integer("must be an Integer")
    .required('Required'),
});

export default function AddSalle() {
  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://example.com/api/salles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // La requête a réussi, vous pouvez effectuer des actions supplémentaires ici
        console.log('Données enregistrées avec succès');
      } else {
        // La requête a échoué, gérer les erreurs ici
        console.log('Erreur lors de l\'enregistrement des données');
      }
    } catch (error) {
      console.log('Erreur lors de la communication avec le serveur', error);
    }
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
          <div className='form-group'>
            <label htmlFor='name'>Name*</label>
            <Field
              type='text'
              name='name'
              className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
              placeholder='Entrez le nom de la salle' // Placeholder avec commentaire
            />
            {errors.name && touched.name && <div className='invalid-feedback'>{errors.name}</div>}
          </div>

          <div className='form-group'>
            <label htmlFor='capacity'>Capacity*</label>
            <Field
              type='number'
              name='capacity'
              className={`form-control ${errors.capacity && touched.capacity ? 'is-invalid' : ''}`}
              placeholder='Entrez la capacité de la salle' // Placeholder avec commentaire
            />
            {errors.capacity && touched.capacity && (
              <div className='invalid-feedback'>{errors.capacity}</div>
            )}
          </div>

          <button type='submit' className='btn btn-danger mt-2'>
            Add Classroom
          </button>
        </Form>
      )}
    </Formik>
  );
}
