import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TimetableScheduler = ({ data }) => {
  const events = data.map((item, index) => ({
    id: index,
    title: `${item.groupName} - ${item.courseName} (${item.salle})`,
    start: item.dateStart,
    end: item.dateEnd,
  }));

  const eventStyleGetter = (event) => {
    const colors = ['#3f51b5', '#ff1744', '#00bcd4', '#4caf50', '#ffc107'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return {
      style: {
        backgroundColor: randomColor,
      },
    };
  };

  return (
    <div>
      <h2>Timetable Scheduler</h2>
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
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default TimetableScheduler;
