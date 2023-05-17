import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function EditGroup() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
const {id} = useParams();
  const formik = useFormik({
    initialValues: {
      groupName: '',
      course: '',
      level: '',
    },
    validationSchema: Yup.object({
      groupName: Yup.string().required('Group name is required'),
      course: Yup.string().required('Course is required'),
      level: Yup.string().required('Level is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission and update group
      console.log(values);
    },
  });
/*
  // Fetch group data based on groupId and populate form fields
  useEffect(() => {
    // Replace this with your actual API call to fetch group data
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}`);
        const data = await response.json();

        formik.setFieldValue('groupName', data.groupName);
        formik.setFieldValue('course', data.course);
        formik.setFieldValue('level', data.level);
        setSelectedCourse(data.course);
        setSelectedLevel(data.level);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId, formik]);
*/


  // Fetch available courses and levels from the database
  // Replace this with your actual API calls to fetch data

  console.log("coucou: "+id)

  const availableCourses = [
    { id: '1', name: 'Course A' },
    { id: '2', name: 'Course B' },
    { id: '3', name: 'Course C' },
    // Add more courses as needed
  ];

  const availableLevels = [
    { id: '1', name: 'Level 1' },
    { id: '2', name: 'Level 2' },
    { id: '3', name: 'Level 3' },
    // Add more levels as needed
  ];

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    formik.setFieldValue('course', courseId);
    formik.setFieldValue('level', ''); // Reset the selected level when the course changes
  };

  const handleLevelChange = (e) => {
    const levelId = e.target.value;
    setSelectedLevel(levelId);
    formik.setFieldValue('level', levelId);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="editGroup">
      <h1>Edit Group{id}</h1>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="groupName" className="form-label">
            Group Name*
          </label>
          <input
            id="groupName"
            type="text"
            className={`form-control ${formik.errors.groupName ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('groupName')}
          />
          {formik.touched.groupName && formik.errors.groupName && (
            <div className="invalid-feedback">{formik.errors.groupName}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="course" className="form-label">
            Course*
          </label>
          <select
  id="course"
  className={`form-select ${formik.errors.course ? 'is-invalid' : ''}`}
  value={formik.values.course}
  onChange={handleCourseChange}
>
  <option value="">Select course</option>
  {availableCourses.map((course) => (
    <option key={course.id} value={course.id}>
      {course.name}
    </option>
  ))}
</select>

          {formik.touched.course && formik.errors.course && (
            <div className="invalid-feedback">{formik.errors.course}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="level" className="form-label">
            Level*
          </label>
          <select
            id="level"
            className={`form-select ${formik.errors.level ? 'is-invalid' : ''}`}
            value={selectedLevel}
            onChange={handleLevelChange}
            disabled={!selectedCourse} // Disable the level select if no course is selected
          >
            <option value="">Select level</option>
            {availableLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
          {formik.touched.level && formik.errors.level && (
            <div className="invalid-feedback">{formik.errors.level}</div>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Update Group
      </button>
    </form>
  );
}

