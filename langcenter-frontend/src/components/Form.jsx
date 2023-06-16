import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import axios from '../api/axios';
import {useNavigate} from 'react-router-dom';
import { UseStateContext } from '../context/ContextProvider';

function FormC() {
  const navigate = useNavigate();
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
        adult: ``,
        email: ``,
        phone: ``,
        guardfName:``,
        guardLName: ``,
        guardGender: ``,
        guardCin: ``,
        guardEmail: ``,
        guardPhone: ``,
        guardBirthDate: ``,
        guardAddress: ``,
        courseName: ``,
        courseFeesPaid: ``,
        negotiatedPrice: ``,
        file: '',
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
    class: yup.string().required("required"),
      gender: yup.string().oneOf(['female','male']).required('required'),
      adress: yup.string().required('required'),
      dateofBirth: yup.date().required('required'),
      adult: yup.boolean().oneOf[true,false],
      email: yup.string().email('Invalid email').required("required"),
      phone: yup.string().min(9,'to short to be a valid phone number').required('required'),
      guardfName: yup.string(),
      guardLName: yup.string(),
      guardCin: yup.string().min(2,'to short to be a valid CIN').max(8,'to long to be a valid CIN'),
      guardEmail: yup.string().email('invalid Email'),
      guardPhone: yup.string().min(9,'to short to be a valid phone number'),
      guardGender: yup.string(),
      guardBirthDate: yup.date(),
      guardAddress: yup.string(),
      courseName: yup.string().oneOf(['english','talks']).required('required'),
      courseFeesPaid: yup.number().required('required'),
      negotiatedPrice: yup.number().required('required'),
      file: yup.mixed(),
  }),
  onSubmit: (values) => {
    console.log("wewe are here");

}
});
  const [underAge,setUnderAge] = useState(false);
  const findCoursFees = (classId) => {
    const classFees = classData.find((c) => c.id == classId);
    if (classFees){

      return classFees.cours.price;
    }else {
      return 0;
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    let response = [];
    let response2 = [];
    let response3 = [];
    console.log(formik.values);
        let adultData = {
      prenom: formik.values.firstName,
      nom: formik.values.lastName,
      date_naissance: formik.values.dateofBirth,
      sexe: formik.values.gender,
      email: formik.values.email,
      telephone: formik.values.phone,
      adresse: formik.values.adress,
      adulte: formik.values.adult,
      underAge: false,
    } 
    let etudiantData = adultData;
    if (underAge === true){
       etudiantData = {
      ...adultData,
      parent_prenom: formik.values.guardfName,
      parent_nom: formik.values.guardLName,
      parent_email: formik.values.guardEmail,
      parent_telephone:formik.values.guardPhone,
      parent_cin: formik.values.guardCin,
      parent_sexe :formik.values.guardGender,
      parent_adresse: formik.values.adress,
      parent_date_naissance:formik.values.guardBirthDate,
      underAge:true,
      }
      
    }
    try{
      response = await axios.post('/api/etudiants',etudiantData);
    } catch (error) {
      console.log(error);
      formik.setErrors({...error.response.data.errors,phone: error.response.data.errors.telephone,guardPhone: error.response.data.errors.parent_telephone,guardCin: error.response.data.errors.parent_cin,guardEmail: error.response.data.errors.parent_email});
    }
    console.log(response.data.data.id);
    const etudiantId = response.data.data.id;
    const inscriptionData = {
      etudiant_id: etudiantId,
      class_id: formik.values.class,
      negotiated_price: formik.values.negotiatedPrice,
  }
    try{

      response2 = await axios.post('/api/inscrire-classes',inscriptionData);
      console.log(response2);
    }catch (error) {
      console.log(error);
    }
    
    const inscriptionId = response2.data.id;
    const paymentData = {
     payment_amount: formik.values.courseFeesPaid,
    }
    try{

      response3 = await axios.post(`/api/inscrires/${inscriptionId}/register-payment`,paymentData);
    } catch (error) {
      console.log(error);
    }
    console.log(response3);
    setNotification("Student added successfully");
    setVariant("success");
    setTimeout(() => {
      setNotification("");
      setVariant("");
    }, 3000);
    navigate(`${x}/student`);
  }
  return (
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
            <Form.Group as={Col} md="3" sm="6" xs="12"
              className="position-relative">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type="text"
            placeholder="address"
            name="guardaddress"
            {...formik.getFieldProps('guardAddress')}
            isInvalid={formik.touched.guardAddress && formik.errors.guardAddress}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardAddress}
            </Form.Control.Feedback>

                
                </Form.Group>
                <Form.Group as={Col} md="3" sm="6" xs="12"
              className="position-relative">
                <Form.Label>cin*</Form.Label>
                <Form.Control
                type="text"
                placeholder="cin"
                name="guardcin"
                {...formik.getFieldProps('guardCin')}
                isInvalid={formik.touched.guardCin && formik.errors.guardCin}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.guardCin}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" sm="6" xs="12"
                className="position-relative">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                type="date"
                placeholder="date of birth"
                name="guarddob"
                {...formik.getFieldProps('guardBirthDate')}
                isInvalid={formik.touched.guardBirthDate && formik.errors.guardBirthDate}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.guardBirthDate}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" sm="6" xs="12"
                className="position-relative">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                  component="select"
                  id="guardGender"
                  name="guardGender"
                  {...formik.getFieldProps('guardGender')}
                  isInvalid={formik.touched.guardGender && formik.errors.guardGender}
                  >
                    <option value=''>Choose Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.guardGender}
                  </Form.Control.Feedback>
                </Form.Group>

          </Row>
          
        :
        <>

        </>
        
        }
        <Row className='mb-3'>
          <h3>Course</h3>
        <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Class Name*</Form.Label>
              <Form.Select
              component="select"
              id="class"
              name="class"
              {...formik.getFieldProps('class')}
              isInvalid={formik.touched.class && formik.errors.class}
              >
              <option value=''>Chose Class</option>
                {classData.map((classe) => (
                  <option key={classe.id} value={classe.id}>
                    {classe.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.class}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Course Fees</Form.Label>
              <Form.Control
              type="text"
              name="courseFees"
              value={findCoursFees(formik.values.class)}
              readOnly
              />
                </Form.Group>
                <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label>Fees Paid</Form.Label>
              <Form.Control
                type="text"
                name="courseFeesPaid"
                placeholder="courseFeesPaid"
                {...formik.getFieldProps('courseFeesPaid')}
                isInvalid={formik.touched.courseFeesPaid && formik.errors.courseFeesPaid}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.courseFeesPaid}</Form.Control.Feedback>
          </Form.Group>
           <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Negotiated Price</Form.Label>
              <Form.Control
              type="text"
              name="negotiatedPrice"
              placeholder="negotiated Price Paid"
                {...formik.getFieldProps('negotiatedPrice')}
                isInvalid={formik.touched.negotiatedPrice && formik.errors.negotiatedPrice}
              />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.negotiatedPrice}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group
             as={Col}
              md="3"
              sm="6"
              xs="12"
            className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
            className=''
              type="file"
              required
              name="file"
              onChange={formik.handleChange}
              isInvalid={!!(formik.errors.file)}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.file}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
          <Button type="submit" onClick={()=>console.log("hi")}>Submit form</Button>
        </Form>
  );
}

export default FormC;