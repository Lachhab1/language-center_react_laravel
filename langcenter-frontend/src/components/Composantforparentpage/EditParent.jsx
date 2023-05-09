import { useFormik } from 'formik';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';

function EditParent(
    ) {
    const [formData,setFormData] = useState({
        guardfName:"",
        guardLName: "",
        guardOcup: "",
        guardEmail: "",
        guardPhone: ""
    });

    // const fetchData = async() => {
    //     await Axios.get("/parent/data")
    //     setFormData(
    //         JSON.parse(res.data)
    //         )
    //     }
    // }

    const formik = useFormik({
    initialValues:{
    guardfName: `${formData.guardfName}`,
    guardLName: `${formData.guardLName}`,
    guardOcup: `${formData.guardOcup}`,
    guardEmail: `${formData.guardEmail}`,
    guardPhone: `${formData.guardPhone}`,
},
validationSchema: yup.object().shape({
    guardfName: yup.string(),
      guardLName: yup.string(),
      guardOcup: yup.string(),
      guardEmail: yup.string().email('invalid Email'),
      guardPhone: yup.string().min(9,'to short to be a valid phone number'),
    }),
    onSubmit: values => {console.log(values)},
  });
  return(
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
  );
}

export default EditParent;