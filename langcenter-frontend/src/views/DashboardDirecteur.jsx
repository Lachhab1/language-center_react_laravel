import React, { useState,useEffect } from 'react';
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
import InscriptionTable from '../components/InscStudDash/Inscription';
import { Button } from 'react-bootstrap';
import Inscription from '../components/InscStudDash/AddInscription';
import { UseStateContext } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';
import axios from "../api/axios"
import CardBoostrap from 'react-bootstrap/Card';

const DashboardDirecteur = () => {
  const {user,token} = UseStateContext();
  const [showModal, setShowModal] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  const handleModalToggle = () => {
  setShowModal(!showModal);
  };
  const maleCount = 30;
  const femaleCount = 20;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/number');
        console.log(response.data);
        setCardsData({
          students: response.data.etudiants,
          teachers: response.data.teachers,
          parents: response.data.parents,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  if (!token){
    return (<Navigate to="/auth" replace={true} />)
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  const [chartData, setChartData] = useState({
    courses: [
      { course: 'English', students: 45 },
      { course: 'French', students: 60 },
      { course: 'Italian', students: 30 },
      { course: 'Spanish', students: 55 },
      { course: 'Arabic', students: 50 },
    ],
  });



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
      <div className='row justify-content-around mb-4'>
        <div className='col'>
          <Card title='Students' icon={student} data={cardsData.students} />
        </div>
        <div className='col'>
          <Card title='Teachers' col-md- icon={teacher} data={cardsData.teachers} />
        </div>
        <div className='col'>
          <Card title='Parents' icon={parents} data={cardsData.parents} />
        </div>
      </div>
      {/* <div className='col-12 mx-auto mb-4 Charts'>
        <TimetableScheduler data={timetableData} />
      </div> */}
      <CardBoostrap className='col-11 mx-auto mb-4 b-4 '>
      <TimetableScheduler/>
      </CardBoostrap>
    </div>
  );
  
};
export default DashboardDirecteur;

