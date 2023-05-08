import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddSchedule() {
    const formik = useFormik({
        initialValues: {
            course: '',
            level: '',
            group: '',
            day: [],
            startTime: '',
            finishTime: '',
            classroom: '',
        },
        validationSchema: Yup.object({
            course: Yup.string().required('Course is required'),
            level: Yup.string().required('Level is required'),
            group: Yup.string().required('Group is required'),
            day: Yup.array().of(Yup.string()).min(1, 'Select at least one day').required('Day is required'),
            startTime: Yup.string().required('Start time is required'),
            finishTime: Yup.string().required('Finish time is required'),
            classroom: Yup.string().required('Classroom is required'),
        }),
        onSubmit: (values) => {
            // Handle form submission and add schedule
            console.log(values);
        },
    });
    const handleDayChange = (e) => {
        const selectedDay = e.target.value;
        const isDaySelected = formik.values.day.includes(selectedDay);

        if (isDaySelected) {
            formik.setFieldValue(
                'day',
                formik.values.day.filter((day) => day !== selectedDay)
            );
        } else {
            formik.setFieldValue('day', [...formik.values.day, selectedDay]);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className='addSchedule'>
            <h1>Add Schedule</h1>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="course" className="form-label">
                        Course*
                    </label>
                    <select
                        id="course"
                        className={`form-select ${formik.errors.course ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('course')}
                    >
                        <option value="">Select a course</option>
                        {/* Add options for all courses */}
                    </select>
                    {formik.touched.course && formik.errors.course && (
                        <div className="invalid-feedback">{formik.errors.course}</div>
                    )}
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="level" className="form-label">
                        Level*
                    </label>
                    <select
                        id="level"
                        className={`form-select ${formik.errors.level ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('level')}
                    >
                        <option value="">Select a level</option>
                        {/* Add options for levels based on selected course */}
                    </select>
                    {formik.touched.level && formik.errors.level && (
                        <div className="invalid-feedback">{formik.errors.level}</div>
                    )}
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="group" className="form-label">
                        Group*
                    </label>
                    <select
                        id="group"
                        className={`form-select ${formik.errors.group ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('group')}
                    >
                        <option value="">Select a group</option>
                        {/* Add options for groups based on selected level */}
                    </select>
                    {formik.touched.group && formik.errors.group && (
                        <div className="invalid-feedback">{formik.errors.group}</div>
                    )}
                </div>
            </div>

            <div className="row">

                <div className="col-md-4 mb-3">
                    <label htmlFor="classroom" className="form-label">
                        Classroom*
                    </label>
                    <select
                        id="classroom"
                        className={`form-select ${formik.errors.classroom ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('classroom')}
                    >
                        <option value="">Select a classroom</option>
                        {/* Add options for all classrooms */}
                    </select>
                    {formik.touched.classroom && formik.errors.classroom && (
                        <div className="invalid-feedback">{formik.errors.classroom}</div>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="startTime" className="form-label">
                        Start Time*
                    </label>
                    <input
                        id="startTime"
                        type="time"
                        className={`form-control ${formik.errors.startTime ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('startTime')}
                    />
                    {formik.touched.startTime && formik.errors.startTime && (
                        <div className="invalid-feedback">{formik.errors.startTime}</div>
                    )}
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="finishTime" className="form-label">
                        Finish Time*
                    </label>
                    <input
                        id="finishTime"
                        type="time"
                        className={`form-control ${formik.errors.finishTime ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('finishTime')}
                    />
                    {formik.touched.finishTime && formik.errors.finishTime && (
                        <div className="invalid-feedback">{formik.errors.finishTime}</div>
                    )}
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <label htmlFor="day" className="form-label">
                    Day*
                </label>
                <div>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                id={day}
                                className="form-check-input"
                                value={day}
                                checked={formik.values.day.includes(day)}
                                onChange={handleDayChange}
                            />
                            <label htmlFor={day} className="form-check-label">{day}</label>
                        </div>
                    ))}
                </div>
                {formik.touched.day && formik.errors.day && (
                    <div className="invalid-feedback">{formik.errors.day}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                Add Schedule
            </button>
        </form>
    );
}

