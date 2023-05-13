import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';



export default function AddNote()
{
    const formik = useFormik({
        initialValues: {
            nom_note: '',
          val_note: '',
          
        },
        validationSchema: Yup.object({
            nom_note: Yup.string().required('The subject of the note is required'),
            val_note: Yup.string().required('Note value is required'),
        }),
        onSubmit: (values) => {
            // Handle form submission and add course
            console.log(values);
          },
        });



    return (
        <div className='row'>
            <form onSubmit={formik.handleSubmit} className='addCourse'>
            <h1>Add Note</h1>
            <div className='mb-3 col-4'>
            <label htmlFor='nom_note' className='form-label'>
                Note*
            </label>
            <input
            type='text'
            id='nom_note'
            className={`form-control ${formik.errors.nom_note ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('nom_note')}
          />
          {formik.touched.nom_note && formik.errors.nom_note && (
            <div className='invalid-feedback'>{formik.errors.nom_note}</div>
          )}
            </div>
            <div className='mb-3 col-4'>
          <label htmlFor=' val_note' className='form-label'>
            Value*
          </label>
          <input
            type='number'
            id='val_note'
            className={`form-control ${formik.errors.val_note ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('val_note')}
          />
          {formik.touched.val_note && formik.errors.val_note && (
            <div className='invalid-feedback'>{formik.errors.val_note}</div>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Add
        </button>
            </form>
        </div>
    )
}