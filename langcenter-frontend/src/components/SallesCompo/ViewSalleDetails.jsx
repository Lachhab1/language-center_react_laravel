import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function ViewSalleDetails() {
  const localizer = momentLocalizer(moment);
  const [holidaysData, setHolidaysData] = useState([]);
  const [HolidaysEvent, SetHolidaysEvent] = useState([]);
  const [classroom, setClassroom] = useState(null);
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(`/api/holiday`);
        const holidays = response.data;
        setHolidaysData(holidays);

        // Once holidays are fetched, generate events
        generateEventsFromHolidays(holidays);
      } catch (error) {
        console.log('Error fetching holidays details:', error);
      }
    };

    fetchHolidays();
  }, []);

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      try {
        const response = await axios.get(`/api/classroom/${id}`);
        const classroomData = response.data.classroom;
        setClassroom(classroomData);

        // Fetch timetable data for the classroom
        const timetableResponse = await axios.get(
          `/api/timeTable?classroom_id=${id}`
        );

        const timetableData = timetableResponse.data.timetable;
        console.log(timetableData);
        // Generate events from the timetable data if it exists
        const newEvents = timetableData
          ? generateEventsFromTimetable(timetableData)
          : [];

        setEvents([...HolidaysEvent, ...newEvents]);
      } catch (error) {
        console.log('Error fetching classroom details:', error);
      }
    };

    fetchClassroomDetails();
  }, [id]);

  const generateEventsFromHolidays = (holidays) => {
    const newEvents = [];
    if (holidays) {
      holidays.map((holi) =>
        newEvents.push({
          title: holi.name,
          start: moment(holi.start_date)
            .set({
              hour: 0,
              minute: 0,
              second: 0,
            })
            .toDate(),
          end: moment(holi.end_date)
            .set({
              hour: 0,
              minute: 0,
              second: 0,
            })
            .toDate(),
          event_color:
            ' radial-gradient(circle, rgba(255,201,35,1) 4%, rgba(255,61,52,1) 30%, rgba(187,42,200,1) 57%, rgba(0,0,0,1) 100%)',
        })
      );
      SetHolidaysEvent(newEvents);
    }
  };
  //console.log('events ', events);

  const generateEventsFromTimetable = (timetableData) => {
    const events = timetableData.flatMap((entry) => {
      const startDate = moment(entry.start_date); // Convert start_date to a moment object
      const endDate = moment(entry.end_date); // Convert end_date to a moment object
      const recurringEvents = [];
      const startDateTime = moment()
        .isoWeekday(entry.day_id)
        .set({
          hour: entry.startTime.split(':')[0],
          minute: entry.startTime.split(':')[1],
          second: entry.startTime.split(':')[2],
        });

      const endDateTime = moment()
        .isoWeekday(entry.day_id)
        .set({
          hour: entry.finishTime.split(':')[0],
          minute: entry.finishTime.split(':')[1],
          second: entry.finishTime.split(':')[2],
        });

      let currentDateTime = moment(startDate); // Start from startDate

      while (currentDateTime.isSameOrBefore(endDate)) {
        if (
          currentDateTime.isoWeekday() === entry.day_id &&
          currentDateTime.isSameOrAfter(startDate)
        ) {
          const start = moment(currentDateTime)
            .set({
              hour: startDateTime.hours(),
              minute: startDateTime.minutes(),
              second: startDateTime.seconds(),
            })
            .toDate();

          const end = moment(currentDateTime)
            .set({
              hour: endDateTime.hours(),
              minute: endDateTime.minutes(),
              second: endDateTime.seconds(),
            })
            .toDate();

          recurringEvents.push({
            id: entry.id,
            title: `${entry.course_title} ${entry.class_name} (classroom: ${entry.classroom_name})`,
            start,
            end,
            event_color: entry.event_color,
          });
        }

        currentDateTime = currentDateTime.add(1, 'day'); // Add one day at a time
      }

      return recurringEvents;
    });

    return events;
  };

  const getEventStyle = (event) => {
    const style = {
      background: event.event_color,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
      display: 'block',
    };

    return {
      style,
    };
  };

  if (!classroom) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5>
        Classroom ID: <span style={{ color: 'red' }}>{classroom.id}</span>
      </h5>
      <h5>
        Name: <span style={{ color: 'red' }}>{classroom.name}</span>
      </h5>
      <h5>
        Capacity: <span style={{ color: 'red' }}>{classroom.capacity}</span>
      </h5>
      <h3>Calendar:</h3>
      <Calendar
        localizer={localizer}
        events={events}
        eventPropGetter={getEventStyle}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        min={new Date().setHours(8, 0, 0)} // Set the minimum time to 8:00 AM
        max={new Date().setHours(20, 0, 0)} // Set the maximum time to 8:00 PM
        views={['day', 'work_week', 'week', 'month']} // Optionally restrict the views
        defaultView='week' // Set the default view to 'week'
      />
    </div>
  );
}
