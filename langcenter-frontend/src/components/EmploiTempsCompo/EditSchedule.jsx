import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditSchedule() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    // Fetch schedule data based on the ID from the database or API
    // Example API call: fetchScheduleData(id)
    // Once you have the data, update the schedule state
    const fetchedSchedule = {
      id: id,
      courseName: 'Math',
      courseLevel: 'Intermediate',
      group: 'Group 1',
      classroom: 'Room 101',
      day: ['Monday', 'Wednesday', 'Friday'],
      startTime: '09:00 AM',
      finishTime: '10:30 AM',
    };
    setSchedule(fetchedSchedule);
  }, [id]);

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    const isDaySelected = schedule.day.includes(selectedDay);

    if (isDaySelected) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        day: prevSchedule.day.filter((day) => day !== selectedDay),
      }));
    } else {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        day: [...prevSchedule.day, selectedDay],
      }));
    }
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      startTime: newStartTime,
    }));
  };

  const handleFinishTimeChange = (e) => {
    const newFinishTime = e.target.value;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      finishTime: newFinishTime,
    }));
  };

  const handleClassroomChange = (e) => {
    const newClassroom = e.target.value;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      classroom: newClassroom,
    }));
  };

  const handleSave = () => {
    // Perform save operation here
    console.log(schedule);
  };

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-4">Edit Schedule</h1>
      <p>ID: {schedule.id}</p>
      <p>Course Name: {schedule.courseName}</p>
      <p>Course Level: {schedule.courseLevel}</p>
      <p>Group: {schedule.group}</p>
      <p>Classroom: {schedule.classroom}</p>
      <p>Day: {schedule.day.join(', ')}</p>
      <p>Start Time: {schedule.startTime}</p>
      <p>Finish Time: {schedule.finishTime}</p>
      <form  className='editSchedule'> 
        <div className="mb-3">
          <label htmlFor="days" className="form-label">
            Day(s):
          </label>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div className="form-check form-check-inline" key={day}>
              <input
                type="checkbox"
                className="form-check-input"
                id={day}
                value={day}
                checked={schedule.day.includes(day)}
                onChange={handleDayChange}
              />
              <label className="form-check-label" htmlFor={day}>
                {day}
                </label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time:
          </label>
          <input
            type="time"
            className="form-control"
            id="startTime"
            value={schedule.startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="finishTime" className="form-label">
            Finish Time:
          </label>
          <input
            type="time"
            className="form-control"
            id="finishTime"
            value={schedule.finishTime}
            onChange={handleFinishTimeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="classroom" className="form-label">
            Classroom:
          </label>
          <input
            type="text"
            className="form-control"
            id="classroom"
            value={schedule.classroom}
            onChange={handleClassroomChange}
          />
        </div>
      </form>
      <button onClick={handleSave} className="btn btn-success">
        Save
      </button>
    </div>
  );
}

