import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function ViewSalleDetails() {
  const localizer = momentLocalizer(moment);
  const [classroom, setClassroom] = useState(null);
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      try {
        const response = await axios.get(`/api/classroom/${id}`);
        const classroomData = response.data.classroom;
        setClassroom(classroomData);

        // Fetch timetable data for the classroom
        const timetableResponse = await axios.get(`/api/timeTable?classroom_id=${id}`);
        const timetableData = timetableResponse.data.timetable;
        console.log("timetableData:", timetableData);
        
        // Generate events from the timetable data if it exists
        const events = timetableData ? generateEventsFromTimetable(timetableData) : [];
        console.log("events:", events);
        setEvents(events);
      } catch (error) {
        console.log('Error fetching classroom details:', error);
      }
    };

    fetchClassroomDetails();
  }, [id]);

  const generateEventsFromTimetable = (timetableData) => {
    const events = timetableData.flatMap((entry) => {
      const days = JSON.parse(entry.days); // Parse the days string into an array
  
      return days.map((day) => {
        const startDateTime = moment().day(day).set({
          hour: entry.startTime.split(':')[0],
          minute: entry.startTime.split(':')[1],
          second: entry.startTime.split(':')[2],
        });
  
        const endDateTime = moment().day(day).set({
          hour: entry.finishTime.split(':')[0],
          minute: entry.finishTime.split(':')[1],
          second: entry.finishTime.split(':')[2],
        });
  
        return {
          id: entry.id,
          title: entry.course_title,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
        };
      });
    });
  
    return events;
  };
  
  

  if (!classroom) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5>Classroom ID: <span style={{color:"red"}}>{classroom.id}</span></h5>
      <h5>Name: <span style={{color:"red"}}>{classroom.name}</span></h5>
      <h5>Capacity: <span style={{color:"red"}}>{classroom.capacity}</span></h5>
      <h3>Calendar:</h3>
      <Calendar
        localizer={localizer}
        events={events}
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
