import React, { useState } from 'react';
import Card from '../components/DashboardCardsCompo/Card';
import student from '../images/icons/student4dash.png';
import teacher from '../images/icons/teacher4dash.png';
import money from '../images/icons/money4dash.png';
import parents from '../images/icons/parent4dash.png';
import DoughnutChart from '../components/DashboardCardsCompo/DoughnutChart';
import LineChart from '../components/DashboardCardsCompo/LineChart';
import BarChart from '../components/DashboardCardsCompo/BarChart';
import TimetableScheduler from '../components/DashboardCardsCompo/TimetableScheduler';
import '../components/DashboardCardsCompo/charts.css';

const Dashboard = () => {
  const maleCount = 30;
  const femaleCount = 20;

  const [chartData, setChartData] = useState({
    year: [
      { year: '2021', profit: 5000, expense: 3000 },
      { year: '2022', profit: 6000, expense: 4000 },
      { year: '2023', profit: 7000, expense: 5000 },
    ],
    month: [
      { month: 'Jan', profit: 400, expense: 200 },
      { month: 'Feb', profit: 600, expense: 400 },
      { month: 'Mar', profit: 800, expense: 300 },
      { month: 'Apr', profit: 1000, expense: 500 },
      { month: 'May', profit: 1200, expense: 600 },
      { month: 'Jun', profit: 1400, expense: 700 },
      { month: 'Jul', profit: 600, expense: 800 },
      { month: 'Aug', profit: 800, expense: 900 },
      { month: 'Sep', profit: 2000, expense: 2000 },
      { month: 'Oct', profit: 2200, expense: 1100 },
      { month: 'Nov', profit: 2400, expense: 1200 },
      { month: 'Dec', profit: 2600, expense: 1300 },
    ],
    courses: [
      { course: 'English', students: 45 },
      { course: 'French', students: 60 },
      { course: 'Italian', students: 30 },
      { course: 'Spanish', students: 55 },
      { course: 'Arabic', students: 50 },
    ],
  });

  const [interval, setInterval] = useState('year');
  const handleIntervalChange = (value) => {
    setInterval(value);
  };

  const timetableData = [
    { groupName: 'Group 1', courseName: 'English', salle: 'A101', dateStart: new Date(2023, 4, 1, 9, 0), dateEnd: new Date(2023, 4, 1, 10, 30) },
    { groupName: 'Group 2', courseName: 'French', salle: 'B202', dateStart: new Date(2023, 4, 1, 11, 0), dateEnd: new Date(2023, 4, 1, 12, 30) },
    { groupName: 'Group 3', courseName: 'Spanish', salle: 'C303', dateStart: new Date(2023, 4, 1, 13, 0), dateEnd: new Date(2023, 4, 1, 14, 30) },
    { groupName: 'Group 1', courseName: 'English', salle: 'A101', dateStart: new Date(2023, 4, 6, 9, 0), dateEnd: new Date(2023, 4, 6, 10, 30) },
    { groupName: 'Group 2', courseName: 'French', salle: 'B202', dateStart: new Date(2023, 4, 6, 11, 0), dateEnd: new Date(2023, 4, 6, 12, 30) },
    { groupName: 'Group 3', courseName: 'Spanish', salle: 'C303', dateStart: new Date(2023, 4, 6, 13, 0), dateEnd: new Date(2023, 4, 6, 14, 30) }
    // Add more timetable data as needed
  ];
  return (
    <div className=''>
      <div className='row justify-content-around'>
        <div className='col  mb-4'>
          <Card  title='Students' icon={student} />
        </div>
        <div className='col  mb-4'>
          <Card title='Teachers' col-md- icon={teacher} />
        </div>
        <div className='col  mb-4'>
          <Card title='Parents' icon={parents} />
        </div>
        <div className='col  mb-4'>
          <Card title='Earnings' icon={money} />
        </div>
      </div>
        <div className='row'>
        <div className='col-6 mx-auto mb-4 Charts'>
          <LineChart data={chartData} interval={interval} onIntervalChange={handleIntervalChange} />
        </div>
        <div className='col-4 mx-auto mb-4 Charts'>
          <DoughnutChart maleCount={maleCount} femaleCount={femaleCount} />
        </div>
        </div>
      <div className='row'>
        <div className='col-11 mx-auto mb-4 Charts'>
          <BarChart data={chartData.courses} />
        </div>
        <div className='col-11 mx-auto mb-4 Charts'>
        <TimetableScheduler data={timetableData} />
        </div>
        </div>
    </div>
  );
};
export default Dashboard;

