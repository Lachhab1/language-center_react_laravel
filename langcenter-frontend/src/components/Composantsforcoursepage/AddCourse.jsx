import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddCourse() {
  const formik = useFormik({
    initialValues: {
        course_code: '',
      course_name: '',
      duration: '',
      subject_name: '',
      teacher: '',
    },
    validationSchema: Yup.object({
      course_code: Yup.string().required('Course code is required'),
      course_name: Yup.string().required('Course Name is required'),
      duration: Yup.number().required('Duration is required'),
      subject_name: Yup.string().required('Subject Name is required'),
      teacher: Yup.string().required('Teacher is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission and add course
      console.log(values);
    },
  });

  return (
    <div className='row'>
      <form onSubmit={formik.handleSubmit} className='addCourse'>
        <h1>Add Course</h1>

        <div className='mb-3 col-4'>
          <label htmlFor='course_code' className='form-label'>
            Course code*
          </label>
          <input
            type='text'
            id='course_code'
            className={`form-control ${formik.errors.course_code ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('course_code')}
          />
          {formik.touched.course_code && formik.errors.course_code && (
            <div className='invalid-feedback'>{formik.errors.course_code}</div>
          )}
        </div>

        <div className='mb-3 col-4'>
          <label htmlFor='course_name' className='form-label'>
            Course Name*
          </label>
          <input
            type='text'
            id='course_name'
            className={`form-control ${formik.errors.course_name ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('course_name')}
          />
          {formik.touched.course_name && formik.errors.course_name && (
            <div className='invalid-feedback'>{formik.errors.course_name}</div>
          )}
        </div>

        <div className='mb-3 col-4'>
          <label htmlFor='duration' className='form-label'>
            Duration*
          </label>
          <input
            type='number'
            id='duration'
            className={`form-control ${formik.errors.duration ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('duration')}
          />
          {formik.touched.duration && formik.errors.duration && (
            <div className='invalid-feedback'>{formik.errors.duration}</div>
          )}
        </div>

        <div className='mb-3 col-4'>
          <label htmlFor='subject_name' className='form-label'>
            Subject Name*
          </label>
          <input
            type='text'
            id='subject_name'
            className={`form-control ${formik.errors.subject_name ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('subject_name')}
          />
          {formik.touched.subject_name && formik.errors.subject_name && (
            <div className='invalid-feedback'>{formik.errors.subject_name}</div>
          )}
        </div>

        <div className='mb-3 col-4'>
          <label htmlFor='teacher' className='form-label'>
            Teacher*
          </label>
          <input
            type='text'
            id='teacher'
            className={`form-control ${formik.errors.teacher ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('teacher')}
          />
          {formik.touched.teacher && formik.errors.teacher && (
            <div className='invalid-feedback'>{formik.errors.teacher}</div>
          )}
        </div>

        <button type='submit' className='btn btn-primary'>
          Add
        </button>
        </form>
        </div>
        )}





