import Image from 'react-bootstrap/Image'
import { useState,useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from '../../api/axios';
export default function User() {
    const {id}=useParams();
    const [data,setData] = useState({});
    const getUser = async () => {
        const response = await axios.get(`/api/users/${id}`);
        setData(
            {
                ...response.data.data,
                firstName: response.data.data.first_name,
                lastName: response.data.data.last_name,
                hireDate: response.data.data.date_of_hiring,
                isActive: response.data.data.is_active,
                password: '',
                passwordConfirmation: '',
            }
            )
        };
        useEffect(() => {
            getUser();
        }, []);


   return(
    <div>
        <div className="Container mt-5 w-100">
            <div className="row">
                <div className="col-5">
                    <Image width={"50%"} className="ms-5"  src={data.image} roundedCircle>
                        </Image>
                </div>
                <div className="col">
                    <h5>{data.firstName} {data.lastName}</h5>
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
                            {data.lastName}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 First Name:
                            </div>
                            <div className="col-6">
                            {data.firstName}
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
                            {data.birthday}
                            </div>
                        </div>
                    
                </div>
            </div>

        </div>
        <div>
      
    </div>
    </div>
   )
  
   
}