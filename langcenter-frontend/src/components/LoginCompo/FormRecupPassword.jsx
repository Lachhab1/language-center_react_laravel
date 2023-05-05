import { Container, Form, Button } from 'react-bootstrap';
import './loging.css'

function FormRecupPassword() {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="d-flex flex-column recupPassBody align-items-center justify-content-center vh-100">
      <Form className="p-5 border rounded shadow">
        <h1 className="text-center mb-4">Forgot Password</h1>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" required />
        </Form.Group>
        <a href='/auth' className='text-decoration-none text-primary'>Go Back</a>
        <Button variant="danger" type="submit" className="w-100 mt-4">Reset Password</Button>
      </Form>
      <p className="text-white mt-5">&copy; {currentYear} School Management</p>
    </Container>
  );
}

export default FormRecupPassword;
