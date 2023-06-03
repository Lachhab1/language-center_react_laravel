import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DataTable from 'react-data-table-component';

export default function SelectAttendanceTeachers() {
  const attendanceSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
  });

  const [showTable, setShowTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'John Doe', attendance: false },
    { id: 2, name: 'Jane Smith', attendance: false },
    { id: 3, name: 'Bob Johnson', attendance: false },
  ]);

  const initialValues = {
    date: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    fetchTeachers(values.date);
    setShowTable(true);
  };

  const fetchTeachers = (selectedDate) => {
    setTimeout(() => {
      const mockTeachers = [
        { id: 1, name: 'Teacher A', workingDays: ['2023-05-08', '2023-05-10', '2023-05-12'] },
        { id: 2, name: 'Teacher B', workingDays: ['2023-05-09', '2023-05-11', '2023-05-13'] },
      ];
      const matchedTeachers = mockTeachers.filter((teacher) =>
        teacher.workingDays.includes(selectedDate)
      );
      setTeachers(matchedTeachers);
    }, 500);
  };

  const handleDataChange = (rowIndex, fieldName, value) => {
    setAttendanceData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][fieldName] = value;
      return newData;
    });
  };

  const handleViewAttendance = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Backend code to save the modified data or add
   
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={attendanceSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="row mb-3">
              <div className="col-4">
                <label htmlFor="date" className="form-label">
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''}`}
                />
                {touched.date && errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary me-3">
              Add/Modify
            </button>

            <button
              type="button"
              className={`btn btn-secondary ${!values.date && touched.date ? 'disabled' : ''}`}
              onClick={values.date ? handleViewAttendance : undefined}
              disabled={!values.date}
            >
              View Attendance
            </button>
          </Form>
        )}
      </Formik>

      {showTable && (
        <div className="my-4">
          <DataTable
            columns={[
              { name: 'ID', selector: 'id', sortable: true },
              { name: 'Name', selector: 'name', sortable: true },
              {
                name: 'Absent',
                selector: 'attendance',
                cell: (row, rowIndex) => (
                  <input
                    type="checkbox"
                    checked={row.attendance}
                    onChange={(e) =>
                      handleDataChange(rowIndex, 'attendance', e.target.checked)
                    }
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
            ]}
            data={attendanceData}
            pagination
          />
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
                      cell: (row) => (row.attendance ?  'Absent' : 'Present' ),
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
