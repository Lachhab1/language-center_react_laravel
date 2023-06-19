import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from "../../api/axios"

import 'react-big-calendar/lib/css/react-big-calendar.css';


const TimetableScheduler = () => {
  const localizer = momentLocalizer(moment);
  const [classData, SetClassData] = useState([]);
  const [classScheduleData, SetClassScheduleData] = useState([]);
  const [event, SetEvent] = useState([]);
  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);





  useEffect(() => {
    console.log('useEffect class schedule info Called');
    const groupeSchedule = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/timeTable`);

        SetClassScheduleData(response.data)

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
      SetEvent(generatedEvents);
    }
  }, [classScheduleData]);


  const generateEventsFromTimetable = (timetableData) => {
    const events = timetableData.flatMap((entry) => {
      const recurringEvents = [];

      const startDateTime = moment().isoWeekday(entry.day_id).set({
        hour: entry.startTime.split(':')[0],
        minute: entry.startTime.split(':')[1],
        second: entry.startTime.split(':')[2],
      });
  
      const endDateTime = moment().isoWeekday(entry.day_id).set({
        hour: entry.finishTime.split(':')[0],
        minute: entry.finishTime.split(':')[1],
        second: entry.finishTime.split(':')[2],
      });
  
      let currentDateTime = moment(startDateTime);
  
      while (currentDateTime.isSameOrBefore(moment(entry.end_date).startOf('week'))) {
        if (currentDateTime.isSameOrAfter(moment(entry.start_date).startOf('week'))) {
          const start = currentDateTime.toDate();
          const end = moment(endDateTime)
            .add(currentDateTime.diff(startDateTime), 'milliseconds')
            .toDate();
  
          recurringEvents.push({
            id: entry.id,
            title: `${entry.course_title} ${entry.class_name} (${entry.classroom_name})`,
            start,
            end,
            event_color: entry.event_color,
          });
        }
  
        currentDateTime = currentDateTime.add(1, 'week');
      }
  
      return recurringEvents;
    });
  
    return events;
  };

  const getEventStyle = (event) => {
    const style = {
      backgroundColor: event.event_color,
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
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          min={new Date().setHours(8, 0, 0)}
          max={new Date().setHours(20, 0, 0)}
          views={['day', 'work_week', 'week', 'month']}
          defaultView="week"
          eventPropGetter={getEventStyle}
        />
      </div>
    </div>
  );
};



export default TimetableScheduler;
