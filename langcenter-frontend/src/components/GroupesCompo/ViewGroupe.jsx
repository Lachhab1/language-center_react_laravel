import React from "react";
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function ViewGroupe() {
  const { id } = useParams();

  // Sample data for group details
  const group = {
    id: id,
    groupName: 'Group A',
    courseName: 'English',
    courseLevel: 'B1',
    teacher: 'Issam Labyed',
    schedule: [
      {
        start: new Date(2023, 4, 18, 10, 0, 0), // Year, Month (0-11), Day, Hour, Minute, Second
        end: new Date(2023, 4, 18, 12, 0, 0),
        title: 'Class 1',
      },
    ],
  };

  return (
    <div>
      <h1>Group Details</h1>
      <h2>ID: {group.id}</h2>
      <h2>Group Name: {group.groupName}</h2>
      <h2>Course Name: {group.courseName}</h2>
      <h2>Course Level: {group.courseLevel}</h2>
      <h2>Teacher: {group.teacher}</h2>

      <Calendar
        localizer={localizer}
        events={group.schedule}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        min={new Date().setHours(8, 0, 0)} // Set the minimum time to 8:00 AM
        max={new Date().setHours(20, 0, 0)} // Set the maximum time to 8:00 PM
        views={['day', 'work_week', 'week', 'month']} // Optionally restrict the views
        defaultView="week" // Set the default view to 'week'
      />
    </div>
  );
}
