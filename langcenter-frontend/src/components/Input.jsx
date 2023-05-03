import { Form,Col } from 'react-bootstrap';

function Input({inputUnit})
{
  return (
        <Col lg={3} md={4} sm={6} className='d-flex flex-column mb-3'>
        <Form.Label>{inputUnit.label}</Form.Label>
        <Form.Control className='w-auto' type={inputUnit.type} placeholder={inputUnit.placeholder} />
        </Col>
  );
}

export default Input;