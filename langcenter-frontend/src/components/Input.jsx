import Form from 'react-bootstrap/Form';

function FormInput({field}) {
  
  
  return (
    <>
              <Form.Label>First name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                {...field}
              />
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.firstName}</Form.Control.Feedback>
              </>

             
  );
}

export default FormInput;