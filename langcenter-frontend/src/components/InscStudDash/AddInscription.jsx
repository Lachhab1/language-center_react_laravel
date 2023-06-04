import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { Form,Button,Col,Row,Modal,Badge } from 'react-bootstrap';
import * as yup from 'yup';
import axios from '../../api/axios';
import {useNavigate} from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import TableEtudiant from './TableEtudiant';


function AddInscription({show, onHide}) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleRowClicked = (row) => {
  setSelectedUserId(row.id);
  };
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
        class: '',
        courseFeesPaid: ``,
        negotiatedPrice: ``,
      },
    validationSchema: yup.object().shape({
    class: yup.string().required("required"),
      courseFeesPaid: yup.number().required('required'),
      negotiatedPrice: yup.number().required('required'),
  }),
  onSubmit: (values) => {
    console.log("wewe are here");

}
});
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
    let response2 = [];
    let response3 = [];
    const etudiantId = selectedUserId;
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
    setNotification("Inscription added successfully");
    setVariant("success");
    setTimeout(() => {
      setNotification("");
      setVariant("");
      window.location.reload();
    }, 3000);
    navigate(`${x}/dashboard`);
  }
  return (
    <Modal show={show} onHide={onHide} size={'xl'} centered scrollable animation>
      <Modal.Header closeButton>
        <Modal.Title>add Inscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form noValidate onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <h3>Student</h3>
            <TableEtudiant selectedUserId={selectedUserId} handleRowClicked={handleRowClicked} />
            <Badge bg='secondary' className='p-3 bg-primary text-info'>
              {selectedUserId && <p>Selected Student ID: {selectedUserId}</p>}
            </Badge>
    </Row>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default AddInscription;