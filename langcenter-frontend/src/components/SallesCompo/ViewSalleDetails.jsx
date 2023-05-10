import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function ViewSalleDetails({ id }) {
  const localizer = momentLocalizer(moment);
  const [classroom, setClassroom] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch classroom details from the database based on the provided id
    const fetchClassroomDetails = async () => {
      // Replace 'fetchURL' with the actual endpoint URL for fetching classroom details
      // const response = await fetch(`fetchURL/${id}`);
      // const data = await response.json();
      
      // Simulate fetching the classroom details from the database
      const data = {
        id: 1,
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

 // Generate random placeholder events   m7i mn b3d database fetching

  // Generate random placeholder events

  
    // Start on Monday and generate events for each day of the week
    const generatePlaceholderEvents = () => {
  const events = [];

  const today = moment().startOf('day');
  const startTimes = [
    today.clone().set('hour', 9),
    today.clone().set('hour', 17),
  ];

  const courseNames = [
    'Course 1',
    'Course 2',
  ];

  for (let i = 0; i < 2; i++) {
    const start = startTimes[i];
    const end = start.clone().add(1, 'hours').add(30, 'minutes');

    const event = {
      id: i + 1,
      title: courseNames[i],
      start: start.toDate(),
      end: end.toDate(),
    };

    events.push(event);
  }

  return events;
};

      
  
// m7i fo9  

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
      />
    </div>
  );
}
