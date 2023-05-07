import React, { useState ,useEffect } from 'react';
import { useFormik } from 'formik';
import AvatarEdit from "../ProfileCompo/AvatarEdit";
import * as Yup from 'yup';

export default function EditTeacher() {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            cin: '',
            birthday: '',
            gender: '',
            email: '',
            address: '',
            phone: '',
            isActive: false,
            diploma: '',
            hireDate: '',
            speciality: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            cin: Yup.string().required('CIN is required'),
            birthday: Yup.date().required('Birthday is required'),
            gender: Yup.string().required('Gender is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            address: Yup.string().required('Address is required'),
            phone: Yup.string().required('Phone number is required'),
            isActive: Yup.boolean().required('Status is required'),
            diploma: Yup.string().required('Diploma is required'),
            hireDate: Yup.date().required('Hire date is required'),
            speciality: Yup.string().required('Speciality is required'),
        }),
        onSubmit: (values) => {
            // Handle form submission and update teacher
            console.log(values);
          },
        });
      
        useEffect(() => {
          // Fetch teacher data from the database using the teacher ID
          const fetchTeacherData = async () => {
            try {
              // Simulating an API call with random data
              const randomData = {
                firstName: 'John',
                lastName: 'Doe',
                cin: '123456789',
                birthday: '1990-01-01',
                gender: 'male',
                email: 'john.doe@example.com',
                address: '123 Street, City',
                phone: '1234567890',
                isActive: true,
                diploma: 'Bachelor',
                hireDate: '2020-01-01',
                speciality: 'Mathematics',
                selectedClasses: ['1', '2'],
              };
      
              // Update the formik values with the fetched data
              formik.setValues(randomData);
      
              // Update the selected classes state with the fetched data
              setSelectedClasses(randomData.selectedClasses);
            } catch (error) {
              // Handle error
              console.error(error);
            }
          };
      
          // Call the fetchTeacherData function to fetch and populate the form with teacher data
          fetchTeacherData();
        }, []); // Empty dependency array ensures this effect runs only once
      
    
    //jib data mn database hado machi dynamique
    const availableClasses = [
        { id: '1', name: 'Class A' },
        { id: '2', name: 'Class B' },
        { id: '3', name: 'Class C' },
        // Add more classes as needed
    ];


    return (
        <form onSubmit={formik.handleSubmit} className='editTeacher'>
            <h1>Update Teacher Infos</h1>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name*
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        className={`form-control ${formik.errors.firstName ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name*
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        className={`form-control ${formik.errors.lastName ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                    )}
                </div>


                <div className="col-md-3 mb-3">
                    <label htmlFor="cin" className="form-label">
                        CIN*
                    </label>
                    <input
                        id="cin"
                        type="text"
                        className={`form-control ${formik.errors.cin ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('cin')}
                    />
                    {formik.touched.cin && formik.errors.cin && (
                        <div className="invalid-feedback">{formik.errors.cin}</div>
                    )}
                </div>                <div className="col-md-3 mb-3">
                    <label htmlFor="birthday" className="form-label">
                        Birthday*
                    </label>
                    <input
                        id="birthday"
                        type="date"
                        className={`form-control ${formik.errors.birthday ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('birthday')}
                    />
                    {formik.touched.birthday && formik.errors.birthday && (
                        <div className="invalid-feedback">{formik.errors.birthday}</div>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="gender" className="form-label">
                        Gender*
                    </label>
                    <select
                        id="gender"
                        className={`form-select ${formik.errors.gender ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('gender')}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                        <div className="invalid-feedback">{formik.errors.gender}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="email" className="form-label">
                        Email*
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="address" className="form-label">
                        Address*
                    </label>
                    <input
                        id="address"
                        type="text"
                        className={`form-control ${formik.errors.address ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <div className="invalid-feedback">{formik.errors.address}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone*
                    </label>
                    <input
                        id="phone"
                        type="text"
                        className={`form-control ${formik.errors.phone ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="speciality" className="form-label">
                        Speciality*
                    </label>
                    <input
                        id="speciality"
                        type="text"
                        className={`form-control ${formik.errors.speciality ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('speciality')}
                    />
                    {formik.touched.speciality && formik.errors.speciality && (
                        <div className="invalid-feedback">{formik.errors.speciality}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="diploma" className="form-label">
                        Diploma*
                    </label>
                    <input
                        id="diploma"
                        type="text"
                        className={`form-control ${formik.errors.diploma ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('diploma')}
                    />
                    {formik.touched.diploma && formik.errors.diploma && (
                        <div className="invalid-feedback">{formik.errors.diploma}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="hireDate" className="form-label">
                        Hire Date*
                    </label>
                    <input
                        id="hireDate"
                        type="date"
                        className={`form-control ${formik.errors.hireDate ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('hireDate')}
                    />
                    {formik.touched.hireDate && formik.errors.hireDate && (
                        <div className="invalid-feedback">{formik.errors.hireDate}</div>
                    )}
                </div>

                <div className="col-md-3 mb-3 d-flex justify-content-center align-items-end">
                    <div className="form-check">
                        <input
                            id="isActive"
                            type="checkbox"
                            className="form-check-input"
                            checked={formik.values.isActive}
                            {...formik.getFieldProps('isActive')}
                        />
                        <label htmlFor="isActive" className="form-check-label ">
                            Active
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="selectedClasses" className="form-label">
                        Class(es)*
                    </label>
                    <select
                        id="selectedClasses"
                        className={`form-select ${formik.errors.selectedClasses ? 'is-invalid' : ''}`}
                        multiple
                        value={selectedClasses}
                        onChange={(e) => setSelectedClasses(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        {availableClasses.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.selectedClasses && formik.errors.selectedClasses && (
                        <div className="invalid-feedback">{formik.errors.selectedClasses}</div>
                    )}
                    <div className="form-text text-muted" style={{ fontSize: 'small', color: 'lightgray' }}>
                        (Ctrl + click) or (⌘ + click) to select multiple classes
                    </div>
                </div>
                
                <AvatarEdit button="Change Teacher profile photo" />
            </div>

            <button type="submit" className="btn btn-primary">
            Update Teacher
            </button>
        </form>
    );
}
