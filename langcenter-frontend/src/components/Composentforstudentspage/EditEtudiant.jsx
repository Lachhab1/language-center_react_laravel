import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import axios from '../../api/axios';
import {useNavigate} from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';

export default function EditEtudiant() {
    const navigate = useNavigate();
    const {id} = useParams();
  const {user,setNotification,setVariant} = UseStateContext();
  let x = ""
  if (user && user.role==='admin')
  {
    x = ""
  } else if (user && user.role==='director')
  {
    x="/director"
  }else {
    x="/secretary"
  }
  const [classData, setClassData] = useState([]);
    // Fetch available courses and levels from the database
  // Replace this with your actual API call to fetch data
  useEffect(() => {
    axios.get('/api/classes').then((res) => {
      setClassData(res.data);
    });

  }, []);
  const formik = useFormik({
        initialValues:{
        firstName: ``,
        lastName: ``,
        class: ``,
        gender: ``,
        adress: ``,
        dateofBirth: ``,
        active: false,
        email: ``,
        phone: ``,
        underAge: '',
      },
    validationSchema: yup.object().shape({
    firstName: yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('required'),
    lastName: yup.string()
    .min(3, "Too short")
    .max(50, 'Too Long!')
    .required('required'),
      gender: yup.string().oneOf(['female','male']).required('required'),
      adress: yup.string().required('required'),
      dateofBirth: yup.date().required('required'),
      email: yup.string().email('Invalid email').required("required"),
      phone: yup.string().min(9,'to short to be a valid phone number').required('required'),
  }),
  onSubmit: (values) => {
    console.log("wewe are here");

}
});
  const [underAge,setUnderAge] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    let response = [];
        const etudiantData = {
      prenom: formik.values.firstName,
      nom: formik.values.lastName,
      date_naissance: formik.values.dateofBirth,
      sexe: formik.values.gender,
      email: formik.values.email,
      telephone: formik.values.phone,
      adresse: formik.values.adress,
      underAge: false,
    }
    try{

      response = await axios.put(`/api/etudiants/${id}`,etudiantData);
    } catch (error) {
      console.log(error);
    }
    setNotification("Student updated successfully");
    setVariant("success");
    setTimeout(() => {
      setNotification("");
      setVariant("");
    }, 3000);
    navigate(`${x}/student`);
  }
  useEffect(() => {
    axios.get(`/api/etudiants/${id}`).then((res) => {
      formik.setValues(
        {
          firstName: res.data.data.prenom,
          lastName: res.data.data.nom,
          dateofBirth: res.data.data.date_naissance,
          gender: res.data.data.sexe,
          email: res.data.data.email,
          phone: res.data.data.telephone,
          adress: res.data.data.adresse,
        }
      )
    });
  }, []);
  return (
    <div className="student-add">
        <Form noValidate onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <h3>Student</h3>
              <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1032"
              className='position-relative'
              >
              <Form.Label>First name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="first name"
                {...formik.getFieldProps('firstName')}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.firstName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label>Last name *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="last name"
                {...formik.getFieldProps('lastName')}
                isInvalid={formik.touched.lastName && formik.errors.lastName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.lastName}</Form.Control.Feedback>
            </Form.Group>
            
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Gender*</Form.Label>
              <Form.Select
              component="select"
              id="gender"
              name="gender"
              {...formik.getFieldProps('gender')}
              isInvalid={formik.touched.gender && formik.errors.gender}
              >
              <option value=''>Chose Gender</option>
              <option value='female'>female</option>
              <option value='male'>male</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.gender}</Form.Control.Feedback>
              </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>adress</Form.Label>
            <Form.Control
            type="text"
            placeholder="adress"
            name="adress"
            {...formik.getFieldProps('adress')}
            isInvalid={formik.touched.adress && formik.errors.adress}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.adress}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12"
              className="position-relative">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
            type="date"
            name="dateofbirth"
            {...formik.getFieldProps('dateofBirth')}
            isInvalid={formik.touched.dateofBirth && formik.errors.dateofBirth}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.dateofBirth}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="email"
            name="email"
            {...formik.getFieldProps('email')}
            isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.email}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>Phone</Form.Label>
            <Form.Control
            type="tel"
            placeholder="+(212) . . . . . . ."
            name="phone"
            {...formik.getFieldProps('phone')}
            isInvalid={formik.touched.phone && formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.phone}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="position-relative my-3">
            <Form.Check
              required
              name="adult"
              label="Under Age"
              onChange={formik.handleChange}
              feedback={formik.errors.adult}
              isInvalid={!!(formik.errors.adult)}
              feedbackType="invalid"
              id="validationFormik106"
              feedbackTooltip
              onClick={()=>setUnderAge((prev) => !prev)}
            />
          </Form.Group>
            </Row>
          {(underAge) ? 
          <Row className='mb-3'>
            <h3>Parents</h3>
              <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1032"
              className='position-relative'
              >
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="guardfName"
                placeholder="first name"
                {...formik.getFieldProps('guardfName')}
                isInvalid={formik.touched.guardfName && formik.errors.guardfName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.guardfName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="guardLName"
                placeholder="last name"
                {...formik.getFieldProps('guardLName')}
                isInvalid={formik.touched.guardLName && formik.errors.guardLName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.guardLName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>Occupation</Form.Label>
            <Form.Control
            type="text"
            placeholder="occupation"
            name="guardOcup"
            {...formik.getFieldProps('guardOcup')}
            isInvalid={formik.touched.guardOcup && formik.errors.guardOcup}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardOcup}
            </Form.Control.Feedback>

            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="email"
            name="guardemail"
            {...formik.getFieldProps('guardEmail')}
            isInvalid={formik.touched.guardEmail && formik.errors.guardEmail}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardEmail}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>Phone</Form.Label>
            <Form.Control
            type="tel"
            placeholder="+(212) . . . . . . . . ."
            name="guardphone"
            {...formik.getFieldProps('guardPhone')}
            isInvalid={formik.touched.guardPhone && formik.errors.guardPhone}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardPhone}
            </Form.Control.Feedback>
            </Form.Group>
          </Row>
          
        :
        <>

        </>
        }
        <Button type="submit" onClick={()=>console.log("hi")}>Submit form</Button>
        </Form>
    </div>
  )
}
