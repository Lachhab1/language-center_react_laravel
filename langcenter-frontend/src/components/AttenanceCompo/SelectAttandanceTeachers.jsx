import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DataTable from 'react-data-table-component';

export default function SelectAttandanceTeachers() {
    const attendanceSchema = Yup.object().shape({
        date: Yup.string().required('Date is required'),
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false); // Add isModalOpen sta
    const [teachers, setTeachers] = useState([]);
    const initialAttendanceData = [
        { id: 1, name: 'John Doe', attendance: false },
        { id: 2, name: 'Jane Smith', attendance: false },
        { id: 3, name: 'Bob Johnson', attendance: false },
    ];

    const initialValues = {
        date: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        // Fetch teachers based on the selected date
        fetchTeachers(values.date);
        resetForm();
    };

    const fetchTeachers = (selectedDate) => {
        // Fetch teachers from the database based on the selected date
        // Replace this with your actual API call or database query
        // Simulating the response with a setTimeout for demonstration purposes
        setTimeout(() => {
            const mockTeachers = [
                { id: 1, name: 'Teacher A', workingDays: ['2023-05-08', '2023-05-10', '2023-05-12'] },
                { id: 2, name: 'Teacher B', workingDays: ['2023-05-09', '2023-05-11', '2023-05-13'] },
            ];
            const matchedTeachers = mockTeachers.filter((teacher) =>
                teacher.workingDays.includes(selectedDate)
            );
            setTeachers(matchedTeachers);
        }, 500); // Simulated delay of 500ms
    };
    const handleViewAttendance = () => {
        setIsModalOpen(true);
        // You can fetch data from the database here and update the state accordingly
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
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
                          className="btn btn-secondary"
                          onClick={handleViewAttendance}
                        >
                          View Attendance
                        </button>
                      
                   
                  </Form>
                  
                )}
                
            </Formik>

            {teachers.length > 0 ? (
                <div className="my-4">
                    <DataTable
                        columns={[
                            { name: 'ID', selector: 'id', sortable: true },
                            { name: 'Name', selector: 'name', sortable: true },
                            {
                                name: 'Attendance',
                                selector: 'attendance',
                                cell: (row) => (
                                    <input type="checkbox" checked={row.attendance} readOnly />
                                ),
                                sortable: true,
                            },
                        ]}
                        data={initialAttendanceData}
                        pagination
                    />
                </div>
            ) : null}
            {/* Modal */}
      {isModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Details</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Render your attendance details here */}
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
