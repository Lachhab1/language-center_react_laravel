import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Form,InputGroup} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';

function FormC() {
  const formik = useFormik({
        initialValues:{
        firstName: '',
        lastName: '',
        class: '',
        gender: '',
        adress: '',
        dateofBirth: '',
        active: false,
        adult: true,
        email: '',
        phone: '',
        guardfName: '',
        guardLName: '',
        guardOcup: '',
        guardEmail: '',
        guardPhone: '',
        courseName: '',
        courseFeesPaid: ''
        // file: null,
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
    class: yup.string().oneOf(
      ['1', '2', '3'],
      'Invalid class').required("required"),
      gender: yup.string().oneOf(['female','male']).required('required'),
      adress: yup.string().required('required'),
      dateofBirth: yup.date().required('required'),
      adult: yup.boolean().oneOf[true],
      email: yup.string().email('Invalid email').required("required"),
      phone: yup.string().min(9,'to short to be a valid phone number').required('required'),
      guardfName: yup.string(),
      guardLName: yup.string(),
      guardOcup: yup.string(),
      guardEmail: yup.string().email('invalid Email'),
      guardPhone: yup.string().min(9,'to short to be a valid phone number'),
      courseName: yup.string().oneOf(['english','talks']).required('required'),
      courseFeesPaid: yup.number().required('required'),
      // file: yup.mixed(),
  }),
  onSubmit: values => {console.log(values)},
});

  return (
        <Form className='' noValidate onSubmit={formik.handleSubmit}>
          <Row className='mb-3'>
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
              <Form.Label>Class*</Form.Label>
              <Form.Select
              component="select"
              id="class"
              name="class"
              {...formik.getFieldProps('class')}
              isInvalid={formik.touched.class && formik.errors.class}
              >
              <option value=''>Chose Class</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option  value='3'>3</option>
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
            />
          </Form.Group>
            </Row>
          {(formik.values.adult) ? 
          <Row className='mb-3'>
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
            placeholder="+(212) . . . . . . ."
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
        <Row className='mb-3'>
        <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Course Name*</Form.Label>
              <Form.Select
              component="select"
              id="courseName"
              name="courseName"
              {...formik.getFieldProps('courseName')}
              isInvalid={formik.touched.courseName && formik.errors.courseName}
              >
              <option value=''>Choose Course</option>
              <option value='english'>english</option>
              <option value='talks'>Talks</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.courseName}</Form.Control.Feedback>
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
              {...formik.getFieldProps('guardOcup')}
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
        </Row>
          <Button type="submit">Submit form</Button>
        </Form>
  );
}

export default FormC;