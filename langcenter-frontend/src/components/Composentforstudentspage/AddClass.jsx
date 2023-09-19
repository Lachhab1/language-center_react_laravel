import { useEffect,useState  } from "react"
import { Modal,Form,Row,Col,Button,InputGroup } from "react-bootstrap"
import axios from "../../api/axios"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UseStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function AddClass({showModal,handleClose,selectedItem,id}) {
      const navigate = useNavigate();
        const {user,setNotification,setVariant} = UseStateContext();
        const [classData, setClassData] = useState([]);
        const [total, setTotal] = useState(0);
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
    // Fetch available courses and levels from the database
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
        discount: ``,
        customDiscount: ``,
        insurrance: false,
        course: false,
        courseName: '',
        payment_method: '',
      },
    validationSchema: yup.object().shape({
    class: yup.string().required("required"),
      courseFeesPaid: yup.number().required('required'),
      negotiatedPrice: yup.number().required('required'),
        discount: yup.string(),    
        customDiscount: yup.number(),
        insurrance: yup.boolean(),
        course: yup.boolean(),
        courseName: yup.string(),
        payment_method: yup.string(),
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
    const etudiantId = selectedItem.id;
    let inscriptionData = {
      etudiant_id: etudiantId,
      class_id: formik.values.class,
      negotiated_price: formik.values.negotiatedPrice,
    }
        if (formik.values.insurrance === true || formik.values.course === true){
                if (formik.values.course === false){
                inscriptionData = {
                etudiant_id: etudiantId,
                negotiated_price: formik.values.negotiatedPrice,
                }
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
     type: formik.values.payment_method,
    }
    try{
      response3 = await axios.post(`/api/inscrires/${inscriptionId}/register-payment`,paymentData);
    } catch (error) {
      console.log(error);
    }
  }
    console.log(response3);
    setNotification("Class added successfully");
    setVariant("success");
    setTimeout(() => {
      setNotification("");
      setVariant("");
    }, 7000);
    window.location.reload();
  }
  // calculate the total fees
  useEffect(() => {
  const getTotals = () => {
    let total = 0;
    if (formik.values.insurrance){
      console.log("insurrance");
      total += 200;
    }
    if (formik.values.course){
      console.log("course");
      total += +findCoursFees(formik.values.class);
    }
    return total;
  }
  setTotal(getTotals());
  },[formik.values.insurrance,formik.values.course,formik.values.testLevel,formik.values.class]);
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
  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
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
              <Row>
              <h3>Payment</h3>
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
                value={total}
                disabled
                />
          </Form.Group>
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
          <Form.Group
              as={Col}
              md="3"
              sm="6"
              xs="12"
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label className="mt-3">Payment Method</Form.Label>
              <Form.Select
              component="select"
              id="payment_method"
              name="payment_method"
              {...formik.getFieldProps('payment_method')}
              isInvalid={formik.touched.payment_method && formik.errors.payment_method}
              >
              <option value=''>choose Payment Method</option>
              <option value='cash'>Cash</option>
              <option value='check'>Check</option>
              <option value='credit card'>Credit Card</option>
              <option value='bank transfer'>Bank Transfer</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.payment_method}</Form.Control.Feedback>
              </Form.Group>
        </Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Save</button>
            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
        </Modal.Footer>
    </Modal>
  )
}