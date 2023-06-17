import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from  '../../api/axios';

export default function ViewGroupe() {
  const localizer = momentLocalizer(moment);
  const { id } = useParams();
  const [classData, SetClassData] = useState([]);
  const [classScheduleData, SetClassScheduleData] = useState([]);
  const [event, SetEvent] = useState([]);
  useEffect(() => {
    console.log('useEffect class info Called');
    const groupeDetails = async () => {
      try {
        const response = await axios.get(`api/classes/${id}`);
        SetClassData(response.data.data);
      } catch (error) {
        console.log('Error fetching class details:', error);
      }
    };

    groupeDetails(); // Invoke the groupDetails function inside useEffect
  }, []);

  useEffect(()=>{
    console.log('useEffect class schedule info Called');
    const groupeSchedule = async () =>{
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/timeTable?class_id=${id}`);
        SetClassScheduleData(response.data.timetable)
 
      }catch(error){
        console.log('Error fetching class schedule details:', error);
      }
    };

    groupeSchedule();
  },[]);

  

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
          .add(currentDateTime.diff(startDateTime))
          .toDate();

        recurringEvents.push({
          id: entry.id,
          title: `${entry.course_title} (${entry.classroom_name})`,
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




 

  return (
    <div>
      <h1>Class Details</h1>
      <h5>ID: <span style={{color:"red"}}>{classData.id}</span></h5>
      <h5>Class Name: <span style={{color:"red"}}>{classData.name}</span></h5>
      <h5>Course Name: <span style={{color:"red"}}>{classData.cours && classData.cours.title}</span></h5>
      <h5>Course Level:<span style={{color:"red"}}> {classData.level}</span></h5>
      <h5>Teacher: <span style={{color:"red"}}> {classData.teacher ?  `${classData.teacher.last_name} ${classData.teacher.first_name}` : "No Teacher"}   </span></h5>

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
  eventPropGetter={() => {
    const backgroundColor = classData.event_color;
    return { style: { backgroundColor } }
  }}
/>

    </div>
  );
}
