import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import { Ellipsis } from 'react-awesome-spinners'
import { useEffect } from 'react';

export default function EditCourse() {
  const {user,setNotification,setVariant} = UseStateContext()
  let x = ""
  const navigate = useNavigate();
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

    const {id} = useParams();
    useEffect(() => {
        axios.get(`/api/cours/${id}`).then((res) => {
            console.log(res.data);
            formik.setValues({
            course_name: res.data.data.title,
            duration: res.data.data.duration,
            description: res.data.data.description,
            price: Math.round(res.data.data.price),
        });
        });
        
    }, []);

  const formik = useFormik({
    initialValues: {
        course_name: '',
        duration: '',
        description: '',
        price: '',
    },
    validationSchema: Yup.object({
      course_name: Yup.string().required('Course Name is required'),
      duration: Yup.string().required('Duration is required'),
      description: Yup.string(),
      price: Yup.number().required('Price is required'),
    }),
    onSubmit: (values) => {
      const data = {
        title: values.course_name,
        duration: values.duration,
        description: values.description,
        price: values.price,
      };
      axios.put(`/api/cours/${id}`, data).then((res) => {
        setNotification('Cours has been edited successfully');
                setVariant('warning');
                setTimeout(() => {
                    setNotification('');
                    setVariant('');
                }, 3000);
      navigate(`${x}/course`);
      });
      
    },
  });


  return (
    <div className='row'>
      <form onSubmit={formik.handleSubmit} className='addCourse'>
        <h1>Edit Course</h1>


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
            type='text'
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
            Description
          </label>
          <input
            type='text'
            id='subject_name'
            className={`form-control ${formik.errors.description ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description && (
            <div className='invalid-feedback'>{formik.errors.description}</div>
          )}
        </div>
        <div className='mb-3 col-4'>
          <label htmlFor='price' className='form-label'>
            Price*
          </label>
          <input

            type='number'
            id='price'
            className={`form-control ${formik.errors.price ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('price')}
          />
          {formik.touched.price && formik.errors.price && (
            <div className='invalid-feedback'>{formik.errors.price}</div>
          )}
        </div>

        <button type='submit' className='btn btn-primary'>
          Edit
        </button>
        </form>
        </div>
        )}





