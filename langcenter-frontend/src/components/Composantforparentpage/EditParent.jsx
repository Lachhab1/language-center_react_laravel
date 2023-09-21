import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import axios from '../../api/axios';
import { useParams,useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';

function EditParent() {
  const { id } = useParams();
  const { user,setNotification,setVariant } = UseStateContext();
  const navigate = useNavigate();
  let x = "";
  if (user && user.role === 'admin') {
    x = "";
  } else if (user && user.role === 'director') {
    x = "/director";
  }
  else {
    x = "/secretary";
  }

    
  const formik = useFormik({
    initialValues: {
      guardfName: '',
      guardLName: '',
      guardEmail: '',
      guardPhone: '',
      guardCIN: '',
      guardGender: '',
      guardBirthday: '',
      guardAddress: '',
    },
    validationSchema: yup.object().shape({
      guardfName: yup.string().required('First name is required'),
      guardLName: yup.string().required('Last name is required'),
      guardEmail: yup.string().email('Invalid Email').required('Email is required'),
      guardPhone: yup.string().min(9, 'Phone number must be at least 9 characters').required('Phone number is required'),
      guardCIN: yup.string().required('CIN is required'),
      guardGender: yup.string().required('Gender is required'),
      guardBirthday: yup.date().required('Birthday is required'),
      guardAddress: yup.string().required('Address is required'),
    }),
    onSubmit: values => {
      const sendParent = {
        nom: values.guardfName,
        prenom: values.guardLName,
        email: values.guardEmail,
        telephone: values.guardPhone,
        cin: values.guardCIN,
        sexe: values.guardGender,
        date_naissance: values.guardBirthday,
        adresse: values.guardAddress,
      };
      axios.put(`/api/parents/${id}`, sendParent).then((response) => {
      }
      ).catch((error) => {
        formik.setErrors({ guardEmail: "Email already exists" ,guardPhone:"Phone number already exists",guardCIN:"CIN already exists"});
      }
      );
      setNotification("Parent updated successfully");
      setVariant("warning");
      setTimeout(() => {
        setNotification("");
        setVariant("");
        navigate(`${x}/parent`); 
      }, 3000);

    }
  });
  useEffect(() => {
      axios.get(`/api/parents/${id}`).then((response) => {
      formik.setValues({
        guardfName: response.data.data.nom,
        guardLName: response.data.data.prenom,
        guardEmail: response.data.data.email,
        guardPhone: response.data.data.telephone,
        guardCIN: response.data.data.cin,
        guardGender: response.data.data.sexe,
        guardBirthday: response.data.data.date_naissance,
        guardAddress: response.data.data.adresse,
      });
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className='mb-3'>
        <h3>Parents</h3>
        <Form.Group as={Col} md="3" sm="6" xs="12" controlId="validationFormik1032" className='position-relative'>
          <Form.Label>First name <span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="text"
            name="guardfName"
            placeholder="First name"
            {...formik.getFieldProps('guardfName')}
            isInvalid={formik.touched.guardfName && formik.errors.guardfName}
          />
          <Form.Control.Feedback className='' type="invalid" tooltip>
            {formik.errors.guardfName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" controlId="validationFormik1" className='position-relative'>
          <Form.Label>Last name<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="text"
            name="guardLName"
            placeholder="Last name"
            {...formik.getFieldProps('guardLName')}
            isInvalid={formik.touched.guardLName && formik.errors.guardLName}
          />
          <Form.Control.Feedback className='' type="invalid" tooltip>
            {formik.errors.guardLName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Email<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="guardEmail"
            {...formik.getFieldProps('guardEmail')}
            isInvalid={formik.touched.guardEmail && formik.errors.guardEmail}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardEmail}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Phone<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone"
            name="guardPhone"
            {...formik.getFieldProps('guardPhone')}
            isInvalid={formik.touched.guardPhone && formik.errors.guardPhone}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardPhone}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>CIN<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="CIN"
            name="guardCIN"
            {...formik.getFieldProps('guardCIN')}
            isInvalid={formik.touched.guardCIN && formik.errors.guardCIN}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardCIN}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Gender<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            as="select"
            name="guardGender"
            {...formik.getFieldProps('guardGender')}
            isInvalid={formik.touched.guardGender && formik.errors.guardGender}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardGender}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Birthday<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="date"
            name="guardBirthday"
            {...formik.getFieldProps('guardBirthday')}
            isInvalid={formik.touched.guardBirthday && formik.errors.guardBirthday}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardBirthday}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>address <span className='text-danger'>*</span></Form.Label>
          <Form.Control

            type="text"
            name="guardAddress"
            placeholder="address"
            {...formik.getFieldProps('guardAddress')}
            isInvalid={formik.touched.guardAddress && formik.errors.guardAddress}
          />
          <Form.Control.Feedback className='' type="invalid" tooltip>
            {formik.errors.guardAddress}
          </Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Button type="submit">Modify</Button>
    </Form>
  );
}

export default EditParent;
