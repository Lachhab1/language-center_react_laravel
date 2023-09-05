import React, { useState,useEffect } from 'react';
import Card from '../components/DashboardCardsCompo/Card';
import student from '../images/icons/student4dash.png';
import teacher from '../images/icons/teacher4dash.png';
import money from '../images/icons/money4dash.png';
import moneyGreen from '../images/icons/icons8-dollar.svg';
import TotalMoney from '../images/icons/icons8-incomeT.svg';
import Expense from '../images/icons/icons8-low-price.svg';
import TotalExpanse from '../images/icons/icons8-expense.svg';
import Due from '../images/icons/icons8-credit.svg';

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
import Salary from '../images/icons/icons8-salary.svg';
import SalaryT from '../images/icons/icons8-salaryT.svg';


import 'react-big-calendar/lib/css/react-big-calendar.css';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Row } from 'react-bootstrap';

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
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
          paymentsMonth: response.data.total_payment_month,
          courses: response.data.totalCourses,
          classes: response.data.totalClasses,
          tests : response.data.totalTests,
          classrooms: response.data.totalClassrooms,
          expenses: response.data.total_expanses,
          expensesMonth: response.data.total_expanses_month,
          due: response.data.due_payment,
          salary: response.data.total_salary,
          salary_month: response.data.salary_month,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => { 
        axios.get('/api/profit').then((res) => {
          console.log(res.data);
          setChartData(res.data);
      });
  
  }, []);

  
  const { user,token } = UseStateContext();
  if (!token){
    return (<Navigate to="/auth" replace={true} />)
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <div className='row justify-content-around'>
        <Row>
          <div className='col  mb-4'>
          <Card title='Total Earnings' icon={TotalMoney} data={cardsData.payments} />
        </div>
        <div className='col  mb-4'>
          <Card title='Total Expenses' icon={TotalExpanse} data={cardsData.expenses} />
        </div>
        <div className='col  mb-4'>
          <Card title='Total Salary' icon={SalaryT} data={cardsData.salary} />
        </div>
        <div className='col  mb-4'>
          <Card title='Total Due' icon={Due} data={cardsData.due} />
        </div>
        </Row>
        <Row>
        <div className='col  mb-4'>
          <Card title='Earnings' icon={moneyGreen} data={cardsData.paymentsMonth} />
        </div>
        <div className='col  mb-4'>
          <Card title='Expenses' icon={Expense} data={cardsData.expensesMonth} />
        </div>
        <div className='col  mb-4'>
          <Card title='Salary' icon={Salary} data={cardsData.salary_month} />
        </div>
        </Row>
        <Row>
        <div className='col  mb-4'>
          <Card  title='Students' icon={student} data={cardsData.students} />
        </div>
        <div className='col  mb-4'>
          <Card title='Teachers' col-md- icon={teacher} data={cardsData.teachers} />
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
          <Card title='Classrooms' icon={classrooms} data={cardsData.classrooms} />
          </div>
        </Row>
      </div>
        <div className='row'>
        <div className='col-6 mx-auto mb-4 Charts'>
          <LineChart data={chartData} />
        </div>
        <div className='col-4 mx-auto mb-4 Charts'>
          <DoughnutChart maleCount={maleCount} femaleCount={femaleCount} />
        </div>
        </div>
      <div className='row'>
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

