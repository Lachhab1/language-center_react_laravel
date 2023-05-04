import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {useFormik} from 'formik';
import * as yup from 'yup';

function FormC() {
  const formik = useFormik({
        initialValues:{
        firstName: '',
        // lastName: '',
        // location: [],
        // gender: '',
        // adress: '',
        // email: '',
        // phone: '',
        // zip: '',
        // dateofBirth: '',
        // file: null,
        // active: false,
        // guardfName: '',
        // guardLName: '',
        // guardOcup: '',
        // guardEmail: '',
        // guardPhone: '',
        // courseName: '',
        // courseFees: '',
        // courseFeesPaid: ''
      },
    validationSchema: yup.object().shape({
    firstName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    // lastName: yup.string()
    // .min(2, "Too short")
    // .max(50, 'Too Long!')
    // .required('Required'),
    // location: yup.string().oneOf(
    //   ['class1', 'class2', 'class3', 'other'],
    //   'Invalid class'
    // ).required("required")
    // .required('Required'),
    // file: yup.mixed(),
    // adult: yup.boolean.oneOf[false],
    // gender: yup.string.oneOf['female','male'].required('required'),
    // adress: yup.string().required('required'),
    // email: yup.string().email('Invalid email adree'),
    // state: yup.string(),
    // terms: yup.boolean().oneOf[true],
    // phone: yup.string().required('required'),
    // zip: yup.string().required('required'),
    // dateofBirth: yup.date().required('required'),
    // active: yup.boolean(),
    // guardfName: yup.string().required('required'),
    // guardLName: yup.string().required('required'),
    // guardOcup: yup.string().required('required'),
    // guardEmail: yup.email('invalid Email'),
    // guardPhone: yup.string().required('required'),
    // courseName: yup.string().required('required'),
    // courseFees: yup.number().required('required'),
    // courseFeesPaid: yup.number().required('required'),
  }),
  onSubmit: values => {console.log(values)},
});
const { Formik } = formik;

  return (
        <Form className='' noValidate onSubmit={formik.handleSubmit}>
          <Row className='mb-3 w-100'>
            <Form.Group
              as={Col}
              md={7}
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label>First name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                {...formik.getFieldProps('firstName')}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.firstName}</Form.Control.Feedback>
            </Form.Group>
                          <Form.Group
              as={Col}
              md={7}
              controlId="validationFormik1032"
              className='position-relative'
              >
              <Form.Label>First name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                {...formik.getFieldProps('firstName')}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.firstName}</Form.Control.Feedback>
            </Form.Group>
                        <Form.Group
              as={Col} md={7}
              controlId="validationFormik1032"
              className='position-relative'
              >
              <Form.Label>First name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                {...formik.getFieldProps('firstName')}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.firstName}</Form.Control.Feedback>
            </Form.Group>
            </Row>
                {/*\
             <InputGroup
             hasValidation
             as={Col}
             md="3"
             sm="6"
             xs="12"
             className="position-relative"
             >
             <Form.Label>Last name *</Form.Label>
             <Form.Control
             type="text"
             name="lastName"
             value={values.lastName}
             onChange={handleChange}
             isInvalid={!!errors.lastName}
                />

              <Form.Control.Feedback type="invalid" tooltip>{errors.lastName}</Form.Control.Feedback>
              </InputGroup>
              <InputGroup
              hasValidation
              as={Col}
              md="3"
              sm="6"
              xs="12"
              className="position-relative"
              >
              
              <Form.Select
              md="3"
              sm="6"
              component="select"
              id="location"
              name="location"
              isInvalid={!!errors.location}
              >
              <option value="">Chose Class</option>
              <option value="NY">New York</option>
              <option value="SF">San Francisco</option>
              <option value="CH">Chicago</option>
              <option value="OTHER">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{errors.location}</Form.Control.Feedback>
              </InputGroup>
              </Row>
              <InputGroup as={Col} md="3" sm="6" xs="12" ">
              <Form.Label>adress</Form.Label>
              <Form.Control
              type="text"
              placeholder="adress"
              name="adress"
              value={values.adress}
              onChange={handleChange}
              isInvalid={!!errors.adress}
              />
              
              <Form.Control.Feedback type="invalid" tooltip>
              {errors.adress}
              </Form.Control.Feedback>
              </InputGroup>
              </Row>
              <Row className="mb-3">
              <InputGroup
              as={Col}
              md="3"
                
              className="position-relative"
              >
              <Form.Label>email</Form.Label>
              <Form.Control
              type="email"
              placeholder="mail"
              name="email"
              value={values.email}
              onChange={handleChange}
                isInvalid={!!errors.email}
                />
                
                <Form.Control.Feedback type="invalid" tooltip>
                {errors.email}
                </Form.Control.Feedback>
                </InputGroup>
                <InputGroup
                as={Col}
                md="3"
                controlId="validationFormik104"
                className="position-relative"
                >
                <Form.Label>State</Form.Label>
                <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                {errors.state}
                </Form.Control.Feedback>
                </InputGroup>
                <InputGroup
                as={Col}
                md="3"
                controlId="validationFormik105"
                className="position-relative"
                >
                <Form.Label>Zip</Form.Label>
                <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
                />
                
                <Form.Control.Feedback type="invalid" tooltip>
                {errors.zip}
                </Form.Control.Feedback>
                </InputGroup>
                </Row>
                <InputGroup className="position-relative mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                type="file"
                required
              name="file"
              onChange={handleChange}
              isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid" tooltip>
              {errors.file}
              </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="position-relative mb-3">
              <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik106"
              feedbackTooltip
              />
            </InputGroup> */}
          <Button type="submit">Submit form</Button>
        </Form>
  );
}

export default FormC;