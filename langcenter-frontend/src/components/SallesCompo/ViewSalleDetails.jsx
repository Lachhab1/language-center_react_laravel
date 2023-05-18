import React, { useState, useEffect,usePa } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useParams } from 'react-router-dom';

export default function ViewSalleDetails() {
  const localizer = momentLocalizer(moment);
  const [classroom, setClassroom] = useState(null);
  const [events, setEvents] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    // Fetch classroom details from the database based on the provided id
    const fetchClassroomDetails = async () => {
      // Replace 'fetchURL' with the actual endpoint URL for fetching classroom details
      // const response = await fetch(`fetchURL/${id}`);
      // const data = await response.json();

      // Simulate fetching the classroom details from the database
      const data = {
        id: id,
        name: 'Classroom 101',
        capacity: 30,
      };

      // Set the retrieved classroom details in the state
      setClassroom(data);

      // Generate random placeholder events for the timetable
      const placeholderEvents = generatePlaceholderEvents();
      setEvents(placeholderEvents);
    };

    fetchClassroomDetails();
  }, [id]);

  if (!classroom) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <h2>Classroom ID: {classroom.id}</h2>
      <h3>Name: {classroom.name}</h3>
      <p>Capacity: {classroom.capacity}</p>
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
