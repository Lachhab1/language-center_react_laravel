import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DataTable from 'react-data-table-component';

export default function SelectAttendanceGrp() {
  const presenceSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    course: Yup.string().required('Course is required'),
    group: Yup.string().required('Group is required'),
  });

  const initialPresenceData = [
    { id: 1, fullName: 'John Doe', absent: false, reason: '' },
    { id: 2, fullName: 'Jane Smith', absent: false, reason: '' },
    { id: 3, fullName: 'Bob Johnson', absent: false, reason: '' },
  ];

  const initialValues = {
    date: '',
    course: '',
    group: '',
  };

  const handleSubmit = (values) => {
    // Add or modify presence data in the database
    console.log('Submitted presence data:', values);
  };

  const handleViewPresence = () => {
    // Check if presence for the selected date and group exists in the database
    // Show the modal with presence data if it exists, otherwise show an error
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={presenceSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="date" className="form-label">
                                    Date:
                                </label>
                                <Field
                                    type="date"
                                    id="date"
                                    name="date"
                                    className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''
                                        }`}
                                />
                                {touched.date && errors.date && (
                                    <div className="invalid-feedback">{errors.date}</div>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="course" className="form-label">
                                    Course:
                                </label>
                                <Field
                                    as="select"
                                    id="course"
                                    name="course"
                                    className={`form-select ${touched.course && errors.course ? 'is-invalid' : ''
                                        }`}
                                >
                                    <option value="">Select a course</option>
                                    {/* Replace with data from the database */}
                                    <option value="Course A">Course A</option>
                                    <option value="Course B">Course B</option>
                                </Field>
                                {touched.course && errors.course && (
                                    <div className="invalid-feedback">{errors.course}</div>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="group" className="form-label">
                                    Group:
                                </label>
                                <Field
                                    as="select"
                                    id="group"
                                    name="group"
                                    className={`form-select ${touched.group && errors.group ? 'is-invalid' : ''
                                        }`}
                                    disabled={!values.course}
                                >
                                    <option value="">Select a group</option>
                                    {/* Replace with data from the database based on the selected course */}
                                    <option value="Group A">Group A</option>
                                    <option value="Group B">Group B</option>
                                </Field>
                                {touched.group && errors.group && (
                                    <div className="invalid-feedback">{errors.group}</div>
                                )}
                            </div>
                        </div>

            <button type="submit" className="btn btn-primary">
              Add/Modify
            </button>

            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={handleViewPresence}
            >
              View Presence
            </button>
          </Form>
        )}
      </Formik>

      {initialValues.date && initialValues.course && initialValues.group ? (
        <div className="my-4">
          <DataTable
            columns={[
              { name: 'ID', selector: 'id', sortable: true },
              { name: 'Full Name', selector: 'fullName', sortable: true },
              {
                name: 'Absent',
                selector: 'absent',
                cell: (row) => <input type="checkbox" checked={row.absent} readOnly />,
                sortable: true,
              },
              {
                name: 'Reason',
                selector: 'reason',
                cell: (row) => <input type="text" value={row.reason} readOnly />,
                sortable: true,
              },
            ]}
            data={initialPresenceData}
            pagination
          />
        </div>
      ) : null}
    </div>
  );
}
