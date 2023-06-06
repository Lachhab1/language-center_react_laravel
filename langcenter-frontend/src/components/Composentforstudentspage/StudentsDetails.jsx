import Image from 'react-bootstrap/Image'
import imgStudent from "../../images/student.png"
import { useEffect,useState } from "react";
import { UseStateContext } from "../../context/ContextProvider";
import {Form,Col,Row} from "react-bootstrap";
import axios from "../../api/axios";
import { Spinner } from 'react-awesome-spinners'
import { useParams } from "react-router-dom";

export default function StudentsDetails() {
const {id} = useParams();
const [pending, setPending] = useState(true);
const [data,setData]=useState([]);
const {setNotification,setVariant} = UseStateContext();
useEffect(() => {
    const timeout = setTimeout(async() => {
        const response = await axios.get("/api/etudiants");
        console.log(response.data.data);
        response.data.data.map((datar) => {
            if(datar.id==id)
            {

                setData((prev)=>
                (
                        {
                            id:datar.id,
                            prenom: datar.prenom,
                            nom:datar.nom,
                            email:datar.email,
                            telephone:datar.telephone,
                            DateNaissance:datar.date_naissance,
                            FatherOcupation: "not yet",
                            // DateEnrol:datar.inscription_date,
                            gender: datar.sexe,
                            classes: datar.classes,
                            Fathername:datar.parent.prenom+" "+datar.parent.nom,
                            Fatheremail:datar.parent.email,
                            Fatherphone:datar.parent.telephone,
                            FatherAddress:datar.parent.adresse,
                            FatherDateNaissance:datar.parent.date_naissance,
                            FatherGender:datar.parent.sexe,
                        })
                    )
            }
        
        })
        // setData(response.data.data);
        setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
}, []);

   return(
    
        pending ? (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner color="danger" size={100} />
            </div>
        ) : (
    
    <div>
        <div className="Container mt-5 w-100">
            <div className="row">
                <div className="col-5">
                    <Image width={"50%"} className="ms-5"  src={imgStudent} roundedCircle>
                        </Image>
                </div>
                <div className="col">
                    <h5>{data.nom} {data.prenom}</h5>
                        <p>
                           Descreption
                        </p> 
                        <br /><br />
                        <div className="row">
                            <div className="col-6">
                                 ID Number:
                            </div>
                            <div className="col-6">
                            {data.id}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Last Name:
                            </div>
                            <div className="col-6">
                            {data.nom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 First Name:
                            </div>
                            <div className="col-6">
                            {data.prenom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Gender:
                            </div>
                            <div className="col-6">
                            {data.gender}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Father Name:
                            </div>
                            <div className="col-6">
                            {data.Fathername}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Email:
                            </div>
                            <div className="col-6">
                            {data.email}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of birth:
                            </div>
                            <div className="col-6">
                            {data.DateNaissance}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Father Ocupation:
                            </div>
                            <div className="col-6">
                            {data.FatherOcupation}
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Classes
                            </div>
                            <div className="col-6">
                            {data.classes.map((classe,key)=>
                            (
                                <div key={key}>
                                    Name: {classe.name}<br/> level:  {classe.level}<br/> school year: {classe.school_year}<br/> class Capacity {classe.capacity} <hr/>
                                </div>
                            ))}
                            </div>
                        </div>
                    
                </div>
            </div>

        </div>
        <div>
      
    </div>
    </div>
        )
   )
  
   
}