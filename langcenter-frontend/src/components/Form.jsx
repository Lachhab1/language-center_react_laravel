import Form from 'react-bootstrap/Form';

function FormCustom() {
  return (
    <Form className='container '>
      <Form.Group className="row" controlId="exampleForm.ControlInput1">
        <div className='col-sm d-flex flex-column'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='w-auto' type="email" placeholder="name@example.com" />
        </div>
            <div className='col-sm d-flex flex-column'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='w-auto' type="email" placeholder="name@example.com" />
        </div>
        </Form.Group>
        <Form.Group className="row" controlId="exampleForm.ControlInput1">
        <div className='col-sm d-flex flex-column'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='w-auto' type="email" placeholder="name@example.com" />
        </div><div className='col-sm d-flex flex-column'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='w-auto' type="email" placeholder="name@example.com" />
        </div><div className='col-sm d-flex flex-column'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='w-auto' type="email" placeholder="name@example.com" />
        </div><div className='col-sm d-flex flex-column'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='w-auto' type="email" placeholder="name@example.com" />
        </div>
      </Form.Group>
      <Form.Group className="row" controlId="exampleForm.ControlInput1">    
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
}

export default FormCustom;