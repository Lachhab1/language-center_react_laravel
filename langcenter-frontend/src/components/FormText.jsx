import React from 'react'

export default function 
() {
  return (
    <div>
            <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              controlId="validationFormik1"
              className='position-relative'
              >
              <Form.Label>{label} *</Form.Label>
              <Form.Control
                type="text"
                name={name}
                {...formik.getFieldProps(name)}
                isInvalid={formik.touched.$$name && formik.errors.$$name}
                />
              <Form.Control.Feedback className='' type="invalid" tooltip>{formik.errors.firstName}</Form.Control.Feedback>
            </Form.Group>
    </div>
  )
}


