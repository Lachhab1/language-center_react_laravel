import React from 'react'

export default function Paymant() {
  return (
    <div>Paymant</div>
  )
}




/*


            <Row className='mb-3'>
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
            <Form.Group
              as={Col}
              md={3}
              sm={6}
              xs={7}
              className="position-relative"
              >
              <Form.Label>Course Materials</Form.Label>
              <div className='d-flex'>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Insurance"
              />
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Course"
              />
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="learning Materials"
              />
              </div>
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
        </Row>





*/