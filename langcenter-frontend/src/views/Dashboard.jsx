import React, { useState,useEffect } from 'react';
import Card from '../components/DashboardCardsCompo/Card';
import student from '../images/icons/student4dash.png';
import teacher from '../images/icons/teacher4dash.png';
import money from '../images/icons/money4dash.png';
import parents from '../images/icons/parent4dash.png';
import courses from '../images/icons/courses.svg';
import classes from '../images/icons/classes.svg';
import tests from '../images/icons/tests.svg';
import classrooms from '../images/icons/classroom.svg';
import DoughnutChart from '../components/DashboardCardsCompo/DoughnutChart';
import LineChart from '../components/DashboardCardsCompo/LineChart';
import BarChart from '../components/DashboardCardsCompo/BarChart';
import TimetableScheduler from '../components/DashboardCardsCompo/TimetableScheduler';
import '../components/DashboardCardsCompo/charts.css';
import { UseStateContext } from '../context/ContextProvider';
import axios from "../api/axios"
import { Navigate } from 'react-router-dom';
import CardBoostrap from 'react-bootstrap/Card';


import 'react-big-calendar/lib/css/react-big-calendar.css';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Row } from 'react-bootstrap';

const Dashboard = () => {

  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/number');
        setFemaleCount(response.data.femaleCount);
        setMaleCount(response.data.maleCount);
        setCardsData({
          students: response.data.etudiants,
          teachers: response.data.teachers,
          parents: response.data.parents,
          payments: response.data.total_payment,
          courses: response.data.totalCourses,
          classes: response.data.totalClasses,
          tests : response.data.totalTests,
          classrooms: response.data.totalClassrooms,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  const { user,token } = UseStateContext();
  if (!token){
    return (<Navigate to="/auth" replace={true} />)
  }
  if (!user) {
    return <div>Loading...</div>;
  }

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




  
  return (
    <div className=''>
      <div className='row justify-content-around'>
        <Row>

        <div className='col  mb-4'>
          <Card  title='Students' icon={student} data={cardsData.students} />
        </div>
        <div className='col  mb-4'>
          <Card title='Teachers' col-md- icon={teacher} data={cardsData.teachers} />
        </div>
        <div className='col  mb-4'>
          <Card title='Parents' icon={parents} data={cardsData.parents} />
        </div>
        <div className='col  mb-4'>
          <Card title='Earnings' icon={money} data={cardsData.payments} />
        </div>
        </Row>
        <Row>

        <div className='col  mb-4'>
          <Card title='Courses' icon={courses} data={cardsData.courses} />
        </div>
        <div className='col  mb-4'>
          <Card title='Classes' icon={classes} data={cardsData.classes} />
        </div>
        <div className='col  mb-4'>
          <Card title='Tests' icon={tests} data={cardsData.tests} />
          </div>
        <div className='col  mb-4'>
          <Card title='Classrooms' icon={classrooms} data={cardsData.classrooms} />
          </div>
        </Row>
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
        {/* <TimetableScheduler data={timetableData} /> */}
        </div>
        </div>

      <CardBoostrap className='col-11 mx-auto mb-4 b-4 '>
      <TimetableScheduler/>
      </CardBoostrap>
    </div>
  );
};
export default Dashboard;

