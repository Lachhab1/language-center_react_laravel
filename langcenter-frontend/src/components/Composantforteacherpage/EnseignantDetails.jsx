import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from '../../api/axios'
import imgTeacher from "../../images/teacher.png"
import { Image } from 'react-bootstrap';

export default function EnseignantDetails()
{
    const [teacherData, setTeacherDate] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`/api/teachers/${id}`)
        .then((res) => {
            console.log(res.data.data);
        setTeacherDate(
          {
            id: res.data.data.id,
            nom: res.data.data.last_name,
            prenom: res.data.data.first_name,
            name: res.data.data.first_name + ' ' + res.data.data.last_name,
            gender: res.data.data.gender,
            class: res.data.data.classes.length > 0 ? res.data.data.classes.map((cls) => cls.name).join(', ') : 'No class',
            subject: res.data.data.speciality,
            status: "active",
            phone: res.data.data.phone,
            birthday: res.data.data.birthday,
            email: res.data.data.email,
            address: res.data.data.address,
            date_admission: res.data.data.hiredate,
            degree: res.data.data.diploma,
          }
        )
            // setTeacherDate(res.data.data)
            console.log(teacherData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    
    const Prof = {
        id: teacherData.id,
        nom: teacherData.nom,
        prenom: teacherData.prenom,
        gender:teacherData.gender,
        Digree:teacherData.degree,
        email: teacherData.email,
        telephone: teacherData.phone,
        DateNaissance:teacherData.birthday,
        DateAdmission:teacherData.date_admission,
        class:teacherData.class,
      };
   return(
    <div>
        <br /><br /><br />

        <div className="Container">
            <div className="row">
                    <div className="col-5">
                    <Image width={"50%"} className="ms-5"  src={imgTeacher} roundedCircle>
                        </Image>
                </div>
                <div className="col">
                    <h5>{Prof.nom} {Prof.prenom}</h5>
                        <p>
                           Descreption
                        </p> 
                        <br /><br />
                        <div className="row">
                            <div className="col-6">
                                 ID Number:
                            </div>
                            <div className="col-6">
                            {Prof.id}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Last Name:
                            </div>
                            <div className="col-6">
                            {Prof.nom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 First Name:
                            </div>
                            <div className="col-6">
                            {Prof.prenom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Gender:
                            </div>
                            <div className="col-6">
                            {Prof.gender}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Email:
                            </div>
                            <div className="col-6">
                            {Prof.email}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of birth:
                            </div>
                            <div className="col-6">
                            {Prof.DateNaissance}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Degree:
                            </div>
                            <div className="col-6">
                            {Prof.Digree}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of Admission:
                            </div>
                            <div className="col-6">
                            {Prof.DateAdmission}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Class
                            </div>
                            <div className="col-6">
                            {Prof.class}
                            </div>
                        </div>
                    
                </div>
            </div>

        </div>
    </div>
   )
  
   
}