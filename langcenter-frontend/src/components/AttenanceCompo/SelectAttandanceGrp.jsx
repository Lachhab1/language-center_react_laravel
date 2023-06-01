import React, { useState } from 'react';
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

  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState(initialPresenceData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (values) => {
    setShowTable(true);
  };

  const handleViewPresence = () => {
    const attendanceData = [
      { id: 1, name: 'John Doe', attendance: false, reason: '' },
      { id: 2, name: 'Jane Smith', attendance: false, reason: '' },
      { id: 3, name: 'Bob Johnson', attendance: false, reason: '' },
    ];

    setAttendanceData(attendanceData);
    setIsModalOpen(true);
  };

  const handleDataChange = (rowIndex, fieldName, value) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][fieldName] = value;
      return newData;
    });
  };

  const columns = [
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'Full Name', selector: 'fullName', sortable: true },
    {
      name: 'Absent',
      selector: 'absent',
      cell: (row, rowIndex) => (
        <input
          type="checkbox"
          checked={row.absent}
          onChange={(e) => handleDataChange(rowIndex, 'absent', e.target.checked)}
        />
      ),
      sortable: true,
    },
    {
      name: 'Reason',
      selector: 'reason',
      cell: (row, rowIndex) => (
        <input
          type="text"
          value={row.reason}
          onChange={(e) => handleDataChange(rowIndex, 'reason', e.target.value)}
        />
      ),
      sortable: true,
    },
  ];

  const handleSave = () => {
    // Backend code to save the modified data or add
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
                  className={`form-control ${
                    touched.date && errors.date ? 'is-invalid' : ''
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
                  className={`form-select ${
                    touched.course && errors.course ? 'is-invalid' : ''
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
                  className={`form-select ${
                    touched.group && errors.group ? 'is-invalid' : ''
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={Object.keys(errors).length !== 0}
            >
              Add/Modify
            </button>
            <button
              type="button"
              className={`btn btn-secondary mx-2 ${
                (!values.date || !values.course || !values.group) ? 'disabled' : ''
              }`}
              onClick={handleViewPresence}
              disabled={!values.date || !values.course || !values.group}
            >
              View Attendance
            </button>
          </Form>
        )}
      </Formik>

      {showTable && (
        <div className="my-4">
          <DataTable columns={columns} data={tableData} pagination />
          <button onClick={handleSave} className="btn btn-success mt-2">
            Submit
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Report</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <DataTable
                  columns={[
                    { name: 'ID', selector: 'id', sortable: true },
                    { name: 'Name', selector: 'name', sortable: true },
                    {
                      name: 'Absent',
                      selector: 'attendance',
                      cell: (row) => (row.attendance ? 'Absent' : 'Present'),
                      sortable: true,
                    },
                    {
                      name: 'Reason',
                      selector: 'reason',
                      cell: (row, rowIndex) => (
                        <input
                          type="text"
                          value={row.reason}
                          onChange={(e) =>
                            handleDataChange(rowIndex, 'reason', e.target.value)
                          }
                          readOnly
                        />
                      ),
                      sortable: true,
                    },
                  ]}
                  data={attendanceData}
                  pagination
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
