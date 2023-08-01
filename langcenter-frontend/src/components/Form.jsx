import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import axios from '../api/axios';
import {useNavigate} from 'react-router-dom';
import { UseStateContext } from '../context/ContextProvider';
function FormC() {
  const navigate = useNavigate();
  const [testPrice, setTestPrice] = useState(0);
  const [tests, setTests] = useState([]);
  const {user,setNotification,setVariant} = UseStateContext();
  const [underAge,setUnderAge] = useState(false);
  const [total,setTotal] = useState(0);
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
    // Fetch available classes and levels from the database
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
        address: ``,
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
        discount: ``,
        customDiscount: ``,
        insurrance: false,
        course: false,
        testLevel: false,
        file: '',
        test: ``,
        testFees: 0,
        testFeesPaid: 0,
        testDate: ``,
        testTime: ``,
        testEndTime: ``,
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
      address: yup.string().required('required'),
      dateofBirth: yup.date().required('required'),
      adult: yup.boolean().oneOf[true,false],
      email: yup.string().email('Invalid email'),
      phone: yup.string().min(9,'to short to be a valid phone number'),
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
      negotiatedPrice: yup.number().required('required').nonNullable(),
      file: yup.mixed(),
      discount: yup.string(),
      customDiscount: yup.number().max(100).min(0),
      test: yup.string(),
      testFees: yup.number(),
      testFeesPaid: yup.number(),
      testDate: yup.date(),
      testTime: yup.string(),
      testEndTime: yup.string(),
    }),
  onSubmit: (values) => {
    console.log("wewe are here");
}
});
  // Find the course fees based on the class id
  const findCoursFees = (classId) => {
    const classFees = classData.find((c) => c.id == classId);
    if (classFees){
      return classFees.cours.price;
    }else {
      return 0;
    }
  }
  // request to create a new student
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
      adresse: formik.values.address,
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
      parent_adresse: formik.values.address,
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
        let inscriptionData = {
      etudiant_id: etudiantId,
      class_id: formik.values.class,
      negotiated_price: formik.values.negotiatedPrice,
    }
    if (formik.values.insurrance == true || formik.values.testLevel == true || formik.values.course == true){
    // if (formik.values.course === false){
    //   inscriptionData = {
    //   etudiant_id: etudiantId,
    //   negotiated_price: formik.values.negotiatedPrice,
    //   }
    // }
    if (formik.values.course === true){
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
  }
    
    if (formik.values.testLevel === true){
      debugger;
      let responseTestData = {
        test_id: formik.values.test,
        student_id: etudiantId,
        date: formik.values.testDate,
        start_time: formik.values.testTime,
        end_time: formik.values.testEndTime,
        status: "pending"
      };
      let responseTest = [];
      try {
        responseTest = await axios.post('/api/register',responseTestData);
        console.log(responseTest);
      } catch (error) {
        console.log(error);
      }
      let registerId = responseTest.data.id;
      const paymentData = {
        amount : formik.values.testFeesPaid,
        register_id: registerId,
        payment_method: "cash",
    }
    let responseTestPayment = [];
    try{
      responseTestPayment = await axios.post('/api/testPayment',paymentData);
      console.log(responseTestPayment);
    } catch (error) {
      console.log(error);
    }
  }
  }
    setNotification("Student added successfully");
    setVariant("success");
    setTimeout(() => {
      setNotification("");
      setVariant("");
    }, 7000);
    navigate(`${x}/student`);
  }
  //function to get test price
  useEffect(() => {
    tests.map(
      (test) => {
        if (test.id == formik.values.test){
          setTestPrice(+test.price);
        }
      }
    )
  },[formik.values.test]);
  // calculate the total fees
  useEffect(() => {
  const getTotals = () => {
    let total = 0;
    if (formik.values.insurrance){
      total += 200;
    }
    if (formik.values.course){
      total += +findCoursFees(formik.values.class);
    }
    if (formik.values.testLevel === true){
      total += testPrice;
    }
    return total;
  }
  setTotal(getTotals());
  },[formik.values.insurrance,formik.values.course,formik.values.testLevel,formik.values.class,testPrice]);
  useEffect(() => {
    let res = 0;
    if (formik.values.discount === 'custom'){
      res = formik.values.customDiscount;
    } else {
      res = formik.values.discount;
    }
    formik.setFieldValue('negotiatedPrice',Math.round(+total - res * total / 100,2) || 0);
  },[total,formik.values.discount,formik.values.customDiscount]);

  useEffect (() => {
    let negotiatedPrice = formik.values.negotiatedPrice;
    let res = (+total - +negotiatedPrice)/(+total) * 100;
    switch (res) {
      case 10:
      case 20:
      case 30:
          formik.setFieldValue('discount',+res);
        break;
      default:
          formik.setFieldValue('discount','custom');
          formik.setFieldValue('customDiscount',+res);
        break;
    }
  },[formik.values.negotiatedPrice])
  useEffect(() =>{
    const getTests = async () => {
      const res = await axios.get('/api/tests');
      setTests(res.data.data);
      console.log(res.data.data);
    }
      try{
        getTests();
      } catch (error) {
        console.log(error);
      }
  },[]);
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
              <Form.Label>First name <span className='text-danger'>*</span></Form.Label>
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
              <Form.Label>Last name <span className='text-danger'>*</span></Form.Label>
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
              <Form.Label>Gender<span className='text-danger'>*</span></Form.Label>
              <Form.Select
              component="select"
              id="gender"
              name="gender"
              {...formik.getFieldProps('gender')}
              isInvalid={formik.touched.gender && formik.errors.gender}
              >
              <option value=''>choose Gender</option>
              <option value='female'>female</option>
              <option value='male'>male</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.gender}</Form.Control.Feedback>
              </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12"
              className="position-relative">
            <Form.Label>Date of Birth<span className='text-danger'>*</span></Form.Label>
            <Form.Control
            type="date"
            name="dateofbirth"
            {...formik.getFieldProps('dateofBirth')}
            isInvalid={formik.touched.dateofBirth && formik.errors.dateofBirth}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const currentDate = new Date();
              const ageDifferenceInMilliseconds = currentDate - selectedDate;
              const ageDifferenceInYears = ageDifferenceInMilliseconds / (1000 * 3600 * 24 * 365);
              setUnderAge(ageDifferenceInYears < 18);
              formik.setFieldValue('dateofBirth', e.target.value);
            }}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.dateofBirth}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" sm="6" xs="12" 
              className="position-relative">
            <Form.Label>address<span className='text-danger'>*</span></Form.Label>
            <Form.Control
            type="text"
            placeholder="address"
            name="address"
            {...formik.getFieldProps('address')}
            isInvalid={formik.touched.address && formik.errors.address}
            />
            <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.address}
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
              <Form.Label>First name<span className='text-danger'>*</span></Form.Label>
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
              <Form.Label>Last name<span className='text-danger'>*</span></Form.Label>
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
                <Form.Label>Cin<span className='text-danger'>*</span></Form.Label>
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
                  <Form.Label>Gender<span className='text-danger'>*</span></Form.Label>
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
          </Row>
        :
        <>
        </>
        
        }
        <Row className='mb-3'>
        <Form.Group
              as={Col}
              className="position-relative col-11 my-3"
              >
              <Form.Label className='h3' >Payment options</Form.Label>
              <div className='d-flex'>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Test"
              {...formik.getFieldProps('testLevel')}
              className={`me-3 fs-4 ${formik.values.testLevel === true ? "text-warning" : ''}`}
              />
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Insurance"
              {...formik.getFieldProps('insurrance')}
              className={`me-3 fs-4 ${formik.values.insurrance === true ? "text-success" : ''}`}
              />
            
              <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Course"
              {...formik.getFieldProps('course')}
              className={`me-3 fs-4 ${formik.values.course === true ? "text-info" : ''}`}
              />
              </div>
              </Form.Group>
            {
              formik.values.testLevel === true ?
              <>
              <h3>Test Level</h3>
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Test Name<span className='text-danger'>*</span></Form.Label>
              <Form.Select
              component="select"
              id="test"
              name="test"
              {...formik.getFieldProps('test')}
              isInvalid={formik.touched.test && formik.errors.test}
              >
              <option value=''>choose Test</option>
                {tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.test}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Test Fees</Form.Label>
              <Form.Control
              type="number"
              placeholder="test fees"
              name="testfees"
              value={testPrice}
              disabled
              isInvalid={formik.touched.testFees && formik.errors.testFees}
              />
              <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.testFees}
              </Form.Control.Feedback>
              </Form.Group>
              {/* add test date */}
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Test Date</Form.Label>
              <Form.Control
              type="date"
              placeholder="test date"
              name="testdate"
              {...formik.getFieldProps('testDate')}
              isInvalid={formik.touched.testDate && formik.errors.testDate}
              />
              <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.testDate}
              </Form.Control.Feedback>
              </Form.Group>
              {/* add test time */}
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Start Time</Form.Label>
              <Form.Control
              type="time"
              placeholder="test time"
              name="testtime"
              {...formik.getFieldProps('testTime')}
                  
              isInvalid={formik.touched.testTime && formik.errors.testTime}
              />
              <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.testTime}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>End Time</Form.Label>
              <Form.Control
              type="time"
              placeholder="End time"
              name="endtime"
              {...formik.getFieldProps('testEndTime')}
                  
              isInvalid={formik.touched.testEndTime && formik.errors.testEndTime}
              />
              <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.testEndTime}
              </Form.Control.Feedback>
              </Form.Group>
              </>
              :
              <>
              </>
            }
            {
                formik.values.testLevel === true ?
                <>
                <Row>
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
                name="testfeespaid"
                placeholder="Test fees paid"
                {...formik.getFieldProps('testFeesPaid')}
                isInvalid={formik.touched.testFeesPaid && formik.errors.testFeesPaid}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.testFeesPaid}</Form.Control.Feedback>
          </Form.Group>
        </Row>
                </>
                :
                <>
                </>
              }
            {
              formik.values.course === true ?
              <>
                <h3>Course</h3>
        <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Class Name<span className='text-danger'>*</span></Form.Label>
              <Form.Select
              component="select"
              id="class"
              name="class"
              {...formik.getFieldProps('class')}
              isInvalid={formik.touched.class && formik.errors.class}
              >
              <option value=''>choose Class</option>
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
              disabled
              />
                </Form.Group>
              </>
              :
              <>
              </>
            }
              </Row>
              {
                formik.values.course === true ?
                <>
                      <Row>
  <Form.Group as={Col} md="3" sm="6" xs="12" controlId="validationFormik1" className='position-relative'>
  <Form.Label>Discount</Form.Label>
  <InputGroup>
    <Form.Select
      name="discount"
      {...formik.getFieldProps('discount')}
      isInvalid={formik.touched.discount && formik.errors.discount}
    >
      <option value="">Select Discount</option>
      <option value="10">10%</option>
      <option value="20">20%</option>
      <option value="30">30%</option>
      <option value="custom">Custom</option>
    </Form.Select>
    {formik.values.discount === 'custom' && (
      <Form.Control
        type="number"
        name="customDiscount"
        placeholder="Enter custom discount"
        {...formik.getFieldProps('customDiscount')}
        isInvalid={formik.touched.customDiscount && formik.errors.customDiscount}
      />
      )}
      <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
    <Form.Control.Feedback className='' type="invalid" tooltip>
      {formik.values.discount === 'custom' ? formik.errors.customDiscount : formik.errors.discount}
    </Form.Control.Feedback>
  </InputGroup>
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
        </Row>
                </>
                : 
                <>
                </>
              }
            <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                name="total"
                placeholder="total"
                value={total * (1-((formik.values.discount == 'custom' ? formik.values.customDiscount : formik.values.discount) /100)) || total}
                disabled
                />
          </Form.Group>
        <Row className='mb-3'>
        </Row>
          <Button type="submit" onClick={()=>console.log("hi")}>Submit form</Button>
        </Form>
  );
}
export default FormC;