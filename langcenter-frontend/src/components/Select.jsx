import { Form,Col } from 'react-bootstrap';

function Select({label,options,defText}) {
  return (
    <Col lg={3} md={4} sm={6} className='d-flex flex-column mb-2'>
    <Form.Select className='' aria-label={label}>
      <option>{defText}</option>
        {options.map((option) => {
            return (
                <option value={option.value}>{option.text}</option>
            )
        })}
    </Form.Select>
    </Col>
  );
}

export default Select;