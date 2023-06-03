import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';

function EditParent() {

  const [formData, setFormData] = useState({
    guardfName: "",
    guardLName: "",
    guardOcup: "",
    guardEmail: "",
    guardPhone: "",
    guardCIN: "",
    guardGender: "",
    guardBirthday: ""
  });

   // const fetchData = async() => {
    //     await Axios.get("/parent/data")
    //     setFormData(
    //         JSON.parse(res.data)
    //         )
    //     }
    // }
    
  const formik = useFormik({
    initialValues: {
      guardfName: formData.guardfName,
      guardLName: formData.guardLName,
      guardOcup: formData.guardOcup,
      guardEmail: formData.guardEmail,
      guardPhone: formData.guardPhone,
      guardCIN: formData.guardCIN,
      guardGender: formData.guardGender,
      guardBirthday: formData.guardBirthday
    },
    validationSchema: yup.object().shape({
      guardfName: yup.string().required('First name is required'),
      guardLName: yup.string().required('Last name is required'),
      guardOcup: yup.string().required('Occupation is required'),
      guardEmail: yup.string().email('Invalid Email').required('Email is required'),
      guardPhone: yup.string().min(9, 'Phone number must be at least 9 characters').required('Phone number is required'),
      guardCIN: yup.string().required('CIN is required'),
      guardGender: yup.string().required('Gender is required'),
      guardBirthday: yup.date().required('Birthday is required')
    }),
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className='mb-3'>
        <h3>Parents</h3>
        <Form.Group as={Col} md="3" sm="6" xs="12" controlId="validationFormik1032" className='position-relative'>
          <Form.Label>First name</Form.Label>
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
          <Form.Label>Last name</Form.Label>
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
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Occupation"
            name="guardOcup"
            {...formik.getFieldProps('guardOcup')}
            isInvalid={formik.touched.guardOcup && formik.errors.guardOcup}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.guardOcup}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" xs="12" className="position-relative">
          <Form.Label>Email</Form.Label>
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
          <Form.Label>Phone</Form.Label>
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
          <Form.Label>CIN</Form.Label>
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
          <Form.Label>Gender</Form.Label>
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
          <Form.Label>Birthday</Form.Label>
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
      </Row>
      <Button type="submit">Modify</Button>
    </Form>
  );
}

export default EditParent;
