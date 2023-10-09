import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from '../../api/axios';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const TimetableScheduler = () => {
  const [holidaysData, setHolidaysData] = useState([]);
  const localizer = momentLocalizer(moment);
  const [classData, SetClassData] = useState([]);
  const [classScheduleData, SetClassScheduleData] = useState([]);
  const [event, SetEvent] = useState([]);
  const [HolidaysEvent, SetHolidaysEvent] = useState([]);

  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [cmp, setCmp] = useState(0);

  //fetch the data of holidays
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

      console.log('fetchHolidays cmp = ', cmp);
      setCmp(cmp + 1);
    };

    fetchHolidays();
  }, []);

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
    console.log('generateEventsFromHolidays cmp = ', cmp);
    setCmp(cmp + 1);
  };

  useEffect(() => {
    console.log('useEffect class schedule info Called');
    const groupeSchedule = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/timeTable`);

        SetClassScheduleData(response.data);
      } catch (error) {
        console.log('Error fetching class schedule details:', error);
      }
    };

    groupeSchedule();
  }, []);

  useEffect(() => {
    console.log('useEffect generate events Called');
    if (classScheduleData.length > 0) {
      const generatedEvents = generateEventsFromTimetable(classScheduleData);
      console.log('genr ', generatedEvents);
      SetEvent([...HolidaysEvent, ...generatedEvents]);
    }

    console.log('genrets events clled ? cmp = ', cmp);
    setCmp(cmp + 1);
  }, [classScheduleData]);

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

  return (
    <div>
      <h2>scheduler for all classes</h2>
      {/*calender*/}
      <div className='row'>
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          min={new Date().setHours(8, 0, 0)}
          max={new Date().setHours(20, 0, 0)}
          views={['day', 'work_week', 'week', 'month']}
          defaultView='week'
          eventPropGetter={getEventStyle}
        />
      </div>
    </div>
  );
};

export default TimetableScheduler;
